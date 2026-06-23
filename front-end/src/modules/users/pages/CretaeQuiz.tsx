// CreateQuiz.tsx
import { useForm, useFieldArray } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { Plus, Trash2, ArrowLeft } from 'lucide-react';

interface Question {
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
}

interface QuizFormData {
  title: string;
  description: string;
  duration: number;
  questions: Question[];
}

const inputCls = "bg-white/[0.04] border-white/10 text-white placeholder:text-slate-600 focus:border-violet-500/60 rounded-xl h-11";

const CreateQuiz = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const { register, control, handleSubmit, formState: { errors } } = useForm<QuizFormData>({
    defaultValues: {
      title: '', description: '', duration: 15,
      questions: [{ questionText: '', options: ['', '', '', ''], correctAnswerIndex: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'questions' });

  const onSubmit = async (data: QuizFormData) => {
    try {
      await axios.post(`${import.meta.env.VITE_QUIZ_API}create`, data);
      setMessage('Quiz created successfully!');
      navigate('/admindashboard');
    } catch {
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#07040f] text-white pt-28 px-6 pb-16">
      <div className="max-w-3xl mx-auto">

        <button
          onClick={() => navigate('/admindashboard')}
          className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to dashboard
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-1">Create a quiz</h1>
          <p className="text-slate-500 text-sm">Fill in the details and add your questions.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6 space-y-5">
            <h2 className="text-white font-semibold">Quiz details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-slate-400 text-sm">Title</Label>
                <Input {...register('title', { required: true })} placeholder="e.g. JavaScript Basics" className={inputCls} />
                {errors.title && <p className="text-red-400 text-xs">Title is required</p>}
              </div>
              <div className="space-y-1.5">
                <Label className="text-slate-400 text-sm">Duration (minutes)</Label>
                <Input type="number" {...register('duration', { required: true })} className={inputCls} />
              </div>
              <div className="md:col-span-2 space-y-1.5">
                <Label className="text-slate-400 text-sm">Description</Label>
                <Input {...register('description')} placeholder="Short description (optional)" className={inputCls} />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="bg-white/[0.03] border border-white/8 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-violet-400 text-sm font-semibold uppercase tracking-widest">Question {index + 1}</span>
                  <button type="button" onClick={() => remove(index)} className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 border border-white/8 hover:border-red-500/30 px-3 py-1.5 rounded-lg transition-all">
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
                <Input {...register(`questions.${index}.questionText`)} placeholder="Enter your question" className={inputCls} />
                <div className="grid grid-cols-2 gap-3">
                  {[0, 1, 2, 3].map((optIndex) => (
                    <Input key={optIndex} {...register(`questions.${index}.options.${optIndex}`)} placeholder={`Option ${optIndex + 1}`} className={inputCls} />
                  ))}
                </div>
                <div className="space-y-1.5">
                  <Label className="text-slate-400 text-sm">Correct answer index (0–3)</Label>
                  <Input type="number" min={0} max={3} {...register(`questions.${index}.correctAnswerIndex`)} className={`${inputCls} max-w-[120px]`} />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => append({ questionText: '', options: ['', '', '', ''], correctAnswerIndex: 0 })}
              className="w-full flex items-center justify-center gap-2 border border-dashed border-white/15 hover:border-violet-500/40 text-slate-400 hover:text-violet-300 py-4 rounded-2xl text-sm font-medium transition-all hover:bg-violet-500/5"
            >
              <Plus className="w-4 h-4" /> Add question
            </button>
          </div>

          {message && (
            <p className={`text-center text-sm ${message.includes('wrong') ? 'text-red-400' : 'text-green-400'}`}>{message}</p>
          )}

          <button type="submit" className="w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40">
            Create quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;