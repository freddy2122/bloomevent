import React, { useState, useEffect } from 'react';
import API_URL from '../config/api';
import EnteteDash from '../../components/EnteteDash';
import DashHeader from '../../components/DashHeader';

const WithdrawalRequest = () => {
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('MTN');
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState(''); // 'success' or 'error'
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userData, setUserData] = useState([]);
    const [user, setUser] = useState(null);
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

            })
            .catch(error => {
                console.error('Erreur lors de la récupération:', error.message);

            });
    }, []);
    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/api/organizer/payments`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            console.log(data); // Ajoutez ceci pour voir la structure de la réponse

            if (response.ok) {
                setUserData(data.payments);
            } else {
                setToastMessage(data.message || 'Erreur lors de la récupération des données utilisateur.');
                setToastType('error');
                showToast();
            }
        } catch (error) {
            setToastMessage('Erreur de connexion. Veuillez réessayer.');
            setToastType('error');
            showToast();
        }
    };

    useEffect(() => {
        fetchUserData(); // Appeler la fonction lors du chargement du composant
    }, []);

    const handleWithdrawalRequest = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/api/organizer/withdrawal_request`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    amount: parseInt(amount),
                    recipient: recipient,
                    payment_method: paymentMethod
                })
            });

            const data = await response.json();

            if (response.ok) {
                setToastMessage('Demande de retrait effectuée avec succès. Veuillez attendre l\'approbation de l\'administrateur.');
                setToastType('success');
                setAmount('');
                setRecipient('');
                setIsModalOpen(false); // Fermer la modal après soumission réussie
            } else {
                setToastMessage(data.message || 'Erreur lors de la demande de retrait.');
                setToastType('error');
            }
        } catch (error) {
            setToastMessage('Erreur de connexion. Veuillez réessayer.');
            setToastType('error');
        }

        showToast();
    };

    const showToast = () => {
        const toast = document.getElementById('toast');
        toast.style.display = 'block';
        setTimeout(() => {
            toast.style.display = 'none';
        }, 4000); // Le toast disparaît après 4 secondes
    };

    const handleModalClose = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            setIsModalOpen(false);
        }
    };

    return (
        <>
            <div className="container-scroller">
                <div className="horizontal-menu">
                    <EnteteDash />
                    <DashHeader />
                </div>
                <div className="container mt-5 pt-5">
                    <div className="row g-5">
                        <div className="col-md-12">
                            <h4>Demande de Retrait</h4>
                            <button className="btn "  style={{ backgroundColor: '#213361', color:'white' }} onClick={() => setIsModalOpen(true)}>Demander un retrait</button>

                            {isModalOpen && (
                                <div className="modal-overlay" onClick={handleModalClose} style={overlayStyles}>
                                    <div className="modal-content" style={modalStyles}>
                                        <h5>Demande de Retrait</h5>
                                        <form onSubmit={handleWithdrawalRequest}>
                                            <div className="form-group mb-3">
                                                <label>Montant à retirer</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    value={amount}
                                                    onChange={(e) => setAmount(e.target.value)}
                                                    required
                                                    min="1"
                                                />
                                            </div>
                                            <div className="form-group mb-3">
                                                <label>Destinataire</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    value={recipient}
                                                    onChange={(e) => setRecipient(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group mb-3">
                                                <label>Méthode de paiement</label>
                                                <select
                                                    className="form-control"
                                                    value={paymentMethod}
                                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                                >
                                                    <option value="MTN">MTN</option>
                                                    <option value="MOOV">MOOV</option>
                                                </select>
                                            </div>
                                            <button type="submit" className="btn btn-primary">Confirmer</button>
                                            <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Annuler</button>
                                        </form>
                                    </div>
                                </div>
                            )}

                            {/* Notification Toast */}
                            <div
                                id="toast"
                                className={`toast ${toastType === 'success' ? 'toast-success' : 'toast-error'}`}
                                role="alert"
                                style={toastStyles(toastType)}
                            >
                                {toastMessage}
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">

                        <div className="col-md-12 col-lg-12 order-md-last">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-primary">Ma balance</span>
                                <span className="badge" style={{ backgroundColor: '#211611' }}>{user ? user.balance : 'Chargement...'} FCFA</span>
                            </h4>
                            <div className="overflow-container">
                                <ul className="list-group mb-3">
                                    {userData.map((payment) => {
                                        let tickets = [];
                                        if (payment.tickets_purchased && payment.tickets_purchased.trim() !== '') {
                                            try {
                                                tickets = JSON.parse(payment.tickets_purchased);
                                            } catch (error) {
                                                console.error("Erreur lors de la conversion des tickets:", error);
                                            }
                                        }

                                        return (
                                            <li className="list-group-item d-flex justify-content-between lh-sm" key={payment.ticket_purchase_id}>
                                                <div>
                                                    <h6 className="my-0">{payment.user.name}</h6>
                                                    <small className="text-muted">
                                                        {tickets.length > 0 ? tickets.map((ticket, index) => (
                                                            <span key={index}>
                                                                {ticket.ticket_name} {index < tickets.length - 1 && ', '}
                                                            </span>
                                                        )) : <span>Aucun ticket acheté</span>}
                                                    </small>
                                                </div>
                                                <span className="text-muted">{payment.amount} FCFA</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>

                        </div>
                    </div>


                </div>
            </div>
        </>
    );
};

const overlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9998,
};

const modalStyles = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
    width: '400px',
    maxWidth: '90%',
    zIndex: 9999,
};

const toastStyles = (type) => ({
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: type === 'success' ? 'green' : 'red',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
    zIndex: 9999,
    display: 'none', // Modifiez ceci pour gérer la visibilité dans la fonction showToast
});

export default WithdrawalRequest;
