import Hero from "../components/Hero";
import Section from "../components/Section";
import Lede from "../components/Lede";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";
import WorkExamples from "../components/WorkExamples";
import SiteBuilder from "../components/signatures/SiteBuilder";
import PackageBuilder from "../components/layouts/PackageBuilder";
import ComparisonBlock from "../components/layouts/ComparisonBlock";

const exampleCompanies = [
  { name: "Local Café", url: "#" },
  { name: "Fitness Studio", url: "#" },
  { name: "Trades & Co", url: "#" },
];

export default function WebsiteBuilding() {
  return (
    <>
      <Hero
        eyebrow="Website Building"
        title="Websites You Own, Not Rent."
        subtitle="Custom-designed landing pages for businesses — one flat price, free hosting, and full ownership of every account and line of code. No subscriptions, no lock-in."
        direction="br"
        signature={<SiteBuilder />}
      />

      <Lede
        eyebrow="What Website Building Means"
        title={
          <>
            A real website. <em className="not-italic text-redmesa">Not a rented one.</em>
          </>
        }
      >
        <p>
          We design and build custom landing pages for businesses — up to three pages,
          mobile-responsive, with a contact form and a Google review prompt — for a flat
          $500. No monthly fee, no subscription quietly climbing every year.
        </p>
        <p>
          When we're done, everything is yours: the code, the domain, every account. We host
          it free on GitHub Pages and hand you the keys. The only bill you'll ever see is your
          domain renewal — ten to twenty dollars a year, paid to your registrar, never to us.
        </p>
      </Lede>

      <Section
        id="builder"
        title="Build Your Package"
        subtitle="Start with the Starter Website. Add only what you need, and watch your price update live."
      >
        <PackageBuilder />
      </Section>

      <Section
        id="own-vs-rent"
        title="Own It vs. Rent It"
        subtitle="Most site builders rent you a template and keep the keys. We build you the real thing and hand it over."
        light
      >
        <ComparisonBlock
          left={{
            label: "Own It",
            caption: "Your site, your accounts",
            items: [
              "$500 one-time — then nothing but domain renewal",
              "Every line of code and every account belongs to you",
              "Custom design built for your brand, not a theme",
              "Free hosting on GitHub Pages, configured for you",
              "Leave whenever you want"
            ],
          }}
          right={{
            label: "Rent It",
            caption: "Their platform, their rules",
            items: [
              "$15–50 every month, for as long as the site lives",
              "Templated themes thousands of other sites already use",
              "Your site lives and dies on their platform",
              "Stop paying and the site goes dark",
              "Ads and platform branding on the lower tiers",
            ],
          }}
        />
      </Section>

      <WorkExamples
        companies={exampleCompanies}
        heading="Built for Businesses Like Yours"
      />

      <CTASection
        title="Let's Build Your Site"
        subtitle="Pick your package above, or just tell us about your business — we'll send back a design and a flat quote. One price, free hosting, and a site that's yours to keep."
      />
      <Footer />
    </>
  );
}
