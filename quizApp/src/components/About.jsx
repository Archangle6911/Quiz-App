import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="page">
      <header className="navbar">
        <div className="logo">QuizMaster</div>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
        </nav>
      </header>

      <div className="quiz-box">
        <h2 className="result-title">About QuizMaster</h2>
        <p className="result-subtitle">
          QuizMaster is a simple quiz app that fetches questions from Open Trivia DB.
          It’s built with React + Vite and deployed on Vercel.
        </p>
      </div>
    </div>
  );
}
