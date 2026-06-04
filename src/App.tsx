import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Nav from "./components/Nav";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import WebsiteBuilding from "./pages/WebsiteBuilding";
import AIIntegration from "./pages/AIIntegration";
import EndToEnd from "./pages/EndToEnd";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/websites" element={<WebsiteBuilding />} />
        <Route path="/solutions" element={<AIIntegration />} />
        <Route path="/end-to-end" element={<EndToEnd />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
