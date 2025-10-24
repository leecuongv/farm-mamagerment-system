import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user, farms } = response.data;
      login(token, user);
      // You might want to load farms into FarmContext here
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const { id_token } = tokenResponse as any; // The library types might be off
        const response = await api.post('/auth/google', { id_token });
        const { token, user, farms } = response.data;
        login(token, user);
        // You might want to load farms into FarmContext here
        navigate('/dashboard');
      } catch (err: any) {
        setError(err.response?.data?.message || 'Google login failed');
        if (err.response?.data?.message === 'Tài khoản chưa được kích hoạt') {
            // Handle specific error message
        }
      }
    },
    onError: () => {
      setError('Google login failed');
    },
  });

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handlePasswordLogin}>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
      <hr />
      <button onClick={() => handleGoogleLogin()}>
        Login with Google
      </button>
    </div>
  );
};

export default LoginPage;
