import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    alert(`Demo login ✅\nEmail: ${email}\nPassword: ${"*".repeat(password.length)}`);
  }

  return (
    <div className="page">
      <header className="navbar">
        <div className="logo">QuizMaster</div>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>

      <div className="quiz-box">
        <h2 className="result-title">Login</h2>
        <p className="result-subtitle">This is a demo login UI (no backend yet).</p>

        <form onSubmit={handleSubmit} className="form">
          <label className="label">
            Email
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>

          <label className="label">
            Password
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </label>

          <button className="btn-primary" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
