import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, User, Mail, Image, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../providers/AuthProvider';

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  // Validate Password strictly as required by Work.docx
  const validatePassword = (pass) => {
    if (pass.length < 6) {
      return 'Password must be at least 6 characters long.';
    }
    if (!/[A-Z]/.test(pass)) {
      return 'Password must contain at least one Uppercase letter (A-Z).';
    }
    if (!/[a-z]/.test(pass)) {
      return 'Password must contain at least one Lowercase letter (a-z).';
    }
    return '';
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    setPasswordError(validatePassword(val));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const errorMsg = validatePassword(password);
    if (errorMsg) {
      setPasswordError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    setIsSubmitting(true);
    try {
      await createUser(email, password);
      await updateUserProfile(name, photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80');
      toast.success('Registration successful! Please log in.');
      navigate('/login');
    } catch (error) {
      console.error('Registration Error:', error);
      toast.error(error.message || 'Registration failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      toast.success('Signed in with Google!');
      navigate('/');
    } catch (error) {
      console.error('Google Sign-in Error:', error);
      toast.error(error.message || 'Google authentication failed');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-2xl p-8 space-y-6">
        
        {/* Title */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto">
            <UserPlus className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Create DriveFleet Account
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Join thousands of travelers renting and sharing luxury cars
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          
          {/* Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Photo URL
            </label>
            <div className="relative">
              <Image className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                placeholder="https://images.unsplash.com/photo-..."
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
          </div>

          {/* Password with inline validation */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={handlePasswordChange}
                required
                className={`w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border ${
                  passwordError ? 'border-red-500 focus:ring-red-500/50' : 'border-slate-200 dark:border-slate-800 focus:ring-blue-500/50'
                } text-slate-900 dark:text-white placeholder-slate-400 text-sm font-semibold focus:outline-none focus:ring-2`}
              />
            </div>

            {/* Validation Checklist / Error */}
            {passwordError ? (
              <p className="mt-2 text-xs text-red-500 font-semibold flex items-center">
                <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                <span>{passwordError}</span>
              </p>
            ) : (
              <p className="mt-1.5 text-[11px] text-slate-400 font-medium">
                Must include 1 uppercase, 1 lowercase letter, & min 6 characters.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || Boolean(passwordError)}
            className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-lg shadow-blue-500/25 transition-all disabled:opacity-50"
          >
            {isSubmitting ? 'Creating Account...' : 'Register Account'}
          </button>

        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-200 dark:border-slate-800 w-full"></div>
          <span className="bg-white dark:bg-slate-900 px-3 text-xs text-slate-500 uppercase font-bold relative z-10">
            Or continue with
          </span>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm transition-all flex items-center justify-center space-x-3 shadow-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          <span>Sign Up with Google</span>
        </button>

        {/* Link to Login */}
        <p className="text-center text-xs text-slate-500 font-medium">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Login here
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;
