import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import "./style.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/result" element={<Result />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
