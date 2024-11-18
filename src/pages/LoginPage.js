import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import face from '../assets/images/face.png';
import goo from '../assets/images/google.png';
import footer from '../assets/images/bloom.png';
import { Link, useNavigate } from 'react-router-dom';
import API_URL from './config/api';
import NProgress from 'nprogress';

const PageConnexion = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        NProgress.start();
        try {
            const response = await fetch(`${API_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setErrorMessage(data.message || 'Erreur de connexion');
                return;
            }

            if (data.access_token && data.user && data.user.role) {
                const currentTime = new Date().getTime();
                localStorage.setItem('token', data.access_token);
                localStorage.setItem('role', data.user.role);
                localStorage.setItem('loginTime', currentTime);
            } else {
                setErrorMessage('Données manquantes dans la réponse du serveur.');
                return;
            }


            navigate('/');
        } catch (error) {
            console.error('Erreur:', error);
            setErrorMessage('Une erreur s\'est produite. Veuillez réessayer.');
        }finally {
            NProgress.done(); 
          }
    };


    const syncUserData = async () => {
        console.log('Synchronisation des données utilisateur'); // Ajoutez cette ligne pour vérifier l'exécution
        const token = localStorage.getItem('token');

        if (!token) return;

        try {
            const response = await fetch(`${API_URL}/api/get_my_profil`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            console.log(data);
            if (response.ok && data.user) {
                console.log('Rôle actuel:', localStorage.getItem('role')); // Affiche l'ancien rôle
                console.log('Rôle récupéré:', data.user.role); // Affiche le rôle récupéré de l'API
                if (localStorage.getItem('role') !== data.user.role) {
                    localStorage.setItem('role', data.user.role);
                    console.log('Rôle mis à jour:', data.user.role);
                }
            } else {
                console.log('Erreur lors de la synchronisation des données utilisateur');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des données utilisateur:', error);
        }
    };


    useEffect(() => {
        const interval = setInterval(syncUserData, 5000);
        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        const checkTokenExpiry = () => {
            const token = localStorage.getItem('token');
            const loginTime = localStorage.getItem('loginTime');

            if (token && loginTime) {
                const currentTime = new Date().getTime();
                const timeElapsed = currentTime - loginTime;

                const twoHours = 2 * 60 * 60 * 1000; 
                if (timeElapsed > twoHours) {
                   
                    localStorage.removeItem('token');
                    localStorage.removeItem('role');
                    localStorage.removeItem('loginTime');
                    setErrorMessage('Votre session a expiré. Veuillez vous reconnecter.');
                    navigate('/login'); 
                }
            }
        };

        
        const interval = setInterval(checkTokenExpiry, 5 * 60 * 1000);

        return () => clearInterval(interval); 
    }, [navigate]);



    return (
        <div className="container-fluid d-flex justify-content-center" style={{ height: '100vh', overflowY: 'auto' }}>
            <div className="row rounded shadow" style={{ backgroundColor: '#1B3668', width: '100%', maxWidth: '900px' }}>

                <div className="col-md-5 p-5" style={{ color: 'white' }}>
                    <Link className="link-dark" to="/">
                        <img src={footer} alt="footer" className="img-fluid" style={{ height: '90px' }} />
                    </Link>
                    <h5 className="mb-3 mt-5">Découvrez des événements sur mesure.</h5>
                    <p>Connectez-vous dès aujourd'hui pour obtenir des recommandations personnalisées !</p>
                </div>


                <div className="col-md-7 bg-white p-5" style={{ borderTopLeftRadius: '70px', borderBottomLeftRadius: '70px' }}>
                    <h3 className="mb-4">Se connecter</h3>


                    {errorMessage && <div className="alert alert-danger text-center">{errorMessage}</div>}


                   {/*  <div className="row justify-content-between mb-2">
                        <div className="col-md-6 mb-3">
                            <button className="btn btn-outline-primary w-100 me-2" style={{ boxShadow: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.1)', transition: 'box-shadow 0.3s ease' }}>
                                <img src={goo} alt="goo" className="me-2" style={{ height: '36px' }} />
                                Inscription avec Google
                            </button>
                        </div>
                        <div className="col-md-6 ">
                            <button className="btn btn-outline-primary w-100">
                                <img src={face} alt="face" className="me-2" style={{ height: '36px' }} />
                                Inscription avec Facebook
                            </button>
                        </div>
                    </div> */}

                    {/* <p className="text-center">OU</p> */}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="formEmail" className="form-label">Adresse email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="formEmail"
                                placeholder="Entrez votre adresse email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ outline: 'none', boxShadow: 'none', height: '50px' }} // Retirer le focus
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="formPassword" className="form-label">Mot de passe</label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-control"
                                    id="formPassword"
                                    placeholder="Entrez votre mot de passe"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={{ outline: 'none', boxShadow: 'none', height: '50px' }} // Retirer le focus
                                    required
                                />
                                <button type="button" className="btn" onClick={togglePasswordVisibility} style={{ border: '1px #86b7fe solid' }}>
                                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="btn w-100" style={{ backgroundColor: 'rgba(234, 106, 8, 1)', color: 'white', boxShadow: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.1)', transition: 'box-shadow 0.3s ease' }}>
                            Se connecter
                        </button>
                    </form>

                    <p className="text-center mt-3">
                        Vous n'avez pas de compte ? <Link to="/register">S'inscrire</Link>
                    </p>
                    <p className="text-center mt-3">
                        <Link to="/forgot-password"> Mot de passe oublié ?</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PageConnexion;
