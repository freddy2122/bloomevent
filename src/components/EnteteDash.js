import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/bloo.png';
import useUserRole from './useUserRole';
import useOrganizerRole from './useOrganizerRole';
import useAdminRole from './useAdminRole';
import API_URL from '../pages/config/api';

const EnteteDash = () => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const userRole = useUserRole();
    const organizerRole = useOrganizerRole();
    const adminRole = useAdminRole();
    const toggleDropdown = (event) => {
        event.preventDefault(); // Prevent the link's default behavior
        setIsDropdownVisible(!isDropdownVisible);
    };
    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token is missing');
            return;
        }

       

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
               
                setUser(data.user);

            })
            .catch(error => {
                console.error('Erreur lors de la récupération:', error.message);
                setError(error.message);

            });
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token is missing');
            return;
        }

       

        // Récupérer le profil de l'organisateur
        fetch(`${API_URL}/api/admin/get_my_profil`, {
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
               
                setUser(data.user);

            })
            .catch(error => {
                console.error('Erreur lors de la récupération:', error.message);
                setError(error.message);

            });
    }, []);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token is missing');
            return;
        }

       

        // Récupérer le profil de l'organisateur
        fetch(`${API_URL}/api/user/get_my_profil`, {
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
               
                setUser(data.user);

            })
            .catch(error => {
                console.error('Erreur lors de la récupération:', error.message);
                setError(error.message);

            });
    }, []);

    const navigate = useNavigate(); // Pour naviguer après la déconnexion
    // Si vous utilisez react-router v6, utilisez :
    // const navigate = useNavigate();

    const handleLogout = async (event) => {
        event.preventDefault(); // Empêcher le comportement par défaut du lien

        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token is missing');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                // Supprimer le token du localStorage
                localStorage.removeItem('token');


                navigate('/login');
            } else {
                console.error('Erreur lors de la déconnexion.');
            }
        } catch (error) {
            console.error('Erreur lors de la requête de déconnexion:', error);
        }
    };

    return (
        <>
            <nav className="navbar top-navbar col-lg-12 col-12 p-0">
                <div className="container">
                    <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                        <Link className="navbar-brand brand-logo" to="/">
                            <img src={logo} alt="Logo" style={{ height: '70px' }} />
                        </Link>
                        <Link className="navbar-brand brand-logo-mini" to="/">
                            <img src={logo} alt="logo" />
                        </Link>
                    </div>
                    <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
                        <ul className="navbar-nav mr-lg-2">
                            <li className="nav-item nav-search d-none d-lg-block">
                                <div className="input-group">
                                    <div className="input-group-prepend hover-cursor" id="navbar-search-icon">
                                        <span className="input-group-text" id="search">
                                            <i className="mdi mdi-magnify"></i>
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="navbar-search-input"
                                        placeholder="Search"
                                        aria-label="search"
                                        aria-describedby="search"
                                    />
                                </div>
                            </li>
                        </ul>
                        <ul className="navbar-nav navbar-nav-right">
                            <li className="nav-item nav-profile dropdown">
                                <Link
                                    className="nav-link"
                                    id="profileDropdown"
                                    onClick={toggleDropdown}
                                    to="#" // Ensure no navigation
                                >
                                    <div className="nav-profile-img">
                                        <img
                                            src={user && user.profile_picture ? `${API_URL}/${user.profile_picture}` : 'default-profile.png'}
                                            alt="profile"
                                        />
                                    </div>
                                    <div className="nav-profile-text">
                                        <p className="text-black font-weight-semibold m-0">
                                            {user ? user.name : 'Chargement...'}
                                        </p>
                                    </div>

                                </Link>
                                {/* Show the dropdown if isDropdownVisible is true */}
                                <div
                                    className="dropdown-menu navbar-dropdown"
                                    style={{ display: isDropdownVisible ? 'block' : 'none' }} // Toggle display style
                                >
                                    {organizerRole === 'organizer' && (
                                        <>
                                            <Link className="dropdown-item" to="/promoteur/info-compte">
                                                <i class="fa-solid fa-user"></i> Mon profile
                                            </Link>
                                            <Link className="dropdown-item" to="/organisateur/setting">
                                                <i class="fa-solid fa-gear"></i> Paramètres
                                            </Link>
                                        </>

                                    )}
                                    {adminRole === 'admin' && (
                                        <>
                                            <Link className="dropdown-item" to="/admin/info-compte">
                                                <i class="fa-solid fa-user"></i> Mon profile
                                            </Link>
                                            <Link className="dropdown-item" to="/admin/setting">
                                                <i class="fa-solid fa-gear"></i> Paramètres
                                            </Link>
                                        </>
                                    )}

                                    {userRole === 'user' && (
                                        <>
                                            <Link className="dropdown-item" to="/account-info">
                                                <i class="fa-solid fa-user"></i> Mon profile
                                            </Link>
                                            <Link className="dropdown-item" to="/user/setting">
                                                <i class="fa-solid fa-gear"></i> Paramètres
                                            </Link>
                                        </>
                                    )}
                                    <div className="dropdown-divider"></div>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/email-verify">
                                            <i className="mdi mdi-compass-outline menu-icon"></i>
                                            <span className="menu-title">Valider e-mail</span>
                                        </Link>
                                    </li>
                                    <Link className="dropdown-item" to="#" onClick={handleLogout}>
                                        <i className="mdi mdi-logout mr-2 text-primary"></i> Déconnecter
                                    </Link>
                                </div>
                            </li>
                        </ul>
                        <button
                            className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
                            type="button"
                            onClick={toggleMenu} style={{ outline: 'none', boxShadow: 'none' }}
                        >
                            <i class="fa-solid fa-bars"></i>
                        </button>

                    </div>
                </div>
            </nav>
            <nav className={`bottom-navbar ${isMenuVisible ? 'header-toggled' : ''}`} style={{ display: isMenuVisible ? 'block' : 'none' }}>
                <div className="container">
                    <ul className="nav page-navigation">
                        {organizerRole === 'organizer' && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/promoteur/dashboard">
                                        <i className="mdi mdi-compass-outline menu-icon"></i>
                                        <span className="menu-title">Tableau de bord</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/organisateur/my-event" className="nav-link">
                                        <i className="mdi mdi-monitor-dashboard menu-icon"></i>
                                        <span className="menu-title">Mes événements</span>

                                    </Link>

                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/organisateur/wallet">
                                        <i className="mdi mdi-cash menu-icon"></i>
                                        <span className="menu-title">Wallet</span>
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" to="/organisateur/gestion-billet">
                                        <i className="mdi mdi-contacts menu-icon"></i>
                                        <span className="menu-title">Billets et Inscriptions</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/organisateur/rapport">
                                        <i className="mdi mdi-chart-bar menu-icon"></i>
                                        <span className="menu-title">Rapports et Analyses</span>
                                    </Link>
                                </li>
                            </>
                        )}
                        {adminRole === 'admin' && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin/dashboard">
                                        <i className="mdi mdi-compass-outline menu-icon"></i>
                                        <span className="menu-title">Tableau de bord</span>
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" to="/list-event">
                                        <i className="mdi mdi-clipboard-text menu-icon"></i>
                                        <span className="menu-title">Evénements </span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/gestion-users">
                                        <i className="mdi mdi-contacts menu-icon"></i>
                                        <span className="menu-title">Gestion des utilisateurs</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/all-category">
                                        <i className="mdi mdi-contacts menu-icon"></i>
                                        <span className="menu-title">Catégories</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin/demande-retrait">
                                        <i className="mdi mdi-contacts menu-icon"></i>
                                        <span className="menu-title">Demande de retrait</span>
                                    </Link>
                                </li>

                            </>
                        )}

                        {userRole === 'user' && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/dashbord-utilisateur">
                                        <i className="mdi mdi-compass-outline menu-icon"></i>
                                        <span className="menu-title">Tableau de bord</span>
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" to="/history">
                                        <i className="mdi mdi-clipboard-text menu-icon"></i>
                                        <span className="menu-title">Historique</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/user/ticket-paid">
                                        <i className="mdi mdi-contacts menu-icon"></i>
                                        <span className="menu-title">Ticket(s) acheté(s)</span>
                                    </Link>
                                </li>

                            </>
                        )}

                    </ul>
                </div>
            </nav>
        </>
    );
};

export default EnteteDash;
