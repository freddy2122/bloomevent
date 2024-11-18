import React, { useEffect, useState } from 'react';
import EnteteDash from '../../components/EnteteDash';
import DashHeader from '../../components/DashHeader';
import API_URL from '../config/api';

const DashboardPromoteur = () => {
  const [events, setEvents] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const currentDateTime = new Date(); // Récupère la date et l'heure actuelles

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token is missing');
      return;
    }

    console.log('Token utilisé:', token);

    // Récupérer le profil de l'organisateur
    fetch(`${API_URL}/api/organizer/get_my_profil`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(data => {
            throw new Error(data.message || 'Erreur lors de la récupération des données du profil');
          });
        }
        return response.json();
      })
      .then(data => {
        console.log('Données du profil récupérées:', data);
        setUser(data.user); // Stocke les informations de l'utilisateur
        setTickets(data.tickets || []); // En supposant que les tickets proviennent de cette requête
        return fetchEvents(token); // Récupérer les événements ensuite
      })
      .catch(error => {
        console.error('Erreur lors de la récupération:', error.message);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const fetchEvents = (token) => {
    fetch(`${API_URL}/api/organizer/events`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(data => {
            throw new Error(data.message || 'Erreur lors de la récupération des événements');
          });
        }
        return response.json();
      })
      .then(data => {
        console.log('Événements récupérés:', data);
        setEvents(data); // Utilisez un tableau vide par défaut
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des événements:', error.message);
        setError(error.message);
        setLoading(false);
      });
  };

  // Déterminez le statut de chaque événement
  const determineStatus = (event) => {
    const startDateTime = new Date(`${event.start_date} ${event.start_time}`);
    const endDateTime = new Date(`${event.end_date} ${event.end_time}`);

    let status;
    if (currentDateTime > endDateTime) {
      status = 'Terminé';
    } else if (currentDateTime >= startDateTime && currentDateTime <= endDateTime) {
      status = 'En cours';
    } else {
      status = 'À venir'; // Mise à jour ici pour une meilleure clarté
    }
    return status;
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  return (
    <>
      <div className="container-scroller">
        <div className="horizontal-menu">
          <EnteteDash />
          <DashHeader />
        </div>
        <div className="container">
          <div className="row mt-5 pt-3">
            {/* Cartes de résumé */}
            <div className="col-md-4 mb-3 mt-4">
              <div className="card stretch-card mb-3">
                <div className="card-body d-flex flex-wrap justify-content-between">
                  <div>
                    <h4 className="font-weight-semibold mb-1" style={{ color: '#213361' }}>
                      <i className="fa-solid fa-calendar-days"></i> Evénements
                    </h4>
                  </div>
                  <h3 className="text-success font-weight-bold">({events.length})</h3>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3 mt-4">
              <div className="card stretch-card mb-3">
                <div className="card-body d-flex flex-wrap justify-content-between">
                  <div>
                    <h4 className="font-weight-semibold mb-1" style={{ color: '#213361' }}>
                      <i className="fa-solid fa-ticket"></i> Total tickets
                    </h4>
                  </div>
                  <h3 className="text-success font-weight-bold">({tickets.length})</h3>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3 mt-4">
              <div className="card stretch-card mb-3">
                <div className="card-body d-flex flex-wrap justify-content-between">
                  <div>
                    <h4 className="font-weight-semibold mb-1" style={{ color: '#213361' }}>
                      <i className="fa-solid fa-wallet"></i> Balance
                    </h4>
                  </div>
                  <h3 className="text-success font-weight-bold">{user.balance} FCFA</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-3 pt-3">
            <div className="col-lg-7 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Les événements</h4>
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Nom de l'événement</th>
                          <th>Catégories</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {events.map(event => (
                          <tr key={event.id}>
                            <td>{event.title}</td>
                            <td>
                              {event.categories.map((category, index) => (
                                <span key={category.id}>
                                  {category.name}
                                  {index < event.categories.length - 1 && ', '}
                                </span>
                              ))}
                            </td>
                            <td>
                              <label className={`badge badge-${determineStatus(event) === 'Terminé' ? 'success' : determineStatus(event) === 'En cours' ? 'warning' : 'danger'}`}>
                                {determineStatus(event)}
                              </label>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>


            <div className="col-lg-5 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Tickets par événement</h4>
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Nom de l'événement</th>
                          <th>Tickets</th>
                        </tr>
                      </thead>
                      <tbody>
                        {events.map(event => (
                          <tr key={event.id}>
                            <td>{event.title}</td>
                            <td>
                              {event.tickets && event.tickets.length > 0 ? (
                                event.tickets.map((ticket, index) => (
                                  <div key={ticket.id}>
                                    {ticket.name} {index < event.tickets.length - 1 && ', '}
                                  </div>
                                ))
                              ) : (
                                <span>Aucun ticket disponible</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </>
  );
};

export default DashboardPromoteur;
