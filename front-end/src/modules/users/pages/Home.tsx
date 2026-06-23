// Home.tsx
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Trophy, BarChart, Users, ArrowRight, Zap } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  const features = [
    { icon: Brain, title: 'Smart Quizzes', desc: 'Adaptive questions that match your level and sharpen your thinking.' },
    { icon: Trophy, title: 'Leaderboards', desc: 'Compete with peers and climb the ranks in real time.' },
    { icon: BarChart, title: 'Progress Stats', desc: 'See exactly where you stand and what to improve next.' },
    { icon: Users, title: 'Community', desc: 'Learn alongside thousands of motivated students.' },
  ];

  const steps = ['Pick a quiz', 'Answer questions', 'See your score', 'Beat your best'];

  return (
    <div className="bg-[#07040f] text-white">

      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(124,58,237,0.18),transparent_70%)] pointer-events-none" />
        <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium px-4 py-2 rounded-full mb-8"
        >
          <Zap className="w-3.5 h-3.5" />
          Quiz smarter. Learn faster.
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6 max-w-3xl"
        >
          Learn anything.<br />
          <span className="text-violet-400">Beat everyone.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-slate-400 text-lg max-w-xl mb-10 leading-relaxed"
        >
          Gyanito turns studying into a competitive sport. Take quizzes, track your growth, and outlast the competition.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex gap-3 flex-wrap justify-center"
        >
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold px-7 py-3 rounded-xl shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-200"
          >
            Get started <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate('/about')}
            className="text-slate-300 hover:text-white border border-white/10 hover:border-white/20 px-7 py-3 rounded-xl font-medium transition-all duration-200 hover:bg-white/5"
          >
            Learn more
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 w-full max-w-lg bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-left shadow-2xl"
        >
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-4 font-medium">Sample question</p>
          <p className="text-white font-medium mb-4">What is the powerhouse of the cell?</p>
          <div className="grid grid-cols-2 gap-2">
            {['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi body'].map((opt, i) => (
              <div key={i} className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                i === 1
                  ? 'bg-violet-600/30 border-violet-500/50 text-violet-200'
                  : 'bg-white/[0.03] border-white/10 text-slate-400'
              }`}>
                {i === 1 && '✓ '}{opt}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="py-24 px-6 max-w-6xl mx-auto">
        <p className="text-center text-slate-500 text-sm uppercase tracking-widest font-medium mb-4">Why Gyanito</p>
        <h2 className="text-center text-3xl md:text-4xl font-bold text-white mb-16">Built for serious learners</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/[0.03] border border-white/8 hover:border-violet-500/30 rounded-2xl p-6 group transition-all duration-300 hover:bg-violet-500/5"
            >
              <div className="w-10 h-10 rounded-xl bg-violet-600/20 flex items-center justify-center mb-4 group-hover:bg-violet-600/30 transition-colors">
                <f.icon className="w-5 h-5 text-violet-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.02] border-y border-white/5">
        <p className="text-center text-slate-500 text-sm uppercase tracking-widest font-medium mb-4">How it works</p>
        <h2 className="text-center text-3xl md:text-4xl font-bold text-white mb-16">Four steps to the top</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <div key={i} className="flex md:flex-col items-center gap-4 md:gap-3 flex-1">
              <div className="w-12 h-12 shrink-0 rounded-2xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-300 font-bold text-lg">
                {i + 1}
              </div>
              <p className="text-slate-300 font-medium text-center">{step}</p>
              {i < steps.length - 1 && (
                <ArrowRight className="hidden md:block w-5 h-5 text-slate-700 shrink-0 -mr-2 self-start mt-3" />
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="py-28 px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Ready to start?</h2>
        <p className="text-slate-400 mb-10 max-w-md mx-auto">Join Gyanito and turn every study session into a win.</p>
        <button
          onClick={() => navigate('/login')}
          className="bg-violet-600 hover:bg-violet-500 text-white font-semibold px-10 py-4 rounded-2xl shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-200 text-lg"
        >
          Start for free
        </button>
      </section>
    </div>
  );
}