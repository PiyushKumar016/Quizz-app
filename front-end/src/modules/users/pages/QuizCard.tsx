// QuizCard.tsx
import { Clock, FileText } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface QuizCardProps {
  name: string;
  duration: number;
  Icon?: LucideIcon;
}

export function QuizCard({ name, duration, Icon = FileText }: QuizCardProps) {
  return (
    <div className="group bg-white/[0.03] border border-white/8 hover:border-violet-500/40 rounded-2xl p-6 flex flex-col gap-4 cursor-pointer transition-all duration-300 hover:bg-violet-500/5 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/10">
      <div className="w-12 h-12 rounded-xl bg-violet-600/15 border border-violet-500/20 flex items-center justify-center group-hover:bg-violet-600/25 transition-colors">
        <Icon className="w-6 h-6 text-violet-400" strokeWidth={1.8} />
      </div>
      <div className="flex-1">
        <h3 className="text-white font-semibold text-base leading-snug group-hover:text-violet-200 transition-colors">
          {name}
        </h3>
      </div>
      <div className="flex items-center gap-1.5 text-slate-500 text-sm">
        <Clock className="w-3.5 h-3.5 text-violet-500" />
        <span>{duration} min</span>
      </div>
    </div>
  );
}