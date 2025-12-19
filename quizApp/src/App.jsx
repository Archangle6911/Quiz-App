import { useMemo, useState } from "react";
import "./styles.css";

const QUESTIONS = [
  {
    id: 1,
    question: "Which language runs in the browser?",
    options: ["Python", "C++", "JavaScript", "Java"],
    answerIndex: 2,
  },
  {
    id: 2,
    question: "What does CSS stand for?",
    options: ["Color Style Sheets", "Cascading Style Sheets", "Creative Styling System", "Computer Style Syntax"],
    answerIndex: 1,
  },
  {
    id: 3,
    question: "Which HTML tag is used for the largest heading?",
    options: ["<h6>", "<h1>", "<head>", "<header>"],
    answerIndex: 1,
  },
  {
    id: 4,
    question: "Which method converts JSON string to object in JS?",
    options: ["JSON.parse()", "JSON.stringify()", "Object.toJSON()", "parse.JSON()"],
    answerIndex: 0,
  },
  {
    id: 5,
    question: "React is mainly used for building ____.",
    options: ["Databases", "User interfaces", "Operating systems", "Compilers"],
    answerIndex: 1,
  },
];

function computeScore(questions, answers) {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (answers[i] === questions[i].answerIndex) score++;
  }
  return score;
}

export default function App() {
  const total = QUESTIONS.length;
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState(() => Array(total).fill(null));
  const [done, setDone] = useState(false);

  const score = useMemo(() => computeScore(QUESTIONS, answers), [answers]);

  const q = QUESTIONS[index];
  const canGoPrev = index > 0;
  const isLast = index === total - 1;
  const canGoNext = answers[index] !== null;

  function selectAnswer(optionIndex) {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = optionIndex;
      return next;
    });
  }

  function goNext() {
    if (!canGoNext) return;
    if (isLast) {
      setDone(true);
      return;
    }
    setIndex((v) => v + 1);
  }

  function goPrev() {
    if (!canGoPrev) return;
    setIndex((v) => v - 1);
  }

  function restart() {
    setIndex(0);
    setAnswers(Array(total).fill(null));
    setDone(false);
  }

  return (
    <main className="app">
      <header className="topbar">
        <h1 className="title">Quiz App</h1>
        <p className="subtitle">A clean quiz built with React.</p>
      </header>

      {!done ? (
        <section className="card">
          <div className="meta">
            <span>Question {index + 1}/{total}</span>
            <span>Score: {score}</span>
          </div>

          <h2 className="question">{q.question}</h2>

          <div className="answers">
            {q.options.map((opt, i) => {
              const selected = answers[index] === i;
              return (
                <button
                  key={opt}
                  type="button"
                  className={`answer ${selected ? "selected" : ""}`}
                  onClick={() => selectAnswer(i)}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          <div className="actions">
            <button className="btn secondary" onClick={goPrev} disabled={!canGoPrev}>
              Previous
            </button>
            <button className="btn" onClick={goNext} disabled={!canGoNext}>
              {isLast ? "Finish" : "Next"}
            </button>
          </div>
        </section>
      ) : (
        <section className="card">
          <h2 className="question">Done 🎉</h2>
          <p className="result">You scored {score} out of {total}.</p>
          <div className="actions">
            <button className="btn" onClick={restart}>Restart Quiz</button>
          </div>
        </section>
      )}

      <footer className="footer">
        <small>Demo-ready capstone presentation.</small>
      </footer>
    </main>
  );
}
