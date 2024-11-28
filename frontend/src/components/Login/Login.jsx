import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormData({ email: '', password: '' });
        localStorage.setItem('token', data.token);
        navigate('/UserList');
      } else {
        setMessage(data.error || 'Erreur de connexion.');
      }
    } catch (error) {
      console.error('Erreur :', error);
      setMessage('Impossible de contacter le serveur.');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Connexion</h2>
      {message && <p className="login-message">{message}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email :</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Mot de passe :</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="login-button">Se connecter</button>
      </form>
      {token && (
        <div className="token-display">
          <h3>Token reçu :</h3>
          <textarea
            readOnly
            value={token}
            className="token-textarea"
          />
        </div>
      )}
    </div>
  );
};

export default Login;
