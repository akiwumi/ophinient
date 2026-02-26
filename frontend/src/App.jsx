import { BrowserRouter, Routes, Route } from "react-router-dom";
import FloatingNav from "./components/FloatingNav";
import Home from "./pages/Home";
import ProjectPage from "./pages/ProjectPage";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      {/* Global cinematic overlays */}
      <div className="film-grain" />
      <div className="vignette" />

      <FloatingNav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
      </Routes>
    </BrowserRouter>
  );
}
