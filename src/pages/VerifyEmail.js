import React, { useState } from 'react';
import API_URL from '../pages/config/api';
import EnteteDash from '../components/EnteteDash';
import DashHeader from '../components/DashHeader';
import { Link } from 'react-router-dom';

const VerifyEmail = () => {
    const [verificationCode, setVerificationCode] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/api/email/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ verification_code: verificationCode }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setError('');

            } else {
                setError(data.message || 'Une erreur est survenue.');
                setMessage('');
            }
        } catch (error) {
            setError('Erreur lors de la vérification de l\'e-mail.');
        }
    };

    return (
        <>
            <div className="container-scroller">
                <div className="horizontal-menu">
                    <EnteteDash />
                    <DashHeader />
                </div>
                <div className="container mt-5">
                    <div className="row g-5">
                        <div className="col-md-4">

                        </div>

                        <div className="col-md-4 ">
                           
                            <h4>Veuillez entrer le code de vérification que vous avez reçu par e-mail.</h4>
                            <p>Si vous n'avez pas reçu de code, vous pouvez demander un nouveau à votre adresse e-mail.</p>
                            
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="verification_code">Code de Vérification</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="verification_code"
                                        value={verificationCode}
                                        onChange={(e) => setVerificationCode(e.target.value)}
                                        required
                                        style={{ outline: 'none', boxShadow: 'none', height: '50px' }}
                                    />
                                </div>
                                {error && <div className="alert alert-danger">{error}</div>}
                                {message && <div className="alert alert-success">{message}</div>}
                                <button type="submit" className="btn btn-primary mt-3">
                                    Vérifier
                                </button>
                            </form>
                        </div>

                        <div className="col-md-4 ">

                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default VerifyEmail;
