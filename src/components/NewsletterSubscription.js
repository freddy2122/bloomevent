import React, { useState } from 'react';
import API_URL from '../pages/config/api';

const NewsletterSubscription = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    // Fonction pour gérer la soumission
    const handleSubscribe = async () => {
        setMessage(''); // Réinitialiser le message

        // Validation de l'email
        if (!email) {
            setMessage("L'adresse e-mail est requise.");
            return;
        }

        // Envoi de la requête POST avec fetch
        try {
            const response = await fetch(`${API_URL}/api/subscribe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email }), // Données envoyées
            });

            if (response.ok) {
                const result = await response.json();
                setMessage('Souscription réussie ! Merci de vous être abonné.');
                setEmail(''); // Réinitialiser le champ e-mail
            } else {
                const errorData = await response.json();
                setMessage(errorData.errors?.email?.[0] || 'Erreur lors de la souscription.');
            }
        } catch (error) {
            setMessage('Erreur de connexion. Veuillez réessayer.');
        }
    };

    return (
        <div className='container-fluid mt-5' style={{ background: 'linear-gradient(90deg, #213361 0%, #EA6A08 100%)' }}>
            <div className='container'>
                <div className="card pt-5 pb-5" style={{ background: 'linear-gradient(90deg, #213361 0%, #EA6A08 100%)', border: 'none' }}>
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col-md-6 mb-4 mb-md-0">
                                <h3 className="card-title text-white">Abonnez-vous à notre newsletter</h3>
                                <p className="card-text text-white">Recevez notre newsletter hebdomadaire et nos mises à jour avec les nouveaux événements de vos organisateurs et lieux préférés.</p>
                            </div>

                            <div className="col-md-6 text-center">
                                <div className="input-group" style={{ width: '75%' }}>
                                    <input
                                        className="form-control"
                                        type="email"
                                        placeholder="Entrez votre adresse e-mail..."
                                       
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={{ borderRadius: '0px', outline: 'none', boxShadow: 'none'}}
                                    />
                                    <button
                                        onClick={handleSubscribe}
                                        className='btn'
                                        style={{
                                            border: 'solid #6F6F6F 2px',
                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                            transition: 'box-shadow 0.3s ease',
                                            backgroundColor: 'rgba(33, 51, 97, 1)',
                                            color: '#fff',
                                            padding: '10px 20px',
                                            textAlign: 'center',
                                        }}
                                    >
                                        Souscrire
                                    </button>
                                </div>
                                {message && (
                                    <div className="mt-3 text-white">{message}</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsletterSubscription;
