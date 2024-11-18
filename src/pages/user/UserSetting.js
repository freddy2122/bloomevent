import React, { useState, useEffect } from 'react';
import EnteteDash from '../../components/EnteteDash';
import DashHeader from '../../components/DashHeader';
import API_URL from '../config/api';

const UserSetting = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [currentEmail, setCurrentEmail] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState(''); // 'success' ou 'error'

   
    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${API_URL}/api/user/get_my_profil`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    const email = data.user.email;
                    
                    setCurrentEmail(email);
                    localStorage.setItem('email', email);
                } else {
                    console.error('Erreur lors de la récupération des informations du profil.');
                }
            } catch (error) {
                console.error('Erreur de connexion pour récupérer les informations du profil.', error);
            }
        };

        getUserProfile();
    }, []);


    const handlePasswordChange = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setToastMessage('Les mots de passe ne correspondent pas.');
            setToastType('error');
            showToast();
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/api/user/update_password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    password: newPassword,
                    password_confirmation: confirmPassword
                })
            });

            const data = await response.json();

            if (response.ok) {
                setToastMessage('Mot de passe mis à jour avec succès.');
                setToastType('success');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                setToastMessage(data.errors ? data.errors.password[0] : 'Erreur lors de la mise à jour du mot de passe.');
                setToastType('error');
            }
        } catch (error) {
            setToastMessage('Erreur de connexion. Veuillez réessayer.');
            setToastType('error');
        }

        showToast();
    };

    const handleEmailChange = async (e) => {
        e.preventDefault();

        if (newEmail !== confirmEmail) {
            setToastMessage('Les adresses e-mail ne correspondent pas.');
            setToastType('error');
            showToast();
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/api/user/update_email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    email: newEmail,
                    email_confirmation: confirmEmail
                })
            });

            const data = await response.json();

            if (response.ok) {
                setToastMessage('E-mail mis à jour avec succès. Un lien de vérification vous a été envoyé.');
                setToastType('success');
                setNewEmail('');
                setConfirmEmail('');
                // Mettre à jour l'email actuel après la mise à jour
                setCurrentEmail(newEmail);
                localStorage.setItem('email', newEmail);
            } else {
                setToastMessage(data.errors ? data.errors.email[0] : 'Erreur lors de la mise à jour de l\'e-mail.');
                setToastType('error');
            }
        } catch (error) {
            setToastMessage('Erreur de connexion. Veuillez réessayer.');
            setToastType('error');
        }

        showToast();
    };

    const showToast = () => {
        const toast = document.getElementById('toast');
        toast.className = 'show';
        setTimeout(() => {
            toast.className = toast.className.replace('show', '');
        }, 4000); // Le toast disparaît après 4 secondes
    };

    return (
        <div className="container-scroller">
            <div className="horizontal-menu">
                <EnteteDash />
                <DashHeader />
            </div>
            <div className="container mt-5">
                
                <div className="mt-4">
                    <h4>Paramètres de Compte</h4>

                    <div className="card mb-3">
                        <div className="card-body">
                            <h5>Changer le mot de passe</h5>
                            <form onSubmit={handlePasswordChange}>
                                <div className="form-group">
                                    <label>Nouveau mot de passe</label>
                                    <input 
                                        type="password"
                                        className="form-control"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        style={{ outline: 'none', boxShadow: 'none', height: '50px' }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Confirmer le nouveau mot de passe</label>
                                    <input 
                                        type="password"
                                        className="form-control"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        style={{ outline: 'none', boxShadow: 'none', height: '50px' }}
                                    />
                                </div>
                                <button type="submit" className="btn"  style={{backgroundColor: '#213361', color:'white'}}>Mettre à jour le mot de passe</button>
                            </form>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <h5>Changer l'adresse e-mail</h5>
                            <form onSubmit={handleEmailChange}>
                                <div className="form-group">
                                    <label>E-mail actuel</label>
                                    <input 
                                        type="email"
                                        className="form-control"
                                        value={currentEmail}
                                        disabled
                                        style={{ outline: 'none', boxShadow: 'none', height: '50px' }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Nouvelle adresse e-mail</label>
                                    <input 
                                        type="email"
                                        className="form-control"
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                        style={{ outline: 'none', boxShadow: 'none', height: '50px' }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Confirmer la nouvelle adresse e-mail</label>
                                    <input 
                                        type="email"
                                        className="form-control"
                                        value={confirmEmail}
                                        onChange={(e) => setConfirmEmail(e.target.value)}
                                        style={{ outline: 'none', boxShadow: 'none', height: '50px' }}
                                    />
                                </div>
                                <button type="submit" className="btn" style={{backgroundColor: '#213361', color:'white'}}>Mettre à jour l'adresse e-mail</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toast Notification */}
            <div 
                id="toast" 
                className={`toast ${toastType === 'success' ? 'toast-success' : 'toast-error'}`} 
                role="alert"
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    backgroundColor: toastType === 'success' ? 'green' : 'red',
                    color: '#fff',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
                    zIndex: 9999,
                    display: 'none'
                }}
            >
                {toastMessage}
            </div>
        </div>
    );
};

export default UserSetting;
