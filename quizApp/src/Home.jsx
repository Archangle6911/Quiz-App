import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <header className="navbar">
        <div className="logo">QuizMaster</div>
        <nav className="nav-links">
          <a href="#">About</a>
          <a href="#">Login</a>
        </nav>
      </header>

      <main className="hero">
        <div className="hero-inner">
          <h1 className="hero-title">Test Your Knowledge Instantly</h1>
          <p className="hero-subtitle">
            Questions are loaded from Open Trivia DB API.
          </p>

          <button className="btn-primary" onClick={() => navigate("/quiz")}>
            Start Quiz
          </button>
        </div>
      </main>
    </div>
  );
}
