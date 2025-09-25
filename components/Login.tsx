import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoginView, setIsLoginView] = useState(true);

  const handleAuthAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isLoginView) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      setError("Failed to authenticate. Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-rose-100 p-4" style={{
      backgroundImage: `url('https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className="w-full max-w-md p-8 md:p-10 space-y-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold text-slate-800">
            Our Story
          </h1>
          <p className="mt-2 text-slate-600">
            {isLoginView ? 'Welcome back, my love.' : 'Let\'s start our journey.'}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleAuthAction}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full px-4 py-3 border border-rose-200 bg-white/70 placeholder-slate-500 text-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400 sm:text-sm transition"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password-address" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full px-4 py-3 border border-rose-200 bg-white/70 placeholder-slate-500 text-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400 sm:text-sm transition"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-transform transform hover:scale-105"
            >
              {isLoginView ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-slate-600">
          {isLoginView ? "First time here?" : 'Already have our diary?'}
          <button onClick={() => setIsLoginView(!isLoginView)} className="ml-1 font-semibold text-rose-600 hover:text-rose-500 hover:underline">
            {isLoginView ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;