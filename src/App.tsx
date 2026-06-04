import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Infrastructure from "./pages/Infrastructure";
import WebsiteBuilding from "./pages/WebsiteBuilding";
import AIIntegration from "./pages/AIIntegration";
import EndToEnd from "./pages/EndToEnd";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/websites" element={<WebsiteBuilding />} />
        <Route path="/infrastructure" element={<Infrastructure />} />
        <Route path="/solutions" element={<AIIntegration />} />
        <Route path="/end-to-end" element={<EndToEnd />} />
      </Routes>
    </Router>
  );
}

export default App;
