import { useEffect, useState } from 'react';
import { getAllQuizzes } from '../api/quiz-api';
import { useNavigate } from 'react-router-dom';
import { QuizCard } from './QuizCard';
import { FileText, BookOpen } from 'lucide-react';

interface Quiz {
  _id: string;
  title: string;
  duration: number;
}

const UserDashboard = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      const res = await getAllQuizzes();
      setQuizzes(res.data);
      setLoading(false);
    };
    fetchQuizzes();
  }, []);
  return (
    <div className="min-h-screen bg-[#07040f] text-white pt-28 px-6 pb-16">
      <div className="max-w-6xl mx-auto">

        <div className="mb-10">
          <p className="text-violet-400 text-sm uppercase tracking-widest font-medium mb-2">Dashboard</p>
          <h1 className="text-3xl font-bold text-white">Available Quizzes</h1>
          <p className="text-slate-500 mt-1">Pick one and start climbing the leaderboard.</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-40 bg-white/[0.03] border border-white/8 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : quizzes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-14 h-14 rounded-2xl bg-violet-600/15 border border-violet-500/20 flex items-center justify-center mb-4">
              <BookOpen className="w-7 h-7 text-violet-400" />
            </div>
            <p className="text-slate-300 font-medium mb-1">No quizzes yet</p>
            <p className="text-slate-600 text-sm">Check back soon — new quizzes are coming.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {quizzes.map((quiz) => (
              <div key={quiz._id} onClick={() => navigate(`/quiz/${quiz._id}`)}>
                <QuizCard name={quiz.title} duration={quiz.duration} Icon={FileText} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;