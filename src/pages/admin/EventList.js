import React, { useState, useEffect } from 'react';
import EnteteDash from '../../components/EnteteDash';
import DashHeader from '../../components/DashHeader';
import API_URL from '../config/api';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch(`${API_URL}/api/admin/get_all_events`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des événements');
        }
        return response.json();
      })
      .then(data => {
        setEvents(data);
      })
      .catch(error => {
        setError(error.message);
        console.error('Erreur lors de la récupération des événements:', error);
      });
  }, []);

  const toggleFeatured = (eventId) => {
    console.log('ID de l\'événement à modifier:', eventId); // Ajoutez ceci pour vérifier l'ID

    const token = localStorage.getItem('token');

    fetch(`${API_URL}/api/admin/set_feature_event/${eventId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(updatedEvent => {
        console.log('Événement mis à jour:', updatedEvent); // Ajoutez ceci pour voir l'événement mis à jour

        // Met à jour l'état des événements
        const updatedEvents = events.map(event =>
          event.id === updatedEvent.id ? updatedEvent : event
        );
        setEvents(updatedEvents);

        // Met à jour le selectedEvent pour refléter les changements
        setSelectedEvent(updatedEvent);
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour de l\'état de l\'événement:', error);
      });
  };

  // Exemple pour gérer la sélection de l'événement
  const handleEventSelect = (event) => {
    console.log('Événement sélectionné:', event); // Ajoutez ceci pour voir quel événement a été sélectionné
    setSelectedEvent(event); // Assurez-vous que l'événement sélectionné est correct
  };


  return (
    <>
      <div className="container-scroller ">
        <div className="horizontal-menu">
          <EnteteDash />
          <DashHeader />
        </div>
        <div className="container overflow-container mt-5 pt-3">
          <div className="row">

            <div className="col-md-12 mb-5 p-4">
              <h2 className="mb-4" style={{ color: '#1a4a7c' }}>Les événements ({events.length})</h2>
              <div className="row">
                {events.length > 0 ? (
                  events.map(event => (
                    <div className="col-md-6 mb-4" key={event.id}>
                      <div
                        className="card mb-3"
                        onClick={() => setSelectedEvent(event)} // Ouvrir la modale au clic
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="row g-0">
                          <div className="col-md-5 col-6">
                            <img
                              src={`${API_URL}/${event.image1_url}`} // Assurez-vous que le chemin de l'image est correct
                              style={{ height: '150px', objectFit: 'cover', width: '100%' }}
                              className="img-fluid rounded-start"
                              alt={event.title}
                            />
                          </div>
                          <div className="col-md-7 col-6">
                            <div className="card-body">
                              <h5 className="card-title">
                                {event.title.slice(0, 8)}{event.title.length > 8 ? '...' : ''}
                              </h5>
                              <p className="card-text">
                                {event.is_free === 0 ? "Événement gratuit" : "Événement payant"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>{error ? error : "Aucun événement trouvé"}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal pour afficher les détails de l'événement */}
        {selectedEvent && (
          <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{selectedEvent.title}</h5>
                  <button type="button" className="btn-close" onClick={() => setSelectedEvent(null)}></button>
                </div>
                <div className="modal-body">
                 
                  <p>{selectedEvent.description}</p>
                  <p>Lieu: {selectedEvent.venue}</p>
                  <p>Date et heure: {selectedEvent.time}</p>

                  {selectedEvent.is_free === 1 && selectedEvent.tickets && selectedEvent.tickets.length > 0 ? (
                    <div>
                      <h6>Tickets disponibles :</h6>
                      <ul>
                        {selectedEvent.tickets.map((ticket) => (
                          <li key={ticket.id}>
                            <strong>{ticket.name}:</strong> {ticket.price} {ticket.currency || 'XOF'}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p>Cet événement est gratuit.</p>
                  )}
                  <span
                    className={`badge ${selectedEvent.is_featured ? 'bg-success' : 'bg-secondary'}`}
                    onClick={() => {
                      handleEventSelect(selectedEvent); // Sélectionnez l'événement avant de basculer l'état
                      toggleFeatured(selectedEvent.id); // Ensuite, changez l'état
                    }}
                  >
                    {selectedEvent.is_featured ? 'Validé' : 'Non validé'}
                  </span>




                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className={`btn ${selectedEvent.is_featured ? 'btn-danger' : 'btn-primary'}`}
                    onClick={() => {
                      handleEventSelect(selectedEvent); // Sélectionnez l'événement avant de basculer l'état
                      toggleFeatured(selectedEvent.id); // Ensuite, changez l'état
                    }}
                  >
                    {selectedEvent.is_featured ? 'Désactiver' : 'Activer'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EventList;
