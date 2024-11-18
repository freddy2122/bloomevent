import React, { useState, useEffect } from 'react';
import ticket from '../assets/images/ticket.png';
import start from '../assets/images/start.png';
import Header from '../components/Header';
import Footer from '../components/Footer';
import backgroundImage from '../assets/images/Hero.jpg';
import { Link } from 'react-router-dom';
import SkeletonCard from '../components/SkeletonCard';
import API_URL from '../pages/config/api';

const AllEvent = () => {
    const [loading, setLoading] = useState(true); // État pour le chargement
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`${API_URL}/api/events`); // Remplacez par l'URL de votre API
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

    // Filtrer les événements pour afficher uniquement ceux qui sont mis en avant
    const featuredEvents = events.filter(event => event.is_featured === 1);

    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 6;
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = featuredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
    const totalPages = Math.ceil(featuredEvents.length / eventsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <>
            <Header />
            <div className='container-fluid' style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '350px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <form className="d-flex w-100 justify-content-center" role="search" style={{ maxWidth: '900px' }}>
                        <div className="input-group" style={{ width: '75%' }}>
                            <input
                                className="form-control"
                                type="search"
                                placeholder="Rechercher des événements, des catégories, des emplacements ..."
                                aria-label="Search"
                                style={{ borderRadius: '0px' }}
                            />
                            <button className="input-group-text bg-white" type="submit" style={{ borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }}>
                                <i className="fa fa-search"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="container mt-5">
                <h1 className="text-center mb-5">Événements Mis en Avant</h1>
                <div className="row">
                    {loading ? (
                        // Afficher les SkeletonCards si le contenu est en cours de chargement
                        <>
                            <SkeletonCard />
                            <SkeletonCard />
                            <SkeletonCard />
                        </>
                    ) : (
                        currentEvents.length > 0 ? (
                            currentEvents.map(event => (
                                <div className="col-md-4 mb-4" key={event.id}>
                                    <Link to={`/detail-event/${event.id}`} className="text-decoration-none text-dark">
                                        <div className="card h-100">
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
                                </div>
                            ))
                        ) : (
                            <p className="text-center">Aucun événement en avant</p>
                        )
                    )}
                </div>
                <div className="d-flex justify-content-center mt-4">
                    <nav>
                        <ul className="pagination">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button onClick={handlePrev} className="page-link">
                                    <i className="fa fa-chevron-left"></i>
                                </button>
                            </li>
                            {[...Array(totalPages).keys()].map(number => (
                                <li key={number} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                                    <button
                                        onClick={() => paginate(number + 1)}
                                        className="page-link"
                                        style={{ outline: 'none' }} // Remove focus outline
                                    >
                                        {number + 1}
                                    </button>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button onClick={handleNext} className="page-link">
                                    <i className="fa fa-chevron-right"></i>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className='container-fluid' style={{ background: 'rgba(0, 0, 0, 1)' }}>
                <Footer />
            </div>
        </>
    );
};

export default AllEvent;
