// Vanilla-JS ports of the site's four bespoke hero illustrations
// (originally Framer Motion + SVG React components). Each init function is a
// no-op if its container isn't present on the current page.
(function () {
  var prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var SVG_NS = 'http://www.w3.org/2000/svg';

  function el(tag, attrs) {
    var node = document.createElementNS(SVG_NS, tag);
    for (var k in attrs) node.setAttribute(k, attrs[k]);
    return node;
  }

  /* ------------------------------------------------------------------ */
  /* SiteBuilder — cycling "assembling landing page" browser mock        */
  /* ------------------------------------------------------------------ */
  function initSiteBuilder() {
    var root = document.querySelector('[data-signature="sitebuilder"]');
    if (!root) return;

    var STEPS = 6;
    var TICK = 600;
    var HOLD = 8;

    var blocks = root.querySelectorAll('.sb-block');
    var progressBar = root.querySelector('[data-progress]');

    function render(step) {
      blocks.forEach(function (b) {
        var order = parseInt(b.getAttribute('data-order'), 10);
        b.classList.toggle('visible', step >= order);
      });
      var progress = Math.min(1, Math.max(0, (step + 1) / (STEPS + 1)));
      if (progressBar) progressBar.style.width = progress * 100 + '%';
    }

    if (prefersReducedMotion) {
      render(STEPS);
      return;
    }

    var s = -1;
    render(s);
    setInterval(function () {
      s = s >= STEPS + HOLD ? -1 : s + 1;
      render(s);
    }, TICK);
  }

  /* ------------------------------------------------------------------ */
  /* NeuralConstellation — animated node graph with traveling signals    */
  /* ------------------------------------------------------------------ */
  function seedRandom(seed) {
    var s = seed;
    return function () {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
  }

  function buildGraph(count, w, h) {
    var rand = seedRandom(11);
    var nodes = [];
    var minDist = 60;
    var padding = 40;
    var attempts = 0;

    while (nodes.length < count && attempts < count * 60) {
      var x = padding + rand() * (w - padding * 2);
      var y = padding + rand() * (h - padding * 2);
      var ok = nodes.every(function (n) {
        var dx = n.x - x;
        var dy = n.y - y;
        return dx * dx + dy * dy > minDist * minDist;
      });
      if (ok) {
        nodes.push({
          id: nodes.length,
          x: x,
          y: y,
          r: 1.8 + rand() * 1.2,
          phase: rand() * Math.PI * 2,
        });
      }
      attempts++;
    }

    var edgeSet = {};
    var edges = [];
    var EDGE_RADIUS = 130;
    var MAX_NEIGHBORS = 3;

    nodes.forEach(function (node) {
      var others = nodes
        .filter(function (o) {
          return o.id !== node.id;
        })
        .map(function (o) {
          return { o: o, d: Math.hypot(o.x - node.x, o.y - node.y) };
        })
        .filter(function (p) {
          return p.d < EDGE_RADIUS;
        })
        .sort(function (a, b) {
          return a.d - b.d;
        })
        .slice(0, MAX_NEIGHBORS);

      others.forEach(function (pair) {
        var o = pair.o;
        var key = node.id < o.id ? node.id + '-' + o.id : o.id + '-' + node.id;
        if (!edgeSet[key]) {
          edgeSet[key] = true;
          edges.push({ a: node.id, b: o.id });
        }
      });
    });

    return { nodes: nodes, edges: edges };
  }

  function smoothstep(t) {
    return t * t * (3 - 2 * t);
  }

  function initNeuralConstellation() {
    var root = document.querySelector('[data-signature="neural"]');
    if (!root) return;
    var svg = root.querySelector('[data-neural-svg]');
    if (!svg) return;

    var VB_W = 480;
    var VB_H = 520;
    var SIGNAL_COUNT = 4;
    var SIGNAL_DURATION = 1400;
    var isCompact = window.matchMedia('(max-width: 1024px)').matches;
    var nodeCount = isCompact ? 16 : 24;

    var graph = buildGraph(nodeCount, VB_W, VB_H);
    var nodes = graph.nodes;
    var edges = graph.edges;

    var adjacency = {};
    edges.forEach(function (e) {
      (adjacency[e.a] = adjacency[e.a] || []).push(e.b);
      (adjacency[e.b] = adjacency[e.b] || []).push(e.a);
    });

    // defs
    var defs = el('defs', {});
    var glowGrad = el('radialGradient', { id: 'glow-grad', cx: '0.5', cy: '0.5', r: '0.5' });
    glowGrad.appendChild(el('stop', { offset: '0%', 'stop-color': '#ff4b3a', 'stop-opacity': '0.55' }));
    glowGrad.appendChild(el('stop', { offset: '40%', 'stop-color': '#ff4b3a', 'stop-opacity': '0.18' }));
    glowGrad.appendChild(el('stop', { offset: '100%', 'stop-color': '#ff4b3a', 'stop-opacity': '0' }));
    defs.appendChild(glowGrad);
    var glowFilter = el('filter', { id: 'node-glow', x: '-50%', y: '-50%', width: '200%', height: '200%' });
    glowFilter.appendChild(el('feGaussianBlur', { stdDeviation: '1.2', result: 'b' }));
    var merge = el('feMerge', {});
    merge.appendChild(el('feMergeNode', { in: 'b' }));
    merge.appendChild(el('feMergeNode', { in: 'SourceGraphic' }));
    glowFilter.appendChild(merge);
    defs.appendChild(glowFilter);
    svg.appendChild(defs);

    // edges
    var edgeGroup = el('g', { stroke: '#ffcc33', 'stroke-width': '0.6', 'stroke-linecap': 'round' });
    edges.forEach(function (e) {
      var a = nodes[e.a];
      var b = nodes[e.b];
      edgeGroup.appendChild(
        el('line', { x1: a.x, y1: a.y, x2: b.x, y2: b.y, opacity: '0.12' })
      );
    });
    svg.appendChild(edgeGroup);

    // nodes (with pulse animation)
    var nodeGroup = el('g', { filter: 'url(#node-glow)' });
    nodes.forEach(function (n) {
      var circle = el('circle', { cx: n.x, cy: n.y, r: n.r, fill: '#ffcc33', opacity: '0.55' });
      if (!prefersReducedMotion) {
        var dur = 3 + (n.id % 5) * 0.4;
        var delay = n.phase / 2;
        var animR = el('animate', {
          attributeName: 'r',
          values: n.r + ';' + (n.r + 0.9) + ';' + n.r,
          dur: dur + 's',
          begin: delay + 's',
          repeatCount: 'indefinite',
        });
        var animO = el('animate', {
          attributeName: 'opacity',
          values: '0.55;0.95;0.55',
          dur: dur + 's',
          begin: delay + 's',
          repeatCount: 'indefinite',
        });
        circle.appendChild(animR);
        circle.appendChild(animO);
      } else {
        circle.setAttribute('opacity', '0.7');
      }
      nodeGroup.appendChild(circle);
    });
    svg.appendChild(nodeGroup);

    // halos
    var haloGroup = el('g', {});
    nodes.forEach(function (n) {
      haloGroup.appendChild(
        el('circle', {
          cx: n.x,
          cy: n.y,
          r: n.r + 4,
          fill: 'none',
          stroke: '#ffcc33',
          'stroke-width': '0.4',
          opacity: '0.18',
        })
      );
    });
    svg.appendChild(haloGroup);

    // pointer glow
    var glowCircle = el('circle', {
      r: '70',
      fill: 'url(#glow-grad)',
      cx: VB_W / 2,
      cy: VB_H / 2,
      opacity: '0',
      'pointer-events': 'none',
    });
    glowCircle.style.transition = 'opacity 0.5s';
    svg.appendChild(glowCircle);

    svg.addEventListener('pointermove', function (ev) {
      var rect = svg.getBoundingClientRect();
      var x = ((ev.clientX - rect.left) / rect.width) * VB_W;
      var y = ((ev.clientY - rect.top) / rect.height) * VB_H;
      glowCircle.setAttribute('cx', x);
      glowCircle.setAttribute('cy', y);
      glowCircle.style.opacity = '1';
    });
    svg.addEventListener('pointerleave', function () {
      glowCircle.style.opacity = '0';
    });

    // signals
    if (edges.length) {
      var seedR = seedRandom(99);
      for (var i = 0; i < SIGNAL_COUNT; i++) {
        var idx = Math.floor(seedR() * edges.length);
        runSignal(edges[idx]);
      }
    }

    function runSignal(initialEdge) {
      var circle = el('circle', {
        r: '2.2',
        fill: '#ff4b3a',
      });
      circle.style.filter = 'drop-shadow(0 0 4px #ff4b3a) drop-shadow(0 0 10px rgba(255,75,58,0.6))';
      svg.appendChild(circle);

      if (prefersReducedMotion) {
        var mid = {
          x: (nodes[initialEdge.a].x + nodes[initialEdge.b].x) / 2,
          y: (nodes[initialEdge.a].y + nodes[initialEdge.b].y) / 2,
        };
        circle.setAttribute('cx', mid.x);
        circle.setAttribute('cy', mid.y);
        circle.setAttribute('opacity', '0.7');
        return;
      }

      var edge = initialEdge;
      var start = null;

      function opacityAt(t) {
        if (t < 0.15) return t / 0.15;
        if (t < 0.85) return 1;
        return 1 - ((t - 0.85) / 0.15) * 0.6;
      }

      function step(ts) {
        if (start === null) start = ts;
        var t = Math.min(1, (ts - start) / SIGNAL_DURATION);
        var from = nodes[edge.a];
        var to = nodes[edge.b];
        var e = smoothstep(t);
        circle.setAttribute('cx', from.x + (to.x - from.x) * e);
        circle.setAttribute('cy', from.y + (to.y - from.y) * e);
        circle.setAttribute('opacity', opacityAt(t));

        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          var neighbors = adjacency[edge.b] || [];
          var candidates = neighbors.filter(function (n) {
            return n !== edge.a;
          });
          var pool = candidates.length ? candidates : neighbors;
          var next = pool.length ? pool[Math.floor(Math.random() * pool.length)] : edge.a;
          edge = { a: edge.b, b: next };
          start = null;
          requestAnimationFrame(step);
        }
      }
      requestAnimationFrame(step);
    }
  }

  /* ------------------------------------------------------------------ */
  /* StackPipeline — isometric stacked layers with a traveling pulse     */
  /* ------------------------------------------------------------------ */
  function initStackPipeline() {
    var root = document.querySelector('[data-signature="pipeline"]');
    if (!root) return;

    // --- Tunable settings ------------------------------------------------
    // Time for the pulse to travel between slabs. Drives the CSS transition
    // duration directly (set below), so the two can never drift out of sync.
    var TRAVEL_MS = 520;
    // Easing for that travel. Defaults to the same curve as --ease-out-2.
    var TRAVEL_EASE = 'cubic-bezier(0.47, 0.88, 0.4, 1)';
    // Time the pulse rests (lit up) on a slab before jumping to the next.
    var PAUSE_MS = 800;
    // Order of slabs (by data-index) the pulse visits, looped forever.
    var SEQUENCE = [0, 1, 2, 3, 2, 1, 0];
    // Manual nudge (in px) applied on top of the auto-computed slab center,
    // for cosmetic adjustment only. Leave at 0 to sit dead-center on the slab.
    var NUDGE_X = 70;
    var NUDGE_Y = 0;
    // -----------------------------------------------------------------

    var slabs = root.querySelectorAll('.pipeline-slab');
    var pulse = root.querySelector('[data-pulse]');
    if (!slabs.length || prefersReducedMotion) return;

    // The pulse's position for each slab is computed from that slab's own
    // rendered box (offsetLeft/Top + half its width/height), so it always
    // lands on the true visual center of the slab — including width and
    // margin-left, which differ per slab — no matter how the markup changes.
    var slabCenters = Array.prototype.map.call(slabs, function (slab) {
      return {
        x: slab.offsetLeft + slab.offsetWidth / 2 + NUDGE_X,
        y: slab.offsetTop + slab.offsetHeight / 2 + NUDGE_Y
      };
    });

    // Moved via `transform` rather than `top`/`left`: this element lives
    // inside an ancestor with `transform-style: preserve-3d`, and animating
    // layout properties (top/left) in that context re-derives the 3D
    // projection from a reflowed box every frame, which visibly drifts off
    // the slab's true center depending on the slab's position in the stack.
    // `transform` composes directly with the parent's 3D matrix instead, so
    // it lands exactly on the same point the static geometry predicts.
    //var PULSE_Z = 28;

    if (pulse) {
      pulse.style.transitionProperty = 'top, left';
      pulse.style.transitionDuration = TRAVEL_MS + 'ms';
      pulse.style.transitionTimingFunction = TRAVEL_EASE;
    }

    var i = 0;

    function tick() {
      var activeIdx = SEQUENCE[i % SEQUENCE.length];
      i++;

      slabs.forEach(function (slab) {
        slab.classList.remove('active');
      });
      if (pulse) {
        pulse.style.top = slabCenters[activeIdx].y + 'px';
        pulse.style.left = slabCenters[activeIdx].x + 'px';
      }

      setTimeout(function () {
        slabs.forEach(function (slab, idx) {
          slab.classList.toggle('active', idx === activeIdx);
        });
      }, TRAVEL_MS);
    }

    tick();
    setInterval(tick, TRAVEL_MS + PAUSE_MS);
  }

  /* ------------------------------------------------------------------ */
  /* ServerRack — SVG rack with animated LEDs and live sparklines        */
  /* ------------------------------------------------------------------ */
  function buildPath(values, baseX, baseY, w, h) {
    if (!values.length) return '';
    var stepX = w / (values.length - 1);
    return values
      .map(function (v, i) {
        var x = baseX + i * stepX;
        var y = baseY + h - v * h;
        return (i === 0 ? 'M' : 'L') + x.toFixed(2) + ' ' + y.toFixed(2);
      })
      .join(' ');
  }

  function initServerRack() {
    var root = document.querySelector('[data-signature="serverrack"]');
    if (!root) return;

    var VB_W = 320,
      VB_H = 380;
    var UNIT_COUNT = 8,
      UNIT_TOP = 30,
      UNIT_H = 23,
      UNIT_GAP = 2;
    var RACK_LEFT = 14,
      RACK_RIGHT = VB_W - 14;
    var SPARK_TOP = 234,
      SPARK_ROW_H = 38,
      SPARK_LABEL_W = 32;
    var LED_PALETTE = ['#3ddc84', '#3ddc84', '#3ddc84', '#3ddc84', '#ffcc33', '#ffcc33', '#ff4b3a'];
    var HOSTS = [
      'node-01 / inference',
      'node-02 / inference',
      'node-03 / vector-db',
      'node-04 / vector-db',
      'node-05 / api',
      'node-06 / api',
      'node-07 / storage',
      'node-08 / observe',
    ];

    var rand = seedRandom(73);
    var units = [];
    for (var i = 0; i < UNIT_COUNT; i++) {
      var leds = [];
      for (var j = 0; j < 3; j++) {
        leds.push({
          color: LED_PALETTE[Math.floor(rand() * LED_PALETTE.length)],
          dur: 1.6 + rand() * 1.8,
          delay: rand() * 1.5,
        });
      }
      units.push({ hostname: HOSTS[i], status: rand() > 0.85 ? 'WARN' : 'OK', leds: leds });
    }

    var svg = el('svg', {
      viewBox: '0 0 ' + VB_W + ' ' + VB_H,
      preserveAspectRatio: 'xMidYMid meet',
      class: 'server-rack',
    });

    var defs = el('defs', {});
    var glowFilter = el('filter', { id: 'rack-glow', x: '-20%', y: '-20%', width: '140%', height: '140%' });
    glowFilter.appendChild(el('feGaussianBlur', { stdDeviation: '6', result: 'blur' }));
    var merge = el('feMerge', {});
    merge.appendChild(el('feMergeNode', { in: 'blur' }));
    merge.appendChild(el('feMergeNode', { in: 'SourceGraphic' }));
    glowFilter.appendChild(merge);
    defs.appendChild(glowFilter);

    var rackBg = el('linearGradient', { id: 'rack-bg', x1: '0', y1: '0', x2: '0', y2: '1' });
    rackBg.appendChild(el('stop', { offset: '0%', 'stop-color': '#1c1c1c' }));
    rackBg.appendChild(el('stop', { offset: '100%', 'stop-color': '#0a0a0a' }));
    defs.appendChild(rackBg);

    var unitBg = el('linearGradient', { id: 'unit-bg', x1: '0', y1: '0', x2: '0', y2: '1' });
    unitBg.appendChild(el('stop', { offset: '0%', 'stop-color': '#262626' }));
    unitBg.appendChild(el('stop', { offset: '100%', 'stop-color': '#1a1a1a' }));
    defs.appendChild(unitBg);
    svg.appendChild(defs);

    svg.appendChild(
      el('rect', {
        x: '2', y: '2', width: VB_W - 4, height: VB_H - 4, rx: '14',
        fill: 'url(#rack-bg)', stroke: 'rgba(255,75,58,0.22)', 'stroke-width': '1',
      })
    );
    svg.appendChild(
      el('rect', {
        x: '2', y: '2', width: VB_W - 4, height: VB_H - 4, rx: '14',
        fill: 'none', stroke: 'rgba(255,75,58,0.45)', 'stroke-width': '0.5',
        filter: 'url(#rack-glow)', opacity: '0.5',
      })
    );

    function text(x, y, content, attrs) {
      var t = el('text', Object.assign({ x: x, y: y, 'font-family': 'ui-monospace, SFMono-Regular, monospace' }, attrs));
      t.textContent = content;
      svg.appendChild(t);
      return t;
    }

    text(RACK_LEFT, 20, 'RACK-01 / DC-LOCAL', { 'font-size': '9', 'letter-spacing': '2', fill: '#a1a1aa' });
    text(RACK_RIGHT, 20, '● ONLINE', { 'font-size': '9', 'letter-spacing': '2', fill: '#3ddc84', 'text-anchor': 'end' });

    units.forEach(function (unit, i) {
      var y = UNIT_TOP + i * (UNIT_H + UNIT_GAP);
      svg.appendChild(
        el('rect', {
          x: RACK_LEFT, y: y, width: RACK_RIGHT - RACK_LEFT, height: UNIT_H, rx: '2',
          fill: 'url(#unit-bg)', stroke: 'rgba(255,255,255,0.06)', 'stroke-width': '0.5',
        })
      );
      svg.appendChild(el('rect', { x: RACK_LEFT + 4, y: y + 4, width: '3', height: UNIT_H - 8, rx: '0.5', fill: 'rgba(255,75,58,0.6)' }));
      svg.appendChild(el('rect', { x: RACK_LEFT + 9, y: y + 4, width: '3', height: UNIT_H - 8, rx: '0.5', fill: 'rgba(255,255,255,0.1)' }));

      text(RACK_LEFT + 18, y + UNIT_H / 2 + 3.5, unit.hostname, { 'font-size': '8', 'letter-spacing': '0.5', fill: '#d4d4d8' });
      text(RACK_RIGHT - 64, y + UNIT_H / 2 + 3.5, unit.status, {
        'font-size': '7', 'letter-spacing': '1', fill: unit.status === 'OK' ? '#71717a' : '#ffcc33', 'text-anchor': 'end',
      });

      unit.leds.forEach(function (led, j) {
        var circle = el('circle', { cx: RACK_RIGHT - 38 + j * 11, cy: y + UNIT_H / 2, r: '2.4', fill: led.color });
        if (!prefersReducedMotion) {
          circle.appendChild(
            el('animate', {
              attributeName: 'opacity', values: '0.25;1;0.25', dur: led.dur + 's', begin: led.delay + 's', repeatCount: 'indefinite',
            })
          );
        } else {
          circle.setAttribute('opacity', '0.7');
        }
        svg.appendChild(circle);
      });
    });

    svg.appendChild(
      el('line', { x1: RACK_LEFT, y1: SPARK_TOP - 8, x2: RACK_RIGHT, y2: SPARK_TOP - 8, stroke: 'rgba(255,255,255,0.06)', 'stroke-width': '0.5' })
    );

    ['CPU', 'NET', 'RAM'].forEach(function (label, i) {
      var yLabel = SPARK_TOP + i * SPARK_ROW_H + (SPARK_ROW_H - 12) / 2 + 6;
      text(RACK_LEFT + 2, yLabel, label, { 'font-size': '8', 'letter-spacing': '1.5', fill: '#71717a' });
    });

    var sparkX = RACK_LEFT + SPARK_LABEL_W + 4;
    var sparkW = RACK_RIGHT - sparkX - 4;

    [0, 1, 2].forEach(function (i) {
      svg.appendChild(
        el('rect', {
          x: sparkX, y: SPARK_TOP + i * SPARK_ROW_H + 4, width: sparkW, height: SPARK_ROW_H - 12,
          fill: 'rgba(255,255,255,0.015)', stroke: 'rgba(255,255,255,0.05)', 'stroke-width': '0.5',
        })
      );
    });

    var cpuVals = Array.from({ length: 36 }, function () { return 0.4 + Math.random() * 0.3; });
    var netVals = Array.from({ length: 36 }, function () { return 0.3 + Math.random() * 0.4; });
    var ramVals = Array.from({ length: 36 }, function () { return 0.55 + Math.random() * 0.2; });

    var rowH = SPARK_ROW_H - 12;
    var yCpu = SPARK_TOP + 4;
    var yNet = SPARK_TOP + SPARK_ROW_H + 4;
    var yRam = SPARK_TOP + SPARK_ROW_H * 2 + 4;

    var cpuPath = el('path', {
      d: buildPath(cpuVals, sparkX, yCpu, sparkW, rowH), fill: 'none', stroke: '#ff4b3a', 'stroke-width': '1.2',
      'stroke-linecap': 'round', 'stroke-linejoin': 'round',
    });
    var netPath = el('path', {
      d: buildPath(netVals, sparkX, yNet, sparkW, rowH), fill: 'none', stroke: '#ffcc33', 'stroke-width': '1.2',
      'stroke-linecap': 'round', 'stroke-linejoin': 'round',
    });
    var ramPath = el('path', {
      d: buildPath(ramVals, sparkX, yRam, sparkW, rowH), fill: 'none', stroke: '#3ddc84', 'stroke-width': '1.2',
      'stroke-linecap': 'round', 'stroke-linejoin': 'round',
    });
    svg.appendChild(cpuPath);
    svg.appendChild(netPath);
    svg.appendChild(ramPath);

    text(RACK_LEFT, VB_H - 10, 'UPTIME 218d · LOAD 0.42 · OWN ✓', { 'font-size': '7', 'letter-spacing': '2', fill: '#52525b' });

    root.appendChild(svg);

    if (prefersReducedMotion) return;

    var cpuPhase = 0,
      netPhase = 0,
      ramPhase = 0;
    var last = 0;
    var TICK = 180;

    function update(t) {
      if (t - last > TICK) {
        last = t;
        cpuPhase += 0.18;
        netPhase += 0.27;
        ramPhase += 0.09;

        cpuVals.shift();
        cpuVals.push(0.5 + Math.sin(cpuPhase) * 0.18 + Math.sin(cpuPhase * 2.7) * 0.08 + (Math.random() - 0.5) * 0.06);

        netVals.shift();
        var burst = Math.random() > 0.85 ? 0.25 : 0;
        netVals.push(0.42 + Math.sin(netPhase * 0.6) * 0.12 + burst + (Math.random() - 0.5) * 0.08);

        ramVals.shift();
        ramVals.push(Math.min(0.92, 0.6 + Math.sin(ramPhase) * 0.05 + (Math.random() - 0.5) * 0.03));

        cpuPath.setAttribute('d', buildPath(cpuVals, sparkX, yCpu, sparkW, rowH));
        netPath.setAttribute('d', buildPath(netVals, sparkX, yNet, sparkW, rowH));
        ramPath.setAttribute('d', buildPath(ramVals, sparkX, yRam, sparkW, rowH));
      }
      requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  document.addEventListener('DOMContentLoaded', function () {
    initSiteBuilder();
    initNeuralConstellation();
    initStackPipeline();
    initServerRack();
  });
})();
