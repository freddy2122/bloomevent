import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import API_URL from '../pages/config/api';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const email = searchParams.get('email');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas.');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/password/reset`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Mot de passe réinitialisé avec succès !');
                setMessage(data.message);
                setError('');
                setTimeout(() => navigate('/login'), 3000);
                navigate('/login'); // Redirige vers la page de connexion après le succès
            } else {
                setError(data.message || 'Une erreur est survenue.');
                setMessage('');
            }
        } catch (error) {
            setError('Erreur lors de la réinitialisation du mot de passe.');
        }
    };

    return (
        <div className="container-scroller">
            <div className="container mt-5 pt-5">
                <div className="row g-5">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <h2>Réinitialiser votre mot de passe</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="password">Nouveau mot de passe</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirm_password">Confirmer le mot de passe</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="confirm_password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {error && <div className="alert alert-danger">{error}</div>}
                            {message && <div className="alert alert-success">{message}</div>}
                            <button type="submit" className="btn btn-primary mt-3">
                                Réinitialiser le mot de passe
                            </button>
                        </form>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
