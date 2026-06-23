import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../validations/register-validation';
import type { RegisterSchemaType } from '../validations/register-validation';
import { doRegister } from '../api/user-api';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

const Register = () => {
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '' },
  });

  const registerSubmit = async (userData: RegisterSchemaType) => {
    try {
      const result = await doRegister(userData);
      if (result.data.message) {
        navigate('/login');
      } else {
        setStatus(true);
        setMessage('Unable to register. Please try again.');
      }
    } catch (err: unknown) {
      setStatus(true);
      const e = err as { response?: { data?: { message?: string } } };
      setMessage(e.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <div className="min-h-screen bg-[#07040f] flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-violet-600 flex items-center justify-center text-white font-black text-xl mx-auto mb-4 shadow-lg shadow-violet-500/40">
            G
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Create an account</h1>
          <p className="text-slate-500 text-sm">Join Gyanito and start competing</p>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 shadow-2xl">
          {status && (
            <div className="mb-6 px-4 py-3 rounded-xl text-sm font-medium border bg-red-500/10 border-red-500/20 text-red-300">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit(registerSubmit)} className="space-y-5">
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-sm font-medium">Name</Label>
              <Input
                {...register('name')}
                type="text"
                placeholder="Your full name"
                className="bg-white/[0.05] border-white/10 text-white placeholder:text-slate-600 focus:border-violet-500/60 focus:ring-violet-500/20 rounded-xl h-11"
              />
              {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label className="text-slate-300 text-sm font-medium">Email</Label>
              <Input
                {...register('email')}
                type="email"
                placeholder="you@example.com"
                className="bg-white/[0.05] border-white/10 text-white placeholder:text-slate-600 focus:border-violet-500/60 focus:ring-violet-500/20 rounded-xl h-11"
              />
              {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label className="text-slate-300 text-sm font-medium">Password</Label>
              <Input
                {...register('password')}
                type="password"
                placeholder="••••••••"
                className="bg-white/[0.05] border-white/10 text-white placeholder:text-slate-600 focus:border-violet-500/60 focus:ring-violet-500/20 rounded-xl h-11"
              />
              {errors.password && <p className="text-red-400 text-xs">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 mt-2"
            >
              Create account
            </button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;