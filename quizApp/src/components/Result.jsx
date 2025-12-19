import { useLocation, useNavigate } from "react-router-dom";

export default function Result() {
  const navigate = useNavigate();
  const location = useLocation();

  const score = location.state?.score ?? 0;
  const total = location.state?.total ?? 0;

  return (
    <div className="page">
      <header className="navbar">
        <div className="logo">QuizMaster</div>
        <nav className="nav-links">
          <a href="#" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
            Home
          </a>
        </nav>
      </header>

      <div className="quiz-box">
        <h2 className="result-title">Quiz Complete</h2>
        <p className="result-subtitle">
          You scored {score} out of {total}.
        </p>

        <button className="btn-primary" onClick={() => navigate("/quiz")}>
          Try Again
        </button>
      </div>
    </div>
  );
}
