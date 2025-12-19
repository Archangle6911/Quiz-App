import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function decodeHtml(str) {
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Quiz() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  const total = questions.length;

  const current = useMemo(() => {
    if (!questions[currentIndex]) return null;
    return questions[currentIndex];
  }, [questions, currentIndex]);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");

        // API link
        const res = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");
        if (!res.ok) throw new Error("Failed to fetch questions");

        const data = await res.json();
        if (!data.results?.length) throw new Error("No questions returned");

        const normalized = data.results.map((q) => {
          const correct = decodeHtml(q.correct_answer);
          const options = shuffle([
            correct,
            ...q.incorrect_answers.map((a) => decodeHtml(a)),
          ]);

          return {
            question: decodeHtml(q.question),
            answer: correct,
            options,
          };
        });

        setQuestions(normalized);
      } catch (e) {
        setError(e?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  function selectOption(option) {
    if (!current) return;

    if (option === current.answer) setScore((s) => s + 1);

    const isLast = currentIndex === total - 1;

    if (isLast) {
      
      navigate("/result", { state: { score, total } });
    } else {
      setCurrentIndex((i) => i + 1);
    }
  }

  
  function selectOptionSafe(option) {
    if (!current) return;

    const isCorrect = option === current.answer;
    const nextScore = isCorrect ? score + 1 : score;
    const isLast = currentIndex === total - 1;

    if (isLast) {
      navigate("/result", { state: { score: nextScore, total } });
    } else {
      if (isCorrect) setScore((s) => s + 1);
      setCurrentIndex((i) => i + 1);
    }
  }

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

      <section className="quiz-area" aria-live="polite">
        {loading && (
          <div className="quiz-box">
            <p>Loading questions...</p>
          </div>
        )}

        {!loading && error && (
          <div className="quiz-box">
            <p>{error}</p>
            <button className="btn-primary" onClick={() => navigate("/")}>
              Back
            </button>
          </div>
        )}

        {!loading && !error && current && (
          <div className="quiz-box">
            <div className="quiz-meta">
              <span className="pill">Question {currentIndex + 1} / {total}</span>
              <span className="pill">Score {score}</span>
            </div>

            <div className="question-title">{current.question}</div>

            <div className="options">
              {current.options.map((opt) => (
                <button
                  key={opt}
                  className="option-btn"
                  onClick={() => selectOptionSafe(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
