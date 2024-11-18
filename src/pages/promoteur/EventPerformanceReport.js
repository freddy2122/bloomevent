import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import EnteteDash from '../../components/EnteteDash';
import DashHeader from '../../components/DashHeader';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import API_URL from '../config/api';

// Enregistrer les composants nécessaires
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const EventPerformanceReport = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token is missing');
            return;
        }

        fetchEvents(token);
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

    const processChartData = () => {
        const eventTitles = events.map(event => event.title);
        const ticketSales = events.map(event => {
            const totalSales = event.tickets.reduce((acc, ticket) => acc + ticket.sold_quantity, 0);
            return totalSales;
        });
        const participants = events.map(event => {
            const totalParticipants = event.tickets.reduce((acc, ticket) => acc + ticket.sold_quantity, 0);
            return totalParticipants; // Vous pouvez également utiliser une autre méthode pour compter les participants
        });

        return { eventTitles, ticketSales, participants };
    };

    const { eventTitles, ticketSales, participants } = processChartData();

    const salesData = {
        labels: eventTitles,
        datasets: [
            {
                label: 'Ventes de Billets',
                data: ticketSales,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const participationData = {
        labels: eventTitles,
        datasets: [
            {
                label: 'Participants',
                data: participants,
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    if (loading) return <p>Chargement...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <>
            <div class="container-scroller">

                <div class="horizontal-menu">
                    <EnteteDash />
                    <DashHeader />
                </div>
                <div className="container mt-5">
                    <div className="row">
                        <h2>Rapports et Analyses</h2>
                        <h3>Rapport de performance des événements</h3>
                        <p>Rapport détaillé sur la performance de chaque événement.</p>

                        <div className="col-md-6">
                            <h4>Graphiques de vente</h4>
                            <Bar data={salesData} options={{ responsive: true }} />
                        </div>

                        <div className="col-md-6">
                            <h4>Graphiques de participation</h4>
                            <Line data={participationData} options={{ responsive: true }} />
                        </div>

                    </div>
                </div>
            </div>

        </>
    );
};

export default EventPerformanceReport;
