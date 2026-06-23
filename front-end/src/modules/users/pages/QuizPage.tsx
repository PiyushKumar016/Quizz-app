// QuizPage.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { getQuizById, submitQuiz } from '../api/quiz-api';
import { Clock, CheckCircle2, ArrowRight } from 'lucide-react';

interface Question {
  _id: string;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
}

interface Quiz {
  _id: string;
  title: string;
  description: string;
  duration: number;
  questions: Question[];
}

interface AnswerPayload {
  questionId: string;
  selectedIndex: number;
}

const QuizPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    if (!id) return;
    getQuizById(id)
      .then((res) => {
        setQuiz(res.data);
        setTimeLeft(res.data.duration * 60);
      })
      .catch((err) => {
        console.error("Fetch error", err);
        setError("Quiz not found or has been deleted.");
      });
  }, [id]);

  const handleSubmit = useCallback(async () => {
    if (!quiz) return;
    const answersToSubmit: AnswerPayload[] =
      Object.keys(answers).length === 0
        ? quiz.questions.map((q) => ({ questionId: q._id, selectedIndex: -1 }))
        : Object.entries(answers).map(([questionId, selectedIndex]) => ({ questionId, selectedIndex }));
    try {
      const res = await submitQuiz({ answers: answersToSubmit });
      setScore(res.data.score);
      setSubmitted(true);
    } catch (err) {
      console.error('Submit error', err);
    }
  }, [quiz, answers]);

  useEffect(() => {
    if (!quiz) return;
    if (timeLeft <= 0 && !submitted) { handleSubmit(); return; }
    const timer = setInterval(() => setTimeLeft((p) => (p > 0 ? p - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitted, quiz, handleSubmit]);

  const formatTime = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  const answered = Object.keys(answers).length;
  const total = quiz?.questions.length ?? 0;
  const isLow = timeLeft < 60;
  if (error) return (
    <div className="min-h-screen bg-[#07040f] flex items-center justify-center px-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Oops!</h2>
        <p className="text-slate-400 mb-6">{error}</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-white/5 hover:bg-white/10 text-white font-semibold px-6 py-2.5 rounded-xl transition-all border border-white/10"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
  if (!quiz) return (
    <div className="min-h-screen bg-[#07040f] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (submitted && score !== null) return (
    <div className="min-h-screen bg-[#07040f] flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <div className="w-20 h-20 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-violet-400" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Quiz complete!</h2>
        <p className="text-slate-400 mb-6">You scored</p>
        <div className="text-6xl font-black text-violet-400 mb-1">{score}</div>
        <div className="text-slate-500 text-lg mb-10">out of {total}</div>
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 mx-auto bg-violet-600 hover:bg-violet-500 text-white font-semibold px-8 py-3 rounded-xl transition-all shadow-lg shadow-violet-500/25"
        >
          Back to dashboard <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#07040f] text-white pb-16 pt-20">
      <div className="sticky top-20 z-40 bg-[#07040f]/90 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-white font-bold text-lg leading-tight">{quiz.title}</h1>
            <p className="text-slate-500 text-xs mt-0.5">{answered} of {total} answered</p>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-mono font-semibold text-sm transition-colors ${
            isLow
              ? 'bg-red-500/10 border-red-500/30 text-red-300'
              : 'bg-violet-500/10 border-violet-500/20 text-violet-300'
          }`}>
            <Clock className="w-4 h-4" />
            {formatTime(timeLeft)}
          </div>
        </div>
        <div className="max-w-3xl mx-auto mt-3">
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-violet-500 rounded-full transition-all duration-500"
              style={{ width: `${(answered / total) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 pt-8 space-y-5">
        {quiz.questions.map((q, index) => (
          <div key={q._id} className="bg-white/[0.03] border border-white/8 rounded-2xl p-6">
            <p className="text-slate-400 text-xs font-medium uppercase tracking-widest mb-3">Question {index + 1}</p>
            <h3 className="text-white font-semibold text-base mb-5 leading-snug">{q.questionText}</h3>
            <div className="space-y-2.5">
              {q.options.map((opt, i) => (
                <label
                  key={i}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer border transition-all duration-150 ${
                    answers[q._id] === i
                      ? 'bg-violet-600/20 border-violet-500/50 text-white'
                      : 'bg-white/[0.02] border-white/8 text-slate-300 hover:border-violet-500/25 hover:bg-violet-500/5 hover:text-white'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                    answers[q._id] === i ? 'border-violet-400 bg-violet-400' : 'border-slate-600'
                  }`}>
                    {answers[q._id] === i && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </div>
                  <input
                    type="radio"
                    name={q._id}
                    checked={answers[q._id] === i}
                    onChange={() => setAnswers((prev) => ({ ...prev, [q._id]: i }))}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold py-4 rounded-xl transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 flex items-center justify-center gap-2 text-base mt-4"
        >
          Submit quiz <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default QuizPage;