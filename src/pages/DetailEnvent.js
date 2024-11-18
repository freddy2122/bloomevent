import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import tik from '../assets/images/tik.png';
import API_URL from '../pages/config/api';
import TicketSelection from '../components/TicketSelection';


const DetailEvent = () => {
    const { id } = useParams();
    const [eventDetails, setEventDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [showTicketSelection, setShowTicketSelection] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [countdown, setCountdown] = useState({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await fetch(`${API_URL}/api/event/${id}`);
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }
                const data = await response.json();
                setEventDetails(data.event);
                setLoading(false);
            } catch (error) {
                console.error("Erreur lors de la récupération des détails de l'événement:", error);
                setLoading(false);
            }
        };

        fetchEventDetails();

        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [id]);

    useEffect(() => {
        if (eventDetails) {
            const { start_date, start_time } = eventDetails;

            // Vérifiez que start_date et start_time sont bien définis et au bon format
            if (!start_date || !start_time) {
                console.error("Date ou heure de début manquante :", { start_date, start_time });
                return;
            }

            // Formatez directement targetDateString sans fonction auxiliaire
            const targetDateString = `${start_date.trim()}T${start_time.trim()}`;
            console.log("targetDateString formaté:", targetDateString);

            // Essayez de créer la date cible et vérifiez sa validité
            const targetDate = new Date(targetDateString);
            if (isNaN(targetDate.getTime())) {
                console.error("Date cible invalide :", targetDateString);
                return;
            }
            console.log("Date cible valide pour le compte à rebours:", targetDate);

            // Fonction pour mettre à jour le compte à rebours
            const updateCountdown = () => {
                const now = new Date().getTime();
                const distance = targetDate.getTime() - now;

                console.log("Distance actuelle pour le compte à rebours:", distance);

                if (distance > 0) {
                    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                    setCountdown({
                        days: String(days).padStart(2, '0'),
                        hours: String(hours).padStart(2, '0'),
                        minutes: String(minutes).padStart(2, '0'),
                        seconds: String(seconds).padStart(2, '0'),
                    });
                } else {
                    clearInterval(interval); // Arrête le compte à rebours si terminé
                    setCountdown({
                        days: '00',
                        hours: '00',
                        minutes: '00',
                        seconds: '00',
                    });
                }
            };

            const interval = setInterval(updateCountdown, 1000);
            return () => clearInterval(interval); // Nettoyage de l'intervalle
        }
    }, [eventDetails]);






    const handleBuyTicketsClick = () => {
        setShowTicketSelection(true);
    };

    const closeModal = () => {
        setShowTicketSelection(false);
        setShowShareModal(false);
    };

    const handleShareClick = () => {
        setShowShareModal(true);
    };

    const handleOutsideClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    };

    const imageHeight = windowWidth < 768 ? '300px' : '570px';

    if (loading) {
        return <div>Chargement des détails de l'événement...</div>;
    }

    if (!eventDetails) {
        return <div>Événement non trouvé.</div>;
    }

    return (
        <>
            <Header />
            <div className="container mt-4">
                <div className="rounded">
                    <div className="col-md-12 px-0">
                        <img
                            src={`${API_URL}/${eventDetails.image1_url}`}
                            style={{ width: '100%', height: imageHeight }}
                            alt="Event banner"
                            className="banner-img img-fluid"
                        />
                        <div className="row mb-4 mt-2 d-flex justify-content-between">
                            <div className="col-md-6 col-6">
                                <h2 style={{ color: 'rgba(33, 51, 97, 1)' }}>{eventDetails.title}</h2>
                            </div>
                            <div className="col-md-6 col-6 text-end">
                                <h3>
                                    <span>
                                        <i className="fa-regular fa-star me-3" style={{ cursor: 'pointer' }}></i>
                                        <i className="fa-solid fa-share-nodes" style={{ cursor: 'pointer' }}
                                            onClick={handleShareClick} ></i>
                                    </span>
                                </h3>
                            </div>
                        </div>
                        {/* Autres détails de l'événement */}
                        <div className="row mb-4 mt-2 d-flex justify-content-between">
                            <div className="col-md-6 col-6">
                                <h4 style={{ color: 'rgba(33, 51, 97, 1)' }}>Date et Heure</h4>
                                <p>
                                    <i className="fa-regular fa-calendar"></i>
                                    {formatDate(eventDetails.start_date)} / {formatDate(eventDetails.end_date)}
                                </p>
                                <p>
                                    <i className="fa-regular fa-clock"></i>
                                    {new Date(`1970-01-01T${eventDetails.start_time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
                                    {new Date(`1970-01-01T${eventDetails.end_time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                            <div className="col-md-6 col-6 text-end">
                                {eventDetails.is_free === 1 && (
                                    <button
                                        className="btn"
                                        onClick={handleBuyTicketsClick}
                                        style={{ backgroundColor: 'rgba(234, 106, 8, 1)', color: 'white' }}
                                    >
                                        <img src={tik} height="20" width="20" alt="Ticket" /> Buy Tickets
                                    </button>
                                )}
                            </div>
                        </div>
                        {showTicketSelection && (
                            <div className="modal-overlay" onClick={handleOutsideClick}>
                                <div className="modal-content">
                                    <button className="close-modal" onClick={closeModal}>X</button>
                                    <TicketSelection eventDetails={eventDetails} />
                                </div>
                            </div>
                        )}
                        {showShareModal && (
                            <div className="modal-overlay" onClick={handleOutsideClick}>
                                <div className="modal-content" style={{ textAlign: 'center' }}>
                                    <button className="close-modal" onClick={closeModal}>X</button>
                                    <h4 style={{ marginBottom: '20px' }}>Partager cet événement</h4>
                                    <div>
                                        <a href={`https://wa.me/?text=${encodeURIComponent(`${eventDetails.title} - Découvrez les détails ici: ${window.location.href}`)}`} target="_blank" rel="noopener noreferrer">
                                            <i className="fa-brands fa-whatsapp" style={{ fontSize: '24px', marginRight: '15px' }}></i>
                                        </a>
                                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer">
                                            <i className="fa-brands fa-facebook" style={{ fontSize: '24px', marginRight: '15px' }}></i>
                                        </a>
                                        <a href={`https://www.instagram.com/?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer">
                                            <i className="fa-brands fa-instagram" style={{ fontSize: '24px', marginRight: '15px' }}></i>
                                        </a>
                                    </div>

                                </div>
                            </div>
                        )}

                        <div className="row mb-4 mt-2 d-flex justify-content-between">
                            <div className="col-md-6 "></div>
                            <div className="col-md-6 col-12 text-end">
                                <div
                                    id="countdown"
                                    className="countdown"
                                    style={{
                                        backgroundColor: '#213361',
                                        color: '#fff',
                                        padding: '20px',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '20px',
                                        fontSize: '24px',
                                    }}
                                >
                                    <div className="countdown-item text-center">
                                        <div id="days">{countdown.days}</div>
                                        <span style={{ display: 'block', fontSize: '18px', marginTop: '5px' }}>Jours</span>
                                    </div>
                                    <div className="countdown-item text-center">
                                        <div id="hours">{countdown.hours}</div>
                                        <span style={{ display: 'block', fontSize: '18px', marginTop: '5px' }}>Heures</span>
                                    </div>
                                    <div className="countdown-item text-center">
                                        <div id="minutes">{countdown.minutes}</div>
                                        <span style={{ display: 'block', fontSize: '18px', marginTop: '5px' }}>Minutes</span>
                                    </div>
                                    <div className="countdown-item text-center">
                                        <div id="seconds">{countdown.seconds}</div>
                                        <span style={{ display: 'block', fontSize: '18px', marginTop: '5px' }}>Secondes</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Affichage de la carte */}
                        <div className="row mb-4 mt-2">
                            <h4 style={{ color: 'rgba(33, 51, 97, 1)' }}>Emplacement</h4>
                            <p>
                                <i className="fa-regular fa-map"></i> {eventDetails.location}, {eventDetails.address},  {eventDetails.place}
                            </p>
                        </div>
                        <div className="row mb-4 mt-2">
                            <h4 style={{ color: 'rgba(33, 51, 97, 1)' }}>Description de l'événement</h4>
                            <p>
                                {eventDetails.description}
                            </p>
                        </div>
                        <div className="row mb-4 mt-2">
                            <h4 style={{ color: 'rgba(33, 51, 97, 1)' }}>Organisateur</h4>
                            <p>
                                Créer par <strong>{eventDetails.organizer_name}</strong>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container-fluid' style={{ background: 'rgba(0, 0, 0, 1)' }}>

                <Footer />
            </div>
            <style jsx>{`
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.7);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000; /* Assurez-vous que le modal est au-dessus des autres contenus */
                }

                .modal-content {
                    background-color: white;
                    padding: 20px;
                    border-radius: 8px;
                    position: relative;
                    width: 80%;
                    max-width: 500px; /* Vous pouvez ajuster la taille du modal */
                }

                .close-modal {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    border: none;
                    background: transparent;
                    font-size: 1.5em;
                    cursor: pointer;
                }
            `}</style>
        </>
    );
};

export default DetailEvent;
