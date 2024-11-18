import React, { useState, useEffect } from 'react';
import logo from '../assets/images/bloo.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [role, setRole] = useState(localStorage.getItem('role'));
    const navigate = useNavigate();  // Utilisez useNavigate au lieu de useHistory

    const getProfileLink = () => {
        switch (role) {
            case 'admin':
                return '/admin/dashboard';
            case 'organizer':
                return '/promoteur/dashboard';
            default:
                return '/dashbord-utilisateur';
        }
    };

    const location = useLocation();
    const isActive = (path) => location.pathname === path ? 'active' : '';

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
    const isOrganizer = () => {
        const role = localStorage.getItem('role'); 
        return role === 'organizer';
    };
    const handleOrganizerClick = (e) => {
        e.preventDefault(); 
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            navigate('/organisateur');
        }
    };

    return (
        <header>
            <nav className="navbar navbar-expand-lg d-flex align-items-center bg-white">
                <div className="container p-3">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="Logo" style={{ height: '45px' }} />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" style={{ outline: 'none', boxShadow: 'none' }}>
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="offcanvas offcanvas-start pt-4" style={{ width: '70%' }} tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className={`nav-link ${isActive('/')}`} aria-current="page" to="/">Accueil</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${isActive('/events')}`} to="/events">Evènements</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${isActive('/about')}`} to="/about">A Propos</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${isActive('/contact')}`} to="/contact">Contact</Link>
                                </li>
                            </ul>

                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                {!isOrganizer() && ( // Afficher le lien seulement si l'utilisateur n'est pas un organisateur
                                    <li className="nav-item">
                                        <Link className={`nav-link`} to="#" onClick={handleOrganizerClick}>Devenir organisateur</Link>
                                    </li>
                                )}
                                {/* Afficher le lien "Créer un évènement" uniquement si l'utilisateur est authentifié et a le rôle d'organisateur */}
                                {isAuthenticated && role === 'organizer' && (
                                    <li className="nav-item">
                                        <Link className={`nav-link ${isActive('/organisateur/creer-event')}`} to="/organisateur/creer-event">Créer un évènement</Link>
                                    </li>
                                )}
                                {isAuthenticated ? (
                                    <>
                                       
                                       {/*  <li className="nav-item dropdown">
                                            <Link className="btn me-2" to="/login">
                                                <i className="fa-regular fa-star" style={{ width: '20px', height: '20px' }}></i>
                                                <p className="" style={{ fontSize: '10px' }}>Favoris</p>
                                            </Link>
                                        </li> */}
                                        <li className="nav-item dropdown">
                                            <Link className="btn me-2" to={getProfileLink()}>
                                                <i className="fa-solid fa-user" style={{ width: '20px', height: '20px' }}></i> <i className="fa-solid fa-chevron-down" style={{ width: '10px', height: '10px' }}></i>
                                                <p className="" style={{ fontSize: '10px', margin: '0 5px' }}>Profile</p>
                                            </Link>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="nav-item mb-2">
                                            <Link className="btn me-2" to="/register" style={{ backgroundColor: '#213361', color: 'white', borderRadius: '15px', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40px', paddingTop: '3px', paddingLeft: '18px', paddingRight: '18px' }}>
                                                S'inscrire
                                            </Link>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <Link className="btn me-2" to="/login" style={{ backgroundColor: '#EA6A08', color: 'white', borderRadius: '15px', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40px', paddingTop: '3px', paddingLeft: '18px', paddingRight: '18px' }}>
                                                Connexion
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
