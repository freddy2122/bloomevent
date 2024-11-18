import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import API_URL from './config/api';
import face from '../assets/images/face.png';
import goo from '../assets/images/google.png';
import footer from '../assets/images/bloom.png';
import { Link, useNavigate  } from 'react-router-dom';

const PageInscription = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPassword_confirmation] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    // Fonction pour gérer l'inscription
    const handleRegister = async (e) => {
        e.preventDefault();
        
        
        if (password !== password_confirmation) {
            setError("Les mots de passe ne correspondent pas");
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/api/register`, {
                name,
                email,
                phone,
                password,
                password_confirmation
            });
            
            console.log("Inscription réussie :", response.data);
            navigate('/login');
        } catch (error) {
            
            console.error("Erreur lors de l'inscription :", error.response.data);
            setError(error.response.data.message || "Une erreur s'est produite");
        }
    };

    return (
        <div className="container-fluid d-flex justify-content-center" style={{ height: '100vh', overflowY: 'auto' }}>
            <div className="row rounded shadow" style={{ backgroundColor: '#1B3668' }}>
                <div className="col-md-5 p-5" style={{ color: 'white' }}>
                    <Link className="link-dark" to="/">
                        <img src={footer} alt="footer" className="img-fluid" style={{ height: '90px' }} />
                    </Link>
                    <h5 className="mb-3 mt-5">Découvrez des événements sur mesure.</h5>
                    <p>Inscrivez-vous dès aujourd'hui pour recevoir des recommandations personnalisées !</p>
                </div>

                <div className="col-md-7 bg-white p-5" style={{ borderTopLeftRadius: '70px', borderBottomLeftRadius: '70px' }}>
                    <h3 className="mb-4">Créer un compte</h3>

                   {/*  <div className="row justify-content-between mb-2">
                        <div className="col-md-6 mb-3">
                            <button className="btn btn-outline-primary w-100 me-2">
                                <img src={goo} alt="goo" className="me-2" style={{ height: '36px' }} />
                                Inscription avec Google
                            </button>
                        </div>
                        <div className="col-md-6">
                            <button className="btn btn-outline-primary w-100">
                                <img src={face} alt="face" className="me-2" style={{ height: '36px' }} />
                                Inscription avec Facebook
                            </button>
                        </div>
                    </div> */}

                  {/*   <p className="text-center">OU</p> */}

                    <form onSubmit={handleRegister}>
                        <div className="mb-3">
                            <label htmlFor="formNomUtilisateur" className="form-label">Nom d'utilisateur</label>
                            <input
                                type="text"
                                className="form-control"
                                id="formNomUtilisateur"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Entrez votre nom "
                                required
                                style={{ outline: 'none', boxShadow: 'none' }}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="formEmail" className="form-label">Adresse email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="formEmail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Entrez votre adresse email"
                                required
                                style={{ outline: 'none', boxShadow: 'none' }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Numéro de téléphone</label>
                            <input
                                type="text"
                                className="form-control"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Téléphone"
                                required
                                style={{ outline: 'none', boxShadow: 'none' }}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="formPassword" className="form-label">Mot de passe</label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-control"
                                    id="formPassword"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Confirmez votre mot de passe"
                                    required
                                    style={{ outline: 'none', boxShadow: 'none' }}
                                />
                                <button type="button" className="btn" onClick={togglePasswordVisibility}>
                                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
                                </button>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="formConfirmPassword" className="form-label">Confirmer le mot de passe</label>
                            <div className="input-group">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    className="form-control"
                                    id="formConfirmPassword"
                                    value={password_confirmation}
                                    onChange={(e) => setPassword_confirmation(e.target.value)}
                                    placeholder="Confirmer votre mot de passe"
                                    required
                                    style={{ outline: 'none', boxShadow: 'none' }}
                                />
                                <button type="button" className="btn" onClick={toggleConfirmPasswordVisibility}>
                                    <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
                                </button>
                            </div>
                        </div>

                        {error && <p className="text-danger">{error}</p>}

                        <button type="submit" className="btn w-100" style={{ backgroundColor: 'rgba(234, 106, 8, 1)', color: 'white' }}>
                            Créer un compte
                        </button>
                    </form>

                    <p className="text-center mt-3">
                        Vous avez déjà un compte ? <Link to="/login">Se connecter</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PageInscription;
