import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API_URL from './config/api';

const Organisateur = () => {
    const [organisation_name, setOrganisation_name] = useState('');
    const [phone_number, setPhone_number] = useState('');
    const [country, setCountry] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const token = localStorage.getItem('token');
    
        fetch(`${API_URL}/api/user/become_organizer`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                organisation_name: organisation_name,
                phone_number: phone_number,
                country: country,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la soumission du formulaire');
                }
                return response.json();
            })
            .then(data => {
                // Mettre à jour uniquement la valeur de 'role' dans le localStorage
                localStorage.setItem('role', 'organizer'); // Remplacez le rôle par "organizer"
    
                toast.success(data.message); // Afficher un message de succès
                navigate('/organisateur/creer-event'); // Rediriger vers la page "Créer un événement"
            })
            .catch(error => {
                console.error('Erreur lors de la soumission:', error);
                toast.error('Erreur lors de la soumission du formulaire.');
            });
    };

    return (
        <>
            <Header />
            <div className='container'>
                <div className='row'>
                    <div className='col-md-3'></div>
                    <div className='col-md-6'>
                        <h2 style={{ color: 'white' }}>Devenir Organisateur</h2>
                        <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
                            <div className="mb-3">
                                <label htmlFor="organisationName" className="form-label">Nom de l'organisation</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="organisationName"
                                    value={organisation_name}
                                    onChange={(e) => setOrganisation_name(e.target.value)}
                                    required
                                    style={{ outline: 'none', boxShadow: 'none', height: '50px' }}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phoneNumber" className="form-label">Numéro de téléphone (optionnel)</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="phoneNumber"
                                    value={phone_number}
                                    onChange={(e) => setPhone_number(e.target.value)}
                                    style={{ outline: 'none', boxShadow: 'none', height: '50px' }}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="country" className="form-label">Pays</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="country"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    style={{ outline: 'none', boxShadow: 'none', height: '50px' }}
                                />
                            </div>
                            <button type="submit" className="btn w-100" style={{ backgroundColor: 'rgba(234, 106, 8, 1)', color: 'white'}} >Soumettre</button>
                        </form>
                    </div>
                    <div className='col-md-3'></div>
                </div>
            </div>
            <div className="container-fluid" style={{ background: 'rgba(0, 0, 0, 1)' }}>
                <Footer />
            </div>
        </>
    );
};

export default Organisateur;
