import React from 'react';
import footer from '../assets/images/bloom.png';

import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="container">
            <footer className="py-5">
                <div className="row">
                    <div className="col-6 col-md-2 mb-3">
                        <h5 className='text-white'>Company Info</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><Link to="/about" className="nav-link p-0 " style={{ color: 'GrayText' }}>À propos de nous</Link></li>
                            <li className="nav-item mb-2"><Link to="/contact" className="nav-link p-0 " style={{ color: 'GrayText' }}>Contactez nous</Link></li>
                            <li className="nav-item mb-2"><Link to="/politique-et-confidentialite" className="nav-link p-0 " style={{ color: 'GrayText' }}>politique de confidentialité</Link></li>
                        </ul>
                    </div>

                    <div className="col-6 col-md-2 mb-3">
                        <h5 className='text-white'>Aide</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 " style={{ color: 'GrayText' }}>Assistance compte</Link></li>
                            <li className="nav-item mb-2"><Link to="/events" className="nav-link p-0 " style={{ color: 'GrayText' }}>Liste des événements</Link></li>
                        </ul>
                    </div>

                    <div className="col-6 col-md-2 mb-3">
                       
                    </div>

                    <div className="col-6 col-md-2 mb-3">
                        <h5 className='text-white'>Suivez nous</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 " style={{ color: 'GrayText' }}>Facebook</Link></li>
                            <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 " style={{ color: 'GrayText' }}>Instagram</Link></li>
                            <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 " style={{ color: 'GrayText' }}>Whatsapp</Link></li>
                        </ul>
                    </div>

                    <div className="col-md-4  mb-3">
                        <Link className="link-dark" to="#">
                            <img src={footer} alt="footer" style={{ height: '90px' }} />
                        </Link>
                    </div>
                </div>

                <div className="d-flex flex-column flex-sm-row justify-content-center py-4 my-4 border-top">
                    <p className='text-center text-white'>&copy; 2024 Bloom Events. Tous droits réservés.</p>
                    
                </div>
            </footer>
        </div>
    );
};

export default Footer;
