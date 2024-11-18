import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import useUserRole from './useUserRole';
import useOrganizerRole from './useOrganizerRole';
import useAdminRole from './useAdminRole';

const SideBar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const userRole = useUserRole();
    const organizerRole = useOrganizerRole();
    const adminRole = useAdminRole();
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const isActive = (path) => location.pathname === path;  // Fonction pour vérifier si le chemin est actif

    return (
        <div className={`d-flex flex-column ${isOpen ? 'col-12' : 'col-md-3'}`} style={{ position: 'relative' }}>
            <button
                className="d-md-none p-2"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                onClick={toggleSidebar}
            >
                <FontAwesomeIcon icon={faBars} style={{ fontSize: '24px', color: 'rgba(33, 51, 97, 1)' }} />
            </button>

            <div className={`d-none d-md-block p-0`} style={{ backgroundColor: 'rgba(238, 238, 238, 1)', height: '100vh' }}>
                <h2 className='text-center pt-4' style={{ color: 'rgba(33, 51, 97, 1)' }}>Paramètres du compte</h2>
                <ul className='pt-3' style={{ listStyleType: 'none', padding: '0' }}>

                    {/* Vérifiez le rôle de l'utilisateur avant d'afficher ces liens */}
                    {userRole === 'user' && (
                        <>
                            <li className='pb-2'>
                                <Link
                                    to="/account-info"
                                    className={isActive('/account-info') ? 'active-link' : ''}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        textDecoration: 'none',
                                        color: 'rgba(33, 51, 97, 1)',
                                        backgroundColor: isActive('/account-info') ? 'white' : 'transparent',
                                        paddingLeft: '50px',
                                        borderRadius: '4px',
                                        height: '50px'
                                    }}
                                >
                                    Informations sur le compte
                                </Link>
                            </li>
                            <li className='pb-2'>
                                <Link
                                    to='/change-email'
                                    className={isActive('/change-email') ? 'active-link' : ''}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        textDecoration: 'none',
                                        color: 'rgba(33, 51, 97, 1)',
                                        backgroundColor: isActive('/change-email') ? 'white' : 'transparent',
                                        paddingLeft: '50px',
                                        borderRadius: '4px',
                                        height: '50px'
                                    }}
                                >
                                    Changer l'e-mail
                                </Link>
                            </li>
                            <li className='pb-2'>
                                <Link
                                    to='/change-password'
                                    className={isActive('/change-password') ? 'active-link' : ''}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        textDecoration: 'none',
                                        color: 'rgba(33, 51, 97, 1)',
                                        backgroundColor: isActive('/change-password') ? 'white' : 'transparent',
                                        paddingLeft: '50px',
                                        borderRadius: '4px',
                                        height: '50px'
                                    }}
                                >
                                    Mot de passe
                                </Link>
                            </li>
                            <li className='pb-2'>
                                <Link
                                    to='/history'
                                    className={isActive('/history') ? 'active-link' : ''}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        textDecoration: 'none',
                                        color: 'rgba(33, 51, 97, 1)',
                                        backgroundColor: isActive('/history') ? 'white' : 'transparent',
                                        paddingLeft: '50px',
                                        borderRadius: '4px',
                                        height: '50px'
                                    }}
                                >
                                    Historique
                                </Link>
                            </li>
                        </>
                    )}

                    {organizerRole === 'organizer' && (
                        <>
                            <li className='pb-2'>
                                <Link
                                    to='/promoteur/info-compte'
                                    className={isActive('/promoteur/info-compte') ? 'active-link' : ''}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        textDecoration: 'none',
                                        color: 'rgba(33, 51, 97, 1)',
                                        backgroundColor: isActive('/promoteur/info-compte') ? 'white' : 'transparent',
                                        paddingLeft: '50px',
                                        borderRadius: '4px',
                                        height: '50px'
                                    }}
                                >
                                    Information du compte
                                </Link>
                            </li>
                            <li className='pb-2'>
                                <Link
                                    to='/promoteur/dashboard'
                                    className={isActive('/promoteur/dashboard') ? 'active-link' : ''}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        textDecoration: 'none',
                                        color: 'rgba(33, 51, 97, 1)',
                                        backgroundColor: isActive('/promoteur/dashboard') ? 'white' : 'transparent',
                                        paddingLeft: '50px',
                                        borderRadius: '4px',
                                        height: '50px'
                                    }}
                                >
                                    Tableau de bord
                                </Link>
                            </li>
                        </>
                    )}

                    {adminRole === 'admin' && (
                        <>
                            <li className='pb-2'>
                                <Link
                                    to='/admin/info-compte'
                                    className={isActive('/admin/info-compte') ? 'active-link' : ''}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        textDecoration: 'none',
                                        color: 'rgba(33, 51, 97, 1)',
                                        backgroundColor: isActive('/admin/info-compte') ? 'white' : 'transparent',
                                        paddingLeft: '50px',
                                        borderRadius: '4px',
                                        height: '50px'
                                    }}
                                >
                                    Information du compte
                                </Link>
                            </li>
                            <li className='pb-2'>
                                <Link
                                    to='/gestion-users'
                                    className={isActive('/gestion-users') ? 'active-link' : ''}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        textDecoration: 'none',
                                        color: 'rgba(33, 51, 97, 1)',
                                        backgroundColor: isActive('/gestion-users') ? 'white' : 'transparent',
                                        paddingLeft: '50px',
                                        borderRadius: '4px',
                                        height: '50px'
                                    }}
                                >
                                    Gestion utilisateur
                                </Link>
                            </li>
                            <li className='pb-2'>
                                <Link
                                    to='/all-category'
                                    className={isActive('/all-category') ? 'active-link' : ''}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        textDecoration: 'none',
                                        color: 'rgba(33, 51, 97, 1)',
                                        backgroundColor: isActive('/all-category') ? 'white' : 'transparent',
                                        paddingLeft: '50px',
                                        borderRadius: '4px',
                                        height: '50px'
                                    }}
                                >
                                    Liste des catégories
                                </Link>
                            </li>
                            <li className='pb-2'>
                                <Link
                                    to='/list-event'
                                    className={isActive('/list-event') ? 'active-link' : ''}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        textDecoration: 'none',
                                        color: 'rgba(33, 51, 97, 1)',
                                        backgroundColor: isActive('/list-event') ? 'white' : 'transparent',
                                        paddingLeft: '50px',
                                        borderRadius: '4px',
                                        height: '50px'
                                    }}
                                >
                                    Liste des évènements
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>

            {/* Sidebar, visible sur les écrans réduits */}
            {isOpen && (
                <div className="d-md-none p-0" style={{
                    backgroundColor: 'rgba(238, 238, 238, 1)',
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    height: '100%',
                    zIndex: '1000'
                }}>
                    <h2 className='text-center pt-4'>Paramètres du compte</h2>
                    <ul className='pt-3' style={{ listStyleType: 'none', padding: '0' }}>


                        {userRole === 'user' && (
                            <>
                                <li className='pb-2'>
                                    <Link
                                        to="/account-info"
                                        className={isActive('/account-info') ? 'active-link' : ''}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            textDecoration: 'none',
                                            color: 'rgba(33, 51, 97, 1)',
                                            backgroundColor: isActive('/account-info') ? 'white' : 'transparent',
                                            paddingLeft: '50px',
                                            borderRadius: '4px',
                                            height: '50px'
                                        }}
                                    >
                                        Informations sur le compte
                                    </Link>
                                </li>
                                <li className='pb-2'>
                                    <Link
                                        to='/change-email'
                                        className={isActive('/change-email') ? 'active-link' : ''}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            textDecoration: 'none',
                                            color: 'rgba(33, 51, 97, 1)',
                                            backgroundColor: isActive('/change-email') ? 'white' : 'transparent',
                                            paddingLeft: '50px',
                                            borderRadius: '4px',
                                            height: '50px'
                                        }}
                                    >
                                        Changer l'e-mail
                                    </Link>
                                </li>
                                <li className='pb-2'>
                                    <Link
                                        to='/change-password'
                                        className={isActive('/change-password') ? 'active-link' : ''}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            textDecoration: 'none',
                                            color: 'rgba(33, 51, 97, 1)',
                                            backgroundColor: isActive('/change-password') ? 'white' : 'transparent',
                                            paddingLeft: '50px',
                                            borderRadius: '4px',
                                            height: '50px'
                                        }}
                                    >
                                        Mot de passe
                                    </Link>
                                </li>
                                <li className='pb-2'>
                                    <Link
                                        to='/history'
                                        className={isActive('/history') ? 'active-link' : ''}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            textDecoration: 'none',
                                            color: 'rgba(33, 51, 97, 1)',
                                            backgroundColor: isActive('/history') ? 'white' : 'transparent',
                                            paddingLeft: '50px',
                                            borderRadius: '4px',
                                            height: '50px'
                                        }}
                                    >
                                        Historique
                                    </Link>
                                </li>
                            </>
                        )}

                        {organizerRole === 'organizer' && (
                            <>
                                <li className='pb-2'>
                                    <Link
                                        to='/promoteur/info-compte'
                                        className={isActive('/promoteur/info-compte') ? 'active-link' : ''}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            textDecoration: 'none',
                                            color: 'rgba(33, 51, 97, 1)',
                                            backgroundColor: isActive('/promoteur/info-compte') ? 'white' : 'transparent',
                                            paddingLeft: '50px',
                                            borderRadius: '4px',
                                            height: '50px'
                                        }}
                                    >
                                        Information du compte
                                    </Link>
                                </li>
                                <li className='pb-2'>
                                    <Link
                                        to='/promoteur/dashboard'
                                        className={isActive('/promoteur/dashboard') ? 'active-link' : ''}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            textDecoration: 'none',
                                            color: 'rgba(33, 51, 97, 1)',
                                            backgroundColor: isActive('/promoteur/dashboard') ? 'white' : 'transparent',
                                            paddingLeft: '50px',
                                            borderRadius: '4px',
                                            height: '50px'
                                        }}
                                    >
                                        Tableau de bord
                                    </Link>
                                </li>
                            </>
                        )}
                        {adminRole === 'admin' && (
                            <>
                                <li className='pb-2'>
                                    <Link
                                        to='/admin/info-compte'
                                        className={isActive('/admin/info-compte') ? 'active-link' : ''}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            textDecoration: 'none',
                                            color: 'rgba(33, 51, 97, 1)',
                                            backgroundColor: isActive('/admin/info-compte') ? 'white' : 'transparent',
                                            paddingLeft: '50px',
                                            borderRadius: '4px',
                                            height: '50px'
                                        }}
                                    >
                                        Information du compte
                                    </Link>
                                </li>
                                <li className='pb-2'>
                                    <Link
                                        to='/gestion-users'
                                        className={isActive('/gestion-users') ? 'active-link' : ''}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            textDecoration: 'none',
                                            color: 'rgba(33, 51, 97, 1)',
                                            backgroundColor: isActive('/gestion-users') ? 'white' : 'transparent',
                                            paddingLeft: '50px',
                                            borderRadius: '4px',
                                            height: '50px'
                                        }}
                                    >
                                        Gestion utilisateur
                                    </Link>
                                </li>
                                <li className='pb-2'>
                                    <Link
                                        to='/all-category'
                                        className={isActive('/all-category') ? 'active-link' : ''}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            textDecoration: 'none',
                                            color: 'rgba(33, 51, 97, 1)',
                                            backgroundColor: isActive('/all-category') ? 'white' : 'transparent',
                                            paddingLeft: '50px',
                                            borderRadius: '4px',
                                            height: '50px'
                                        }}
                                    >
                                        Liste des catégories
                                    </Link>
                                </li>
                                <li className='pb-2'>
                                    <Link
                                        to='/list-event'
                                        className={isActive('/list-event') ? 'active-link' : ''}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            textDecoration: 'none',
                                            color: 'rgba(33, 51, 97, 1)',
                                            backgroundColor: isActive('/list-event') ? 'white' : 'transparent',
                                            paddingLeft: '50px',
                                            borderRadius: '4px',
                                            height: '50px'
                                        }}
                                    >
                                        Liste des évènements
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SideBar;
