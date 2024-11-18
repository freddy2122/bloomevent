import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SideBar from '../../components/SideBar';
import { ToastContainer, toast } from 'react-toastify';
import API_URL from '../config/api';
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword = () => {
  const [password, setPassword] = useState('');
  const [password_confirmation, setPassword_confirmation] = useState('');
  const [verification_code, setVerification_code] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [showVerificationCode, setShowVerificationCode] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(true); // État pour gérer l'affichage du formulaire de mot de passe
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserEmail = async () => {
      if (!token) {
        console.error('Token is missing');
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/user/get_my_profil`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.error('HTTP error', response.status);
          throw new Error(`Erreur ${response.status} : ${response.statusText}`);
        }

        const data = await response.json();
        setEmail(data.user.email);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserEmail();
  }, [token]);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Check if passwords match
    if (password !== password_confirmation) {
      setError('Les mots de passe ne correspondent pas.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/user/update_password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          password,
          password_confirmation,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.errors ? data.errors.password[0] : 'Erreur lors du changement de mot de passe.');
      }

      setShowVerificationCode(true); 
      toast.success('Votre code a été envoyé avec succès !'); 
      setShowPasswordForm(false); 
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationCodeSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/email/verify`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ verification_code: verification_code }),
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status} : ${response.statusText}`);
      }

      
      toast.success('Votre mot de passe a été changé avec succès !');

      
      
      
      
      setShowPasswordForm(true); // Retourner à l'étape initiale
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <div className='container-fluid'>
        <div className='row'>
          <SideBar />
          <div className='col-md-8 mb-5 p-4' style={{ marginLeft: '0', transition: 'margin-left 0.3s' }}>
            <h2 className='border-bottom' style={{ color: 'rgba(33, 51, 97, 1)' }}>Définir le mot de passe</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}

            {showPasswordForm && (
              <form className='mt-5' onSubmit={handleChangePassword}>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Nouveau mot de passe :</label>
                  <input
                    style={{ outline: 'none', boxShadow: 'none' }}
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Entrer le nouveau mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmpassword" className="form-label">Confirmer le mot de passe :</label>
                  <input
                    style={{ outline: 'none', boxShadow: 'none' }}
                    type="password"
                    className="form-control"
                    id="confirmpassword"
                    placeholder="Entrer encore le nouveau mot de passe"
                    value={password_confirmation}
                    onChange={(e) => setPassword_confirmation(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn" style={{ backgroundColor: 'rgba(234, 106, 8, 1)', color: 'white' }}>
                  {loading ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  ) : (
                    'Changer le mot de passe'
                  )}
                </button>
              </form>
            )}

            {showVerificationCode && (
              <form className='mt-5' onSubmit={handleVerificationCodeSubmit}>
                <div className="mb-3">
                  <label htmlFor="verificationCode" className="form-label">Code de vérification :</label>
                  <input
                    style={{ outline: 'none', boxShadow: 'none' }}
                    type="text"
                    className="form-control"
                    id="verificationCode"
                    placeholder="Entrer le code de vérification"
                    value={verification_code}
                    onChange={(e) => setVerification_code(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn" style={{ backgroundColor: 'rgba(234, 106, 8, 1)', color: 'white' }}>
                  Soumettre le code
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <div className='container-fluid' style={{ background: 'rgba(0, 0, 0, 1)' }}>
        <Footer />
      </div>
    </>
  );
};

export default ChangePassword;
