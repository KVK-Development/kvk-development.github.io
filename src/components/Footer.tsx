import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white py-8 text-center text-gray-500 text-sm">
      <nav
        aria-label="Footer navigation"
        className="mb-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-darkmesa font-medium"
      >
        <Link to="/">AI Software Development</Link>
        <Link to="/websites">Website Building</Link>
        <Link to="/solutions">AI Integration Solutions</Link>
        <Link to="/end-to-end">End-to-End Development</Link>
        <Link to="/blog">Blog</Link>
        <a href="mailto:contact@redmesa.dev">contact@redmesa.dev</a>
      </nav>
      <p>© {new Date().getFullYear()} Red Mesa Development. All rights reserved.</p>
    </footer>
  );
}
