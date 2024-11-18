import React, { useState, useEffect } from 'react';
import ticket from '../assets/images/ticket.png';
import start from '../assets/images/start.png';
import { Link } from 'react-router-dom';
import SkeletonCard from './SkeletonCard';
import API_URL from '../pages/config/api';


const EventCards = () => {
    const [loading, setLoading] = useState(true); // État pour le chargement
    const [events, setEvents] = useState([]);
    const [filter, setFilter] = useState('tout');
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`${API_URL}/api/events`); // Effectuer la requête pour récupérer les événements
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des événements');
                }
                const data = await response.json();
               
                setEvents(data.events); // Mettre à jour l'état avec les événements récupérés
            } catch (error) {
                console.error('Erreur:', error);
            } finally {
                setLoading(false); // Arrêter le loading une fois la requête terminée
            }
        };

        fetchEvents(); // Appeler la fonction pour récupérer les événements
    }, []);
    const featuredEvents = events.filter(event => event.is_featured === 1);

    const filteredEvents = featuredEvents.filter(event => {
        if (filter === 'tout') return true; // Affiche tous les événements
        const eventDate = new Date(event.date); // Supposez que 'date' est au format ISO
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        const weekendStart = new Date();
        weekendStart.setDate(today.getDate() + (6 - today.getDay())); // Prochain samedi

        if (filter === 'aujourd’hui') {
            return eventDate.toDateString() === today.toDateString();
        }
        if (filter === 'demain') {
            return eventDate.toDateString() === tomorrow.toDateString();
        }
        if (filter === 'ce week-end') {
            return eventDate >= weekendStart && eventDate < weekendStart.setDate(weekendStart.getDate() + 2); // Samedi et dimanche
        }
        if (filter === 'libre') {
            return event.is_free === 1; // Supposez que vous avez une propriété `is_free`
        }
        return false; // Par défaut, ne pas afficher
    });
    return (
        <>
            <div className='d-flex mb-4 overflow-auto'>
                <button className='btn mx-2' style={{ borderRadius: '18px', border: 'solid #6F6F6F 1px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'box-shadow 0.3s ease' }} onClick={() => setFilter('tout')}>Tout</button>
                <button className='btn mx-2' style={{ borderRadius: '18px', border: 'solid #6F6F6F 1px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'box-shadow 0.3s ease' }} onClick={() => setFilter('aujourd’hui')}>Aujourd’hui</button>
                <button className='btn mx-2' style={{ borderRadius: '18px', border: 'solid #6F6F6F 1px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'box-shadow 0.3s ease' }} onClick={() => setFilter('demain')}>Demain</button>
                <button className='btn mx-2' style={{ borderRadius: '18px', border: 'solid #6F6F6F 1px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'box-shadow 0.3s ease' }} onClick={() => setFilter('ce week-end')}>Ce week-end</button>
                <button className='btn mx-2' style={{ borderRadius: '18px', border: 'solid #6F6F6F 1px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'box-shadow 0.3s ease' }} onClick={() => setFilter('libre')}>Gratuit</button>
            </div>
            <div className="event-cards-container mt-5">
                <div className="d-flex overflow-auto">
                    {loading ? (
                        // Afficher les SkeletonCards si le contenu est en cours de chargement
                        <>
                            <SkeletonCard />
                            <SkeletonCard />
                            <SkeletonCard />
                        </>
                    ) : (
                        filteredEvents.length > 0 ? (
                            filteredEvents.map(event => (
                                <Link to={`/detail-event/${event.id}`} className="text-decoration-none text-dark" key={event.id}>
                                    <div className="card card-custom mx-2" style={{ minWidth: '400px', maxWidth: '400px' }}>
                                        <div className="position-relative">
                                            <img src={`${API_URL}/${event.image1_url}`} height={'250px'} className="card-img-top" alt={event.title} />
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between">
                                                    <div>
                                                        <p className="card-text">{event.date}</p>
                                                        <h5 className="card-title" style={{ color: '#4539B4' }}>
                                                            {new Date(event.start_date).toLocaleString('default', { month: 'short' }).toUpperCase()}
                                                        </h5>

                                                        <p className="card-text">{new Date(event.start_date).getDate()}/{new Date(event.start_date).getFullYear()}</p>
                                                    </div>
                                                    <div>
                                                        <h5 className="card-title" style={{ color: '#2D2C3C' }}>
                                                            {event.title.slice(0, 14)}{event.title.length > 14 ? '...' : ''}
                                                        </h5>
                                                        <p className="card-text">{event.location}</p>
                                                        <p className="card-text">
                                                            {new Date(`1970-01-01T${event.start_time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}-
                                                            {new Date(`1970-01-01T${event.end_time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </p>

                                                        <p className="card-text">
                                                            <img src={ticket} height="20" width="20" alt="Ticket" /> INR {event.price} - <img src={start} height="20" width="20" alt="Start" style={{ color: '#4539B4' }} /> {event.interested} interested
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <i className="fa-regular fa-star position-absolute" style={{ top: '10px', right: '10px', background: 'white', cursor: 'pointer', borderRadius: '50%', padding: '10px' }}></i>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className='text-center'>Aucun événement en vedette disponible.</p>
                        )
                    )}
                </div>
            </div>
        </>
    );
};

export default EventCards;
