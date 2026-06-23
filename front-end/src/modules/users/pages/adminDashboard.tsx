// AdminDashboard.tsx
import { useEffect, useState } from 'react';
import { getAllQuizzes, deleteQuiz } from '@/modules/users/api/quiz-api';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2, Plus, LayoutGrid, BookOpen } from 'lucide-react';

interface Quiz {
  _id: string;
  title: string;
  description: string;
}

const AdminDashboard = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const navigate = useNavigate();

  const loadQuizzes = async () => {
    const res = await getAllQuizzes();
    setQuizzes(res.data);
  };

  const handleDelete = async (id: string) => {
    await deleteQuiz(id);
    loadQuizzes();
  };

  useEffect(() => {
    loadQuizzes();
  }, []);

  return (
    <div className="min-h-screen bg-[#07040f] text-white pt-28 px-6 pb-16">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-violet-400 text-sm uppercase tracking-widest font-medium mb-2">Admin</p>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              <LayoutGrid className="w-7 h-7 text-violet-400" />
              Quiz Management
            </h1>
          </div>
          <button
            onClick={() => navigate('/admin/create-quiz')}
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
          >
            <Plus className="w-4 h-4" />
            New Quiz
          </button>
        </div>

        {quizzes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-14 h-14 rounded-2xl bg-violet-600/15 border border-violet-500/20 flex items-center justify-center mb-4">
              <BookOpen className="w-7 h-7 text-violet-400" />
            </div>
            <p className="text-slate-300 font-medium mb-1">No quizzes yet</p>
            <p className="text-slate-600 text-sm mb-6">Create your first quiz to get started.</p>
            <button
              onClick={() => navigate('/admin/create-quiz')}
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold px-5 py-2.5 rounded-xl transition-all"
            >
              <Plus className="w-4 h-4" /> Create quiz
            </button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quizzes.map((quiz) => (
              <div
                key={quiz._id}
                className="bg-white/[0.03] border border-white/8 rounded-2xl p-6 flex flex-col gap-4 hover:border-violet-500/30 transition-all duration-200 group"
              >
                <div>
                  <h2 className="text-white font-semibold text-base mb-1 group-hover:text-violet-200 transition-colors">
                    {quiz.title}
                  </h2>
                  <p className="text-slate-500 text-sm line-clamp-2">{quiz.description}</p>
                </div>
                <div className="flex gap-2 mt-auto pt-2 border-t border-white/5">
                  <button
                    onClick={() => navigate(`/admin/edit-quiz/${quiz._id}`)}
                    className="flex items-center gap-1.5 text-sm text-slate-300 hover:text-white bg-white/5 hover:bg-violet-600/20 border border-white/8 hover:border-violet-500/30 px-3.5 py-2 rounded-xl transition-all"
                  >
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(quiz._id)}
                    className="flex items-center gap-1.5 text-sm text-red-400 hover:text-white hover:bg-red-500/20 border border-white/8 hover:border-red-500/30 px-3.5 py-2 rounded-xl transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;