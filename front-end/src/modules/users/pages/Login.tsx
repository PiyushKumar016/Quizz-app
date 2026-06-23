// Login.tsx
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../validations/register-validation';
import { doLogin } from '../api/user-api';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

type LoginFormData = { email: string; password: string };

const Login = () => {
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await doLogin(data);
      if (result.data.user) {
        localStorage.setItem('user', JSON.stringify(result.data.user));
        navigate('/dashboard');
      } else {
        setIsError(true);
        setMessage(result.data.message);
      }
    } catch {
      setIsError(true);
      setMessage('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#07040f] flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-violet-600 flex items-center justify-center text-white font-black text-xl mx-auto mb-4 shadow-lg shadow-violet-500/40">
            G
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Welcome back</h1>
          <p className="text-slate-500 text-sm">Log in to your Gyanito account</p>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 shadow-2xl">
          {message && (
            <div className={`mb-6 px-4 py-3 rounded-xl text-sm font-medium border ${
              isError
                ? 'bg-red-500/10 border-red-500/20 text-red-300'
                : 'bg-violet-500/10 border-violet-500/20 text-violet-300'
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-sm font-medium">Email</Label>
              <Input
                type="email"
                {...register('email')}
                placeholder="you@example.com"
                className="bg-white/[0.05] border-white/10 text-white placeholder:text-slate-600 focus:border-violet-500/60 focus:ring-violet-500/20 rounded-xl h-11"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label className="text-slate-300 text-sm font-medium">Password</Label>
              <Input
                type="password"
                {...register('password')}
                placeholder="••••••••"
                className="bg-white/[0.05] border-white/10 text-white placeholder:text-slate-600 focus:border-violet-500/60 focus:ring-violet-500/20 rounded-xl h-11"
              />
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 mt-2"
            >
              Log in
            </button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;