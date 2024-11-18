import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/bloo.png';
import API_URL from '../pages/config/api';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/api/password/email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setError('');

                // Supposons que la réponse contienne le token de réinitialisation
                const token = data.token;

                // Rediriger vers la page reset-password avec les paramètres token et email
                navigate(`/reset-password?token=${token}&email=${encodeURIComponent(email)}`);
            } else {
                setError(data.message || 'Une erreur est survenue.');
                setMessage('');
            }
        } catch (error) {
            setError('Erreur lors de l\'envoi du lien de réinitialisation.');
        }
    };

    return (
        <div className="container-scroller">
            <div className="container mt-5 pt-5">
                <div className="row g-5">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <h2 className='text-center pb-5'>
                            <Link className="navbar-brand" to="/">
                                <img src={logo} alt="Logo" style={{ height: '55px' }} />
                            </Link>
                        </h2>

                        <div class="card" >
                            <div class="card-body">
                                <h4 className='pb-3'>Réinitialiser votre mot de passe</h4>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="email">Adresse e-mail</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            style={{ outline: 'none', boxShadow: 'none', height: '50px' }}
                                        />
                                    </div>
                                    {error && <div className="alert alert-danger">{error}</div>}
                                    {message && <div className="alert alert-success">{message}</div>}
                                    <button type="submit" className="btn" style={{ backgroundColor: '#213361', color: 'white' }}>
                                        Envoyer le lien de réinitialisation
                                    </button>
                                </form>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
