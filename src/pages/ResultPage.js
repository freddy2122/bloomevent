import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import API_URL from '../pages/config/api'; // Assurez-vous que l'URL de l'API est correcte

const ResultPage = () => {
    const [events, setEvents] = useState([]);
    const location = useLocation();

    useEffect(() => {
        // Récupérer les paramètres de l'URL
        const searchParams = new URLSearchParams(location.search);
        const params = Object.fromEntries(searchParams.entries());

        // Effectuer la requête à l'API avec les paramètres
        const fetchEvents = async () => {
            try {
                const query = new URLSearchParams(params).toString();
                const response = await fetch(`${API_URL}/api/events?${query}`);
                const data = await response.json();
                setEvents(data.events);
            } catch (error) {
                console.error("Erreur lors de la récupération des événements :", error);
            }
        };

        fetchEvents();
    }, [location.search]);

    return (
        <div className="container mt-4">
            <h2>Résultats de la recherche</h2>
            {events.length > 0 ? (
                events.map((event) => (
                    <div key={event.id} className="event-item">
                        <h3>{event.title}</h3>
                        <p>Lieu : {event.location}</p>
                        <p>Date : {event.start_date}</p>
                    </div>
                ))
            ) : (
                <p>Aucun événement trouvé</p>
            )}
        </div>
    );
};

export default ResultPage;
