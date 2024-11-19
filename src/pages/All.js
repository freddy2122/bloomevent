import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import backgroundImage from '../assets/images/Hero.jpg';
import { Link } from 'react-router-dom';
import SkeletonCard from '../components/SkeletonCard';
import API_URL from '../pages/config/api';
import SearchForm from '../components/SearchForm';


const All = () => {
    const [loading, setLoading] = useState(true); // État pour le chargement
    const [events, setEvents] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`${API_URL}/api/events`); // Récupérer les événements depuis l'API
                const data = await response.json();
                const featuredEvents = data.events.filter(event => event.is_featured === 1); // Filtrer les événements en fonction de is_featured
                setEvents(featuredEvents); // Mettre à jour l'état avec les événements filtrés
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setLoading(false); // Arrêter le loading
            }
        };

        fetchEvents();
    }, []);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${API_URL}/api/categories_event`);
                const data = await response.json();
                setCategories(data); // Stocker les catégories récupérées
            } catch (error) {
                console.error("Erreur lors de la récupération des catégories:", error);
            }
        };

        fetchCategories();
    }, []);

    const [isVisible, setIsVisible] = useState(false);
    const toggleFilters = () => {
        setIsVisible(!isVisible);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 8;
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
    const totalPages = Math.ceil(events.length / eventsPerPage);
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
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [filters, setFilters] = useState({
        today: false,
        tomorrow: false,
        week: false,
        weekend: false,
        free: false,
        paid: false,
    });

    // Gestion de la sélection des catégories
    const handleCategoryChange = (categoryId) => {
        setSelectedCategories(prev => {
            if (prev.includes(categoryId)) {
                return prev.filter(id => id !== categoryId);
            } else {
                return [...prev, categoryId];
            }
        });
    };

    // Gestion des filtres de date et de prix
    const handleFilterChange = (filterName) => {
        setFilters(prev => ({ ...prev, [filterName]: !prev[filterName] }));
    };

    // Filtrer les événements basés sur les catégories, les dates et les prix
    const filteredEvents = currentEvents.filter(event => {
        const matchesCategory = selectedCategories.length === 0 || event.categories.some(category => selectedCategories.includes(category.id));
       
        const matchesPrice = (
            (filters.free && event.is_free === 0) ||
            (filters.paid && event.is_free === 1) ||
            (!filters.free && !filters.paid) // If no price filter is selected
        );

        return matchesCategory && matchesPrice;
    });

  


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

                  


                <SearchForm/>
            </div>
            <div className="container mt-4">
                <div className="row">

                    <div className="col-md-3">

                        <div className="d-md-none">
                            <button
                                className="btn mb-3" style={{ backgroundColor: 'rgba(33, 51, 97, 1)', color: 'white' }}
                                onClick={toggleFilters}
                            >
                                {isVisible ? 'Masquer les filtres' : 'Afficher les filtres'}
                            </button>
                        </div>


                        <div className={`filter-section ${isVisible || window.innerWidth >= 768 ? '' : 'd-none'}`}>
                            <h5>Filtres</h5>


                            <div className="mb-4">
                                <h6>Prix</h6>
                                <div className='mb-2'>
                                    <input type="checkbox" id="free" onChange={() => handleFilterChange('free')} />
                                    <label htmlFor="free" className="ms-2">Gratuit</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="paid" onChange={() => handleFilterChange('paid')} />
                                    <label htmlFor="paid" className="ms-2">Payant</label>
                                </div>
                            </div>


                          

                            <div className="mb-4">
                                <h6>Categories</h6>
                                {categories.map(category => (
                                    <div className='mb-2' key={category.id}>
                                        <input
                                            type="checkbox"
                                            id={category.id}
                                            onChange={() => handleCategoryChange(category.id)}
                                        />
                                        <label htmlFor={category.id} className="ms-2">{category.name}</label>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>



                    <div className="col-md-9">
                        <div className="d-flex justify-content-end mb-3">
                            <select className="form-select w-auto">
                                <option>Pertinence</option>
                                <option>Date</option>
                                <option>Prix</option>
                            </select>
                        </div>

                        <div className="row">

                            {loading ? (
                                <>
                                    <SkeletonCard />
                                    <SkeletonCard />
                                    <SkeletonCard />
                                </>
                            ) : (
                                filteredEvents.map((event) => (
                                    <div className="col-md-6 mb-4" key={event.id}>
                                        <Link to={`/detail-event/${event.id}`} className="text-decoration-none text-dark">
                                            <div className="card mb-3">
                                                <div className="row g-0">
                                                    <div className="col-md-5 col-6">
                                                        <img
                                                            src={`${API_URL}/${event.image1_url}`}
                                                            style={{ height: '150px', objectFit: 'cover', width: '100%' }}
                                                            className="img-fluid rounded-start"
                                                            alt={event.title}
                                                        />
                                                    </div>
                                                    <div className="col-md-7 col-6">
                                                        <div className="card-body">
                                                            <h5 className="card-title">
                                                                {event.title.slice(0, 12)}{event.title.length > 12 ? '...' : ''}
                                                            </h5>
                                                            <p className="card-text">
                                                                {event.location} <br />
                                                                {new Date(`1970-01-01T${event.start_time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}-
                                                                {new Date(`1970-01-01T${event.end_time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} <br />
                                                            </p>
                                                            <p className="card-text">
                                                                {event.categories.map(category => (
                                                                    <span key={category.id} className="badge me-1" style={{ backgroundColor: '#213361' }}>
                                                                        {category.name}
                                                                    </span>
                                                                ))}
                                                                <span className="badge me-1" style={{ backgroundColor: '#EA6A08' }}>
                                                                    {event.is_free === 1 ? 'Payant' : 'Gratuit'}
                                                                </span>
                                                            </p>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))
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
                </div>
            </div>
            <div className='container-fluid' style={{ background: 'rgba(0, 0, 0, 1)' }}>

                <Footer />
            </div>
        </>
    );
};

export default All;
