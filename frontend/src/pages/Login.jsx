// src/pages/Login.jsx
import { useState } from 'react';
import { login } from '../services/api';

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email) return setError('Email is required.');
    if (!password) return setError('Password is required.');

    setLoading(true);
    try {
      const result = await login(email, password);
      if (result.success) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        onLoginSuccess();
      } else {
        setError(result.message || 'Invalid email or password.');
      }
    } catch (err) {
      setError('Could not connect to server.');
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Fute Services</h2>
        <p className="subtitle">Admin Login</p>

        {error && <div className="error-box">{error}</div>}

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@futeservices.com"
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;
