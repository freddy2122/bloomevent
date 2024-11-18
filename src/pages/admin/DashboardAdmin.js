import React, { useEffect, useState } from 'react';
import EnteteDash from '../../components/EnteteDash';
import DashHeader from '../../components/DashHeader';
import API_URL from '../config/api';

const DashboardAdmin = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [events, setEvents] = useState([]);
    const [withdrawalRequests, setWithdrawalRequests] = useState([]);

    const token = localStorage.getItem('token'); // Récupérer le token depuis le localStorage
    
    // Fonction pour récupérer les utilisateurs
    const fetchUserInfo = async () => {
        try {
            const response = await fetch(`${API_URL}/api/admin/get_my_profil`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setUser(data.user); // Stockez les informations de l'utilisateur dans l'état
        } catch (error) {
            console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
        }
    };
    
    const fetchUsers = async () => {
        try {
            const response = await fetch(`${API_URL}/api/admin/get_all_users`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs:', error);
        }
    };

    // Fonction pour récupérer les événements
    const fetchEvents = async () => {
        try {
            const response = await fetch(`${API_URL}/api/admin/get_all_events`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des événements:', error);
        }
    };

    // Fonction pour récupérer les demandes de retrait
    const fetchWithdrawals = async () => {
        try {
            const response = await fetch(`${API_URL}/api/admin/withdrawals`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setWithdrawalRequests(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des demandes de retrait:', error);
        }
    };

    // Charger les données au montage du composant
    useEffect(() => {
        fetchUsers();
        fetchEvents();
        fetchWithdrawals();
        fetchUserInfo();
    }, []);

    // Calcul des statistiques
    const totalUsers = users.length;
    const totalEvents = events.length;
    const upcomingEvents = events.filter(event => new Date(event.date) > new Date()).length;
    const ongoingEvents = events.filter(event => event.status === 'en cours').length;
    const pastEvents = events.filter(event => new Date(event.date) < new Date()).length;

    const totalWithdrawals = withdrawalRequests.length;
    const pendingWithdrawals = withdrawalRequests.filter(req => req.status === 'en attente').length;
    const approvedWithdrawals = withdrawalRequests.filter(req => req.status === 'validée').length;
    const rejectedWithdrawals = withdrawalRequests.filter(req => req.status === 'refusée').length;

    // Exemple de calcul des revenus (à adapter en fonction de la structure des données)
    const totalRevenue = users.reduce((acc, user) => acc + (user.balance || 0), 0);
    const pendingRevenue = withdrawalRequests.filter(req => req.status === 'en attente').reduce((acc, req) => acc + req.amount, 0);

    return (
        <>
            <div className="container-scroller">
                <div className="horizontal-menu">
                    <EnteteDash />
                    <DashHeader />
                </div>
                <div className="container mt-5 pt-5">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card text-center">
                                <div className="card-body">
                                    <h5 className="card-title">Utilisateurs Inscrits</h5>
                                    <p className="card-text">{totalUsers}</p>
                                    <i className="fas fa-users fa-2x"></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card text-center">
                                <div className="card-body">
                                    <h5 className="card-title">Événements Créés</h5>
                                    <p className="card-text">{totalEvents}</p>
                                    <i className="fas fa-calendar-alt fa-2x"></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card text-center">
                                <div className="card-body">
                                    <h5 className="card-title">Réservations en Attente</h5>
                                    <p className="card-text">{pendingWithdrawals}</p>
                                    <i className="fas fa-hourglass-half fa-2x"></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mt-4">
                            <div className="card text-center">
                                <div className="card-body">
                                    <h5 className="card-title">Demandes de Retrait</h5>
                                    <p className="card-text">{totalWithdrawals}</p>
                                    <i className="fas fa-money-check-alt fa-2x"></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mt-4">
                            <div className="card text-center">
                                <div className="card-body">
                                    <h5 className="card-title">Revenu Total</h5>
                                    <p className="card-text">{user.balance} FCFA</p>
                                    <i className="fas fa-euro-sign fa-2x"></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mt-4">
                            <div className="card text-center">
                                <div className="card-body">
                                    <h5 className="card-title">Revenu en Attente</h5>
                                    <p className="card-text">{pendingRevenue} €</p>
                                    <i className="fas fa-coins fa-2x"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardAdmin;
