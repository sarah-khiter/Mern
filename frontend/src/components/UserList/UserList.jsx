import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserList.css'; // Assurez-vous d'avoir un fichier CSS pour styliser le tableau

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]); // Utilisateurs filtrés
  const [searchQuery, setSearchQuery] = useState(''); // Recherche
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setMessage('Aucun token trouvé. Veuillez vous connecter.');
          return;
        }

        const response = await fetch('http://localhost:3000/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          setMessage(errorData.error || 'Erreur lors de la récupération des utilisateurs.');
          return;
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          setMessage('Format de réponse inattendu de l\'API.');
          return;
        }

        setUsers(data);
        setFilteredUsers(data); 

        /* const decodedToken = JSON.parse(atob(token.split('.')[1])); 
        setIsAdmin(decodedToken.role === 'admin'); */
        setMessage('');
      } catch (error) {
        console.error('Erreur :', error);
        setMessage('Impossible de contacter le serveur.');
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/delete/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        const updatedUsers = users.filter((user) => user._id !== id);
         setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
        setMessage('Utilisateur supprimé avec succès.');
      } else {
        setMessage(data.error || 'Erreur lors de la suppression.');
      }
    } catch (error) {
      console.error('Erreur :', error);
      setMessage('Impossible de supprimer l\'utilisateur.');
    }
  };

  const handleEdit = (id) => {
    navigate(`/EditUser/${id}`); 
  };
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className="user-list-container">
      <h2 className="user-list-title">Liste des utilisateurs</h2>
      {message && <p className="user-list-message">{message}</p>}
      <input
        type="text"
        placeholder="Rechercher par nom, email ou rôle..."
        value={searchQuery}
        onChange={handleSearch}
        className="user-list-search"
      />
      <table className="user-list-table">
        <thead>
          <tr>
            <th>Nom d'utilisateur</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
               
                <td>
                  <button onClick={() => handleEdit(user._id)} className="user-list-edit-button">Modifier</button>
                  <button onClick={() => handleDelete(user._id)} className="user-list-delete-button">Supprimer</button>
                </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
