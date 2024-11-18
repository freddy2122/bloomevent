import React, { useEffect, useState } from 'react';
import API_URL from '../pages/config/api';

const ParticipantDetails = () => {
    const [selectedTickets, setSelectedTickets] = useState([]);
    const [user, setUser] = useState({ name: '', email: '', phone: '' });
    const storedUser = localStorage.getItem('user');

    useEffect(() => {
        
        const storedTickets = localStorage.getItem('selectedTickets');
        if (storedTickets) {
            setSelectedTickets(JSON.parse(storedTickets));
        }

    
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            const token = localStorage.getItem('token');
            if (token) {
                fetch(`${API_URL}/api/get_my_profil`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                })
                    .then(response => response.json())
                    .then(data => {
                        const userData = {
                            name: data.user.name,
                            email: data.user.email,
                            phone: data.user.phone_number || '',
                        };
                        setUser(userData);
                        localStorage.setItem('user', JSON.stringify(userData));
                    })
                    .catch(error => {
                        console.error('Erreur lors de la récupération des informations utilisateur:', error);
                    });
            }
        }
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUser(prevUser => {
            const updatedUser = { ...prevUser, [id]: value };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            return updatedUser;
        });
    };

    const initiatePayment = () => {
        const token = localStorage.getItem('token');
        const paymentData = {
            user,
            tickets: selectedTickets,
            totalAmount,
        };

        fetch(`${API_URL}/api/payment/init`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur réseau : ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                if (data.id) {
                    localStorage.setItem('transactionId', data.id);
                }
                if (data.checkout_url) {
                    window.location.href = data.checkout_url;
                } else {
                    console.error('L\'URL de paiement est manquante.');
                }
            })
            .finally(() => {
                const transactionId = localStorage.getItem('transactionId');
                if (transactionId) {
                    verifyPayment(transactionId);
                }
            })
            .catch(error => {
                console.error('Erreur lors de la requête de paiement:', error);
            });
    };



    const verifyPayment = (transactionId) => {
        const token = localStorage.getItem('token');

        fetch(`${API_URL}/api/payment/verify/${transactionId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    // Afficher les informations de succès dans la console
                    console.log('Le paiement a réussi:', data);
            
                    // Supprimer les informations des tickets du localStorage
                    localStorage.removeItem('transactionId');
                    localStorage.removeItem('selectedTickets');
            
                    // Recharger la page ou rediriger l'utilisateur après le succès de la transaction
                    window.location.reload();
                } else {
                    // Afficher les informations d'erreur dans la console
                    console.log('Le paiement a échoué:', data);
                }
            })
            .catch(error => {
                console.error('Erreur lors de la vérification du paiement:', error);
            });
    };

    const totalAmount = selectedTickets.reduce((acc, ticket) => {
        return acc + (ticket.price * ticket.quantity);
    }, 0);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h5><i className="bi bi-arrow-left"></i> Détails des participants</h5>
                        </div>
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h6 className="fw-bold text-muted">Titre de l'événement</h6>
                                <span className='text-muted'><i className="bi bi-calendar2-day"></i> Jour, date</span>
                            </div>

                            <div className="mb-4">
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Nom et prénom</label>
                                    <input value={user.name} onChange={handleInputChange} type="text" className="form-control" id="name" placeholder="Entrez le nom complet du participant" style={{ outline: 'none', boxShadow: 'none', height: '50px' }} />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">E-mail</label>
                                    <input value={user.email} type="email" onChange={handleInputChange} className="form-control" id="email" placeholder="Entrez l'e-mail du participant" style={{ outline: 'none', boxShadow: 'none', height: '50px' }} />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Téléphone</label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <img src="https://www.countryflagicons.com/FLAT/64/CM.png" alt="" style={{ width: '20px' }} />
                                        </span>
                                        <input type="text" value={user.phone} onChange={handleInputChange} className="form-control" id="phone" placeholder="Entrez le numéro de téléphone du participant" style={{ outline: 'none', boxShadow: 'none', height: '50px' }} />
                                    </div>
                                </div>
                            </div>

                            <div className="card-footer">
                                <div className="d-flex justify-content-center border-bottom py-2">
                                    <span className="fw-bold me-3">Qté: {selectedTickets.reduce((acc, ticket) => acc + ticket.quantity, 0)}</span>
                                    <span className="fw-bold">Total: {totalAmount.toFixed(2)} FCFA</span>
                                </div>

                                <button onClick={initiatePayment} className="btn btn-success btn-block w-100 mt-3">
                                    Payer <i className="fa fa-chevron-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-2"></div>
            </div>
        </div>
    );
};

export default ParticipantDetails;
