import React, { useState, useEffect } from 'react';
import EnteteDash from '../../components/EnteteDash';
import DashHeader from '../../components/DashHeader';
import NProgress from 'nprogress';
import API_URL from '../config/api';

const PaidTickets = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        const fetchHistorique = async () => {
            NProgress.start();
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`${API_URL}/api/user/transactions`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();

                if (response.ok) {
                    const transactionsArray = Object.values(data);
                    setTransactions(transactionsArray);
                } else {
                    setError(data.message || 'Erreur lors du chargement de l\'historique');
                    setShowError(true); // Affiche l'erreur
                }
            } catch (error) {
                setError('Une erreur s\'est produite lors de la récupération de l\'historique.');
                setShowError(true); // Affiche l'erreur
            } finally {
                setLoading(false);
                NProgress.done();
            }
        };

        fetchHistorique();
    }, []);

    // Masque le message d'erreur après 5 secondes
    useEffect(() => {
        if (showError) {
            const timer = setTimeout(() => {
                setShowError(false);
            }, 5000);

            return () => clearTimeout(timer); // Nettoyage
        }
    }, [showError]);

    if (loading) return <p>Chargement de l'historique...</p>;

    return (
        <>
            <div className="container-scroller">
                <div className="horizontal-menu">
                    <EnteteDash />
                    <DashHeader />
                </div>
                <div className='container mt-5 pt-5'>
                    <div className='row'>
                        <div className='col-md-8 p-4'>
                            <h3>Historique des Transactions</h3>
                            {transactions.length > 0 ? (
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>ID</th>

                                            <th>Tickets Achétés</th> {/* Nouvelle colonne */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transactions.map((transaction) => {
                                            // Parser les tickets achetés
                                            const tickets = JSON.parse(transaction.tickets_purchased || "[]");
                                            return (
                                                <tr key={transaction.id}>
                                                    <td>{transaction.id}</td>

                                                    <td>
                                                        {tickets.length > 0 ? (
                                                            tickets.map(ticket => (
                                                                <div key={ticket.ticket_name}>
                                                                    {ticket.ticket_name} (x{ticket.quantity})
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <p>Aucun ticket acheté</p>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            ) : (
                                <p>Aucune transaction disponible.</p>
                            )}
                        </div>
                    </div>

                    {/* Pop-up d'erreur */}
                    {showError && (
                        <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded shadow-lg z-50">
                            {error}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default PaidTickets;
