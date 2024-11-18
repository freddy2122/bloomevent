import React, { useEffect, useState } from 'react';
import API_URL from '../config/api';
import EnteteDash from '../../components/EnteteDash';
import DashHeader from '../../components/DashHeader';

const TicketsDisplay = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Mois entre 01-12
        const day = String(date.getDate()).padStart(2, '0'); // Jour entre 01-31
        return `${year}-${month}-${day}`;
    };
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
                setUser(data.user);
                return fetchEvents(token);
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
                setEvents(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des événements:', error.message);
                setError(error.message);
                setLoading(false);
            });
    };

    if (loading) {
        return <p>Chargement des données...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <div className="container-scroller">
                <div className="horizontal-menu">
                    <EnteteDash />
                    <DashHeader />
                </div>
                <div className="container mt-5">
                    <h2 className="mb-4">Gestion des Billets et Inscriptions</h2>
                    <div className="row">
                        {events.length > 0 ? (
                            events.map((event) => (
                                <div key={event.id} className="col-md-12 mb-4">
                                    <div className="card">
                                        <div class="card-header" style={{ backgroundColor: '#213361' }}>
                                            <div class="row">
                                                <div class="col-md-3 mb-3 text-white text-center">{event.title}</div>
                                                <div class="col-md-3 mb-3 text-white text-center"><i class="fa-solid fa-location-dot"></i> {event.location}, {event.place}, {event.address}</div>
                                                <div class="col-md-3 mb-3 text-white text-center"><i class="fa-solid fa-calendar-days"></i> {formatDate(event.start_date)} / {formatDate(event.end_date)}</div>
                                                <div class="col-md-3 mb-3 text-white text-center"><i class="fa-solid fa-clock"></i>  {new Date(`1970-01-01T${event.start_time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}-
                                                    {new Date(`1970-01-01T${event.end_time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                            </div>
                                        </div>
                                        <div className="card-body">



                                            {event.tickets && event.tickets.length > 0 ? (
                                                <div className="row">
                                                    {event.tickets.map((ticket, index) => {
                                                        const soldPercentage = ((ticket.sold_quantity / ticket.total_quantity) * 100).toFixed(2);

                                                        return (
                                                            <div key={index} className="col-md-4">
                                                                <div className="card mb-2 h-100 border-right">
                                                                    <div className="card-body">
                                                                        <h6 className="card-subtitle mb-2 text-muted">{ticket.name}</h6>
                                                                        <p className="card-text">
                                                                            <strong>Prix :</strong> {ticket.price ? `${ticket.price} FCFA` : 'Gratuit'}<br />
                                                                            <strong>Quantité Totale :</strong> {ticket.total_quantity}<br />
                                                                            <strong>Quantité Vendue :</strong> {ticket.sold_quantity}<br />
                                                                            <strong>Quantité Restante :</strong> {ticket.available_quantity}<br />
                                                                            <strong>Taux de Vente :</strong> {soldPercentage}% vendus
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            ) : (
                                                <p className="text-muted">Aucun billet disponible pour cet événement.</p>
                                            )}

                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted">Aucun événement disponible.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default TicketsDisplay;
