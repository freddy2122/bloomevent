import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EnteteDash from '../../components/EnteteDash';
import DashHeader from '../../components/DashHeader';
import API_URL from '../config/api';

const GestionUser = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  // Fonction pour afficher un toast
  const showToast = (message, type = 'success') => {
    if (type === 'success') {
      toast.success(message, {
        position: "bottom-right", // Use string instead of toast.POSITION.BOTTOM_RIGHT
      });
    } else {
      toast.error(message, {
        position: "bottom-right", // Use string instead of toast.POSITION.BOTTOM_RIGHT
        color: 'red'
      });
    }
  };
  

  // Fonction pour récupérer la liste des utilisateurs
  const fetchUsers = () => {
    const token = localStorage.getItem('token');

    fetch(`${API_URL}/api/admin/get_all_users`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des utilisateurs');
        }
        return response.json();
      })
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        setError(error.message);
        showToast(error.message, 'error');
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      });
  };

  // Utiliser useEffect pour charger la liste des utilisateurs
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fonction pour suspendre/réactiver un utilisateur
  const toggleUserStatus = (userId, isActive) => {
    const token = localStorage.getItem('token');

    // Déterminer l'URL en fonction de l'action (suspendre ou activer)
    const action = isActive ? 'disable_user' : 'enable_user';
    fetch(`${API_URL}/api/admin/${action}/${userId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erreur lors de la mise à jour de l'utilisateur`);
        }
        return response.json();
      })
      .then(data => {
        showToast(data.message);
        fetchUsers(); // Recharger la liste des utilisateurs pour voir la mise à jour
      })
      .catch(error => {
        setError(error.message);
        showToast(error.message, 'error');
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
      });
  };

  return (
    <>
      <div className="container-scroller">
        <div className="horizontal-menu">
          <EnteteDash />
          <DashHeader />
        </div>
        <div className="container mt-5 pt-3">
          <div className="row">
            <div className="col-md-12 mb-5 p-4">
              <h2 className="mb-4" style={{ color: '#1a4a7c' }}>
                Les utilisateurs ({users.length})
              </h2>
              <div className="row">
                <div className="col-md-12">
                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
                      <thead>
                        <tr>
                          <th>Nom & Prénoms</th>
                          <th>E-mail</th>
                          <th>Téléphone</th>
                          <th>Rôle</th>
                          <th>Organisation</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.length > 0 ? (
                          users.map(user => (
                            <tr key={user.id}>
                              <td>{user.name}</td>
                              <td>{user.email}</td>
                              <td>{user.phone_number}</td>
                              <td>{user.role}</td>
                              <td>{user.organisation_name}</td>
                              <td>
                                <i
                                  className={`fas ${user.is_active ? 'fa-ban text-warning' : 'fa-check-circle text-success'}`}
                                  title={user.is_active ? "Désactiver le compte" : "Activer le compte"}
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => toggleUserStatus(user.id, user.is_active)}
                                ></i>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6">{error ? error : "Aucun utilisateur trouvé"}</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default GestionUser;
