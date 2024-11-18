import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ParticipantDetails from './ParticipantDetails';
import API_URL from '../pages/config/api';

const TicketSelection = ({ eventDetails }) => {
    const tickets = eventDetails.tickets || [];
    const navigate = useNavigate();

    // Charger les quantités depuis le localStorage ou initialiser à 0
    const [quantities, setQuantities] = useState(() => {
        const savedQuantities = localStorage.getItem('quantities');
        return savedQuantities ? JSON.parse(savedQuantities) : tickets.reduce((acc, ticket) => {
            acc[ticket.id] = 0;
            return acc;
        }, {});
    });

    const [showParticipantDetail, setShowParticipantDetail] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleIncrease = (ticketId) => {
        setQuantities((prevQuantities) => {
            const updatedQuantities = {
                ...prevQuantities,
                [ticketId]: prevQuantities[ticketId] + 1,
            };
            localStorage.setItem('quantities', JSON.stringify(updatedQuantities)); // Sauvegarder dans le localStorage
            return updatedQuantities;
        });
    };

    const handleDecrease = (ticketId) => {
        setQuantities((prevQuantities) => {
            const updatedQuantities = {
                ...prevQuantities,
                [ticketId]: Math.max(prevQuantities[ticketId] - 1, 0),
            };
            localStorage.setItem('quantities', JSON.stringify(updatedQuantities)); // Sauvegarder dans le localStorage
            return updatedQuantities;
        });
    };

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            fetch(`${API_URL}/api/get_my_profil`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => {
                    if (response.ok) {
                        setIsAuthenticated(true);
                    } else {
                        setIsAuthenticated(false);
                        navigate('/login');
                    }
                })
                .catch(error => {
                    console.error('Erreur lors de la vérification du token :', error);
                    setIsAuthenticated(false);
                    navigate('/login');
                });
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleProceed = () => {
        const selectedTickets = tickets
            .filter(ticket => quantities[ticket.id] > 0)
            .map(ticket => ({
                id: ticket.id,
                name: ticket.name,
                price: ticket.price,
                quantity: quantities[ticket.id],
            }));

        localStorage.setItem('selectedTickets', JSON.stringify(selectedTickets));

        if (isAuthenticated) {
            setShowParticipantDetail(true);
        } else {
            navigate('/login');
        }
    };

    if (showParticipantDetail) {
        return <ParticipantDetails />;
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="">
                        <h5>Sélectionnez les billets pour l'événement : {eventDetails.title}</h5>
                        <div className="">
                            <div className="d-flex justify-content-between border-bottom py-2">
                                <span className="fw-bold">Types de billets</span>
                                <span className="fw-bold">Quantité</span>
                            </div>

                            {tickets.map((ticket) => (
                                <div key={ticket.id} className="d-flex justify-content-between align-items-center py-3 border-bottom" style={{ borderLeft: '5px solid #213361' }}>
                                    <div className='ps-3'>
                                        <h6 className="mb-0">{ticket.name}</h6>
                                        <p className="text-muted mb-0">{parseFloat(ticket.price).toFixed(2)} FCFA</p>
                                    </div>

                                    <div className="d-flex align-items-center">
                                        <button className="btn btn-outline-secondary rounded-pill" onClick={() => handleDecrease(ticket.id)}>
                                            <i className="fas fa-minus"></i>
                                        </button>
                                        <span className="mx-3">{quantities[ticket.id]}</span>
                                        <button className="btn btn-outline-secondary rounded-pill" onClick={() => handleIncrease(ticket.id)}>
                                            <i className="fas fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <div className="border mt-4 p-3" style={{ borderRadius: '5px', backgroundColor: '#f8f9fa' }}>
                                <div className="d-flex justify-content-center border-bottom py-2">
                                    <span className="fw-bold me-3">
                                        Qté: {Object.values(quantities).reduce((total, qty) => total + qty, 0)}
                                    </span>
                                    <span className="fw-bold">
                                        Total: {Object.entries(quantities).reduce((total, [ticketId, qty]) => {
                                            const ticket = tickets.find(ticket => ticket.id === parseInt(ticketId));
                                            return total + (ticket ? parseFloat(ticket.price) * qty : 0);
                                        }, 0).toFixed(2)} FCFA
                                    </span>
                                </div>
                                <button className="btn btn-success btn-block w-100 mt-3" onClick={handleProceed}>
                                    Procéder <i className="fa fa-chevron-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketSelection;
