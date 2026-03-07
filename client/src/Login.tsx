import { useState } from 'react';
import { createClient } from './supabase.ts';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import './style/Login.css'


const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
    setError(null); 
  };

  const handleSignIn = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.code === 'invalid_credentials') {
          setError('Invalid email or password. Please try again.');
        } else {
          setError(error.message);
        }
      } else {
        console.log('Sign in successful:', data);
      }
    } catch (err) {
      setError('Unexpected error');
      console.error('Sign in error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (email: string, password: string, name?: string) => {
    setError(null);
    setIsLoading(true);
    
    try {
      const supabase = createClient();
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                emailRedirectTo: "http://localhost:5173/"
            }
        });

      if (error) {
        if (error.code === 'user_already_exists') {
          setError('An account with this email already exists. Please sign in instead.');
        } else if (error.code ===('weak_password')) {
          setError('Password is too weak. Please use a strong password.');
        } else {
          setError(error.message);
        }
      } else {
        setError(null);
        alert('Sign up successful! Please check your email to verify your account.');
        setIsSignIn(true); // Switch to sign in form
      }
    } catch (err) {
      setError('Unexpected error');
      console.error('Sign up error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="auth-box">
        <h2 className='signin-header'>{isSignIn ? 'Sign In' : 'Sign Up'}</h2>
        
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
        
        {isSignIn ? (
          <LoginForm 
            onSubmit={handleSignIn}
            isLoading={isLoading}
          />
        ) : (
          <SignUpForm 
            onSubmit={handleSignUp}
            isLoading={isLoading}
          />
        )}
        
        <div className="toggle-link">
          {isSignIn ? (
            <p>
              Don't have an account?{' '}
              <button onClick={toggleForm} className="link-button">
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button onClick={toggleForm} className="link-button">
                Sign In
              </button>
            </p>
          )}
        </div>
      </div>
  );
};

export default Login;
