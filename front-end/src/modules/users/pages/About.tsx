// About.tsx
import { Zap, Trophy, Target, BarChart2 } from 'lucide-react';

const features = [
  { icon: Zap, title: 'Quick Quizzes', desc: 'Short, focused quizzes that fit into your schedule and maximise retention.' },
  { icon: Trophy, title: 'Leaderboard', desc: 'Compete with peers and secure your rank among top learners.' },
  { icon: Target, title: 'Many Categories', desc: 'From science to history — find quizzes across every subject you need.' },
  { icon: BarChart2, title: 'Progress Tracking', desc: 'Visual stats that show exactly how far you have come.' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#07040f] text-white px-6 pt-32 pb-20">
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-16">
          <p className="text-violet-400 text-sm uppercase tracking-widest font-medium mb-3">About</p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-5">
            What is Gyanito?
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Gyanito is an interactive quiz platform designed to make learning competitive and addictive.
            Test your knowledge, challenge friends, and climb the leaderboard while actually improving your skills.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white/[0.03] border border-white/8 hover:border-violet-500/30 rounded-2xl p-7 flex gap-5 group transition-all duration-300 hover:bg-violet-500/5"
            >
              <div className="w-11 h-11 shrink-0 rounded-xl bg-violet-600/20 flex items-center justify-center group-hover:bg-violet-600/30 transition-colors">
                <f.icon className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1.5">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 bg-violet-600/10 border border-violet-500/20 rounded-2xl p-8 text-center">
          <p className="text-violet-300 text-sm uppercase tracking-widest font-medium mb-2">Our mission</p>
          <p className="text-white text-xl font-semibold leading-relaxed max-w-xl mx-auto">
            Make studying feel less like a chore and more like a game worth winning.
          </p>
        </div>
      </div>
    </div>
  );
}