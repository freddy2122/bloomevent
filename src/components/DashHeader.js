import React from 'react';
import { Link } from 'react-router-dom';
import useUserRole from './useUserRole';
import useOrganizerRole from './useOrganizerRole';
import useAdminRole from './useAdminRole';



const DashHeader = () => {

    const userRole = useUserRole();
    const organizerRole = useOrganizerRole();
    const adminRole = useAdminRole();

    return (
        <>
            <nav className="bottom-navbar" style={{ backgroundColor: '#EA6A08', }}>
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

export default DashHeader;
