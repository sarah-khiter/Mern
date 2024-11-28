import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditUser.css'; 

const EditUser = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log(token);
        console.log(id);
        const response = await fetch(`http://localhost:3000/user/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          setMessage(errorData.error || 'Erreur lors de la récupération des informations de l\'utilisateur.');
          return;

        }

        const user = await response.json();
        setFormData({
          username: user.username,
          email: user.email,
          role: user.role,
        });
      } catch (error) {
        console.error('Erreur :', error);
        setMessage('Impossible de charger les informations de l\'utilisateur.');
      }
    };

    fetchUser();
  }, [id]);

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
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(errorData.error || 'Erreur lors de la mise à jour de l\'utilisateur.');
        return;
      }

      setMessage('Utilisateur mis à jour avec succès.');
    } catch (error) {
      console.error('Erreur :', error);
      setMessage('Impossible de mettre à jour les informations.');
    }
  };
  const handleBackToList = () => {
    navigate('/UserList');
  };

  return (
    <div className="edit-user-container">
      <h2 className="edit-user-title">Modifier l'utilisateur</h2>
      {message && <p className="edit-user-message">{message}</p>}
      <form onSubmit={handleSubmit} className="edit-user-form">
        <div className="form-group">
          <label htmlFor="username" className="form-label">Nom d'utilisateur :</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
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
          <label htmlFor="role" className="form-label">Rôle :</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="user">Utilisateur</option>
            <option value="admin">Administrateur</option>
          </select>
        </div>
        <button type="submit" className="edit-user-button">Mettre à jour</button>
        <button type="button" onClick={handleBackToList} className="back-to-list-button">Retour à la liste</button>
      </form>
    </div>
  );
};

export default EditUser;
