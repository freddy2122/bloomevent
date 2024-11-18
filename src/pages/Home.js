import React, { useState,useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import backgroundImage from '../assets/images/Hero.jpg';
import SearchForm from '../components/SearchForm';
import Categorie from '../components/Categorie';
import EventCards from '../components/EventCards';
import EventBest from '../components/EventBest';
import { Link } from 'react-router-dom';
import Faq from '../components/Faq';
import TestimonialsCarousel from '../components/TestimonialsCarousel ';
import calendar from '../assets/images/cal.png';
import { useNavigate } from 'react-router-dom';
import NewsletterSubscription from '../components/NewsletterSubscription';


const Home = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [role, setRole] = useState(localStorage.getItem('role'));
    useEffect(() => {
        const handleStorageChange = () => {
            setIsAuthenticated(!!localStorage.getItem('token'));
            setRole(localStorage.getItem('role'));
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);
    const navigate = useNavigate();



    return (
        <div>
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

                <SearchForm />
            </div>
            <div className='container mt-3'>
                <h3 style={{ color: '#EA6A08' }}>Explorer les catégories</h3>

                <Categorie />

            </div>
            <div className='container mt-5'>


                <EventCards />
                <div className="d-flex justify-content-center mt-3">
                    <button
                        className='btn'
                        onClick={() => navigate('/all-events')}
                        style={{
                            borderRadius: '8px',
                            border: 'solid #6F6F6F 2px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            transition: 'box-shadow 0.3s ease',
                            backgroundColor: '#213361',
                            color: '#fff',
                            padding: '10px 20px',
                            textAlign: 'center',
                            width: '400px'
                        }}
                    >
                        Voir plus
                    </button>
                </div>


            </div>
            <div className='container mt-5'>
                <h3 style={{ color: '#EA6A08' }}>Découvrez le meilleur des événements en ligne</h3>
                <EventBest />
                <div className="d-flex justify-content-center mt-3">
                    <button
                        className='btn'
                        onClick={() => navigate('/all-events')}
                        style={{
                            borderRadius: '8px',
                            border: 'solid #6F6F6F 2px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            transition: 'box-shadow 0.3s ease',
                            backgroundColor: '#EA6A08',
                            color: '#fff',
                            padding: '10px 20px',
                            textAlign: 'center',
                            width: '400px'
                        }}
                    >
                        Voir plus
                    </button>
                </div>
            </div>
            <div className='container mt-5' >
                <div className="card pt-5 pb-5" style={{ backgroundColor: '#213361' }}>

                    <div className="card-body">
                        <h3 className="card-title text-center text-white">Des événements spécialement organisés pour vous!</h3>
                        <p className="card-text text-center text-white">Recevez des suggestions d'événements adaptées à vos intérêts ! Ne laissez pas filer vos événements préférés.</p>

                        <div className="d-flex justify-content-center mt-3">
                            <Link to="/events"
                                className='btn'
                                style={{
                                    borderRadius: '8px',
                                    border: 'solid #6F6F6F 2px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                    transition: 'box-shadow 0.3s ease',
                                    backgroundColor: '#EA6A08',
                                    color: '#fff',
                                    padding: '10px 20px',
                                    textAlign: 'center',
                                    width: '200px'
                                }}
                            >
                                Commencer <i className="fa-solid fa-right-long text-white "></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container mt-5' >
                <Faq />
            </div>

            <div className='container mt-5' >
                <TestimonialsCarousel />
            </div>
            <div className='container-fluid mt-5' style={{
                backgroundColor: '#213361',
                boxShadow: '0 0.25rem 0.75rem rgba(0, 0, 0, 0.1)',  // Equivalent to 0 4px 12px
                transition: 'box-shadow 0.3s ease'
            }}>
                <div className='container'>

                    <div className="card pt-5 pb-5" style={{ backgroundColor: '#213361' }}>
                        <div className="card-body">

                            <div className="row align-items-center">
                                {/* Ajout de mb-4 pour les petits écrans et suppression de cette marge sur les grands écrans */}
                                <div className="col-md-8 mb-4 mb-md-0">
                                    <h3 className="card-title text-white">Créer un événement avec Blom Events</h3>
                                    <p className="card-text text-white">Vous avez un spectacle, un événement, une activité ou une belle expérience ? Devenez partenaire de nous et soyez répertorié sur Bloom Events</p>
                                </div>

                                <div className="col-md-4 text-center">
                                    {isAuthenticated && role === 'organizer' && (

                                        <Link to="/organisateur/creer-event"
                                            className='btn'
                                            style={{
                                                borderRadius: '8px',
                                                border: 'solid #6F6F6F 0.125rem',  // Equivalent to 2px
                                                boxShadow: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.1)',  // Equivalent to 0 4px 8px
                                                transition: 'box-shadow 0.3s ease',
                                                backgroundColor: '#1FAF38',
                                                color: '#fff',
                                                padding: '0.625rem 1.25rem',  // Equivalent to 10px 20px
                                                textAlign: 'center',
                                                width: '18.75rem'  // Equivalent to 300px
                                            }}
                                        >
                                            <img src={calendar} alt="calendar" style={{ height: '1.5625rem' }} />  {/* Equivalent to 25px */}
                                            Créer un évènement
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <NewsletterSubscription />


            <div className='container-fluid' style={{ background: 'rgba(0, 0, 0, 1)' }}>

                <Footer />
            </div>
        </div>
    );
};

export default Home;
