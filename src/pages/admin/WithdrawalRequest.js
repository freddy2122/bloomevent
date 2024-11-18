import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API_URL from '../config/api';
import EnteteDash from '../../components/EnteteDash';
import DashHeader from '../../components/DashHeader';

function WithdrawalRequests() {
    const [withdrawalRequests, setWithdrawalRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        fetch(`${API_URL}/api/admin/withdrawals`, {
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
                setWithdrawalRequests(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                console.error('Erreur lors de la récupération des événements:', error);
            });
    }, []);

    const handleValidate = (slug) => {
        const token = localStorage.getItem('token');
        fetch(`${API_URL}/api/admin/withdrawal/request/${slug}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                // Actualiser la liste après validation
                setWithdrawalRequests(prevRequests =>
                    prevRequests.map(req => req.slug === slug ? { ...req, status: 'confirmed' } : req)
                );
                toast.success('La demande de retrait a été validée.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            })
            .catch(error => {
                console.error('Erreur lors de la validation du retrait:', error);
                toast.error('Erreur lors de la validation du retrait.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            });
    };

    const handleCancel = (slug) => {
        const token = localStorage.getItem('token');
        fetch(`${API_URL}/api/admin/withdrawal/verify`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ transaction_id: slug }),
        })
            .then(response => response.json())
            .then(data => {
                // Actualiser la liste après l'annulation
                setWithdrawalRequests(prevRequests =>
                    prevRequests.map(req => req.slug === slug ? { ...req, status: 'failed' } : req)
                );
                toast.success('La demande de retrait a été annulée.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            })
            .catch(error => {
                console.error('Erreur lors de l\'annulation du retrait:', error);
                toast.error('Erreur lors de l\'annulation du retrait.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            });
    };

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>Erreur: {error}</div>;
    }

    return (
        <>
            <div className="container-scroller">
                <div className="horizontal-menu">
                    <EnteteDash />
                    <DashHeader />
                </div>
                <div className="container mt-5 pt-3">
                    <h2 className="mb-3">Liste des demandes de retrait</h2>
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Utilisateur</th>
                                    <th>Montant</th>
                                    <th>Numéro</th>
                                    <th>Méthode</th>
                                    <th>Date de demande</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {withdrawalRequests.length > 0 ? (
                                    withdrawalRequests.map((request, index) => (
                                        <tr key={request.id}>
                                            <td>{index + 1}</td>
                                            <td>{request.user.name}</td>
                                            <td>{request.amount} FCFA</td>
                                            <td>{request.recipient}</td>
                                            <td>{request.payment_method}</td>
                                            <td>{new Date(request.created_at).toLocaleDateString()}</td>
                                            <td>
                                                <span className={`badge ${
                                                    request.status === 'pending' ? 'bg-warning' :
                                                    request.status === 'confirmed' ? 'bg-success' : 'bg-danger'
                                                }`}>
                                                    {request.status}
                                                </span>
                                            </td>
                                            <td>
                                                {request.status === 'pending' && (
                                                    <>
                                                        <button
                                                            className="btn btn-success btn-sm me-2"
                                                            onClick={() => handleValidate(request.slug)}
                                                        >
                                                            <i className="fas fa-check"></i>
                                                        </button>
                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => handleCancel(request.slug)}
                                                        >
                                                            <i className="fas fa-times"></i>
                                                        </button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center">
                                            Aucune demande de retrait trouvée.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default WithdrawalRequests;
