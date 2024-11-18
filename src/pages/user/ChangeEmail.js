import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SideBar from '../../components/SideBar';
import API_URL from '../config/api';
import { ToastContainer, toast } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast

const ChangeEmail = () => {
  const [email, setEmail] = useState('');
  const [email_confirmation, setEmail_confirmation] = useState('');
  const [verification_code, setVerification_code] = useState('');
  const [isVerificationStep, setIsVerificationStep] = useState(false); // Gérer la deuxième étape
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserEmail = async () => {
      const token = localStorage.getItem('token');
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
      } finally {
        setLoading(false);
      }
    };

    fetchUserEmail();
  }, []);

  // Fonction pour soumettre la demande de changement d'e-mail
  const handleChangeEmailSubmit = async (e) => {
    e.preventDefault();

    if (email !== email_confirmation) {
      setError('Les deux e-mails ne correspondent pas.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/user/update_email`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email, 
          email_confirmation: email_confirmation  // Ajouter email_confirmation
        }),
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status} : ${response.statusText}`);
      }

      // Passer à la deuxième étape
      setIsVerificationStep(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour soumettre le code de vérification
  const handleVerificationSubmit = async (e) => {
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

      // Toast pour succès
      toast.success('Votre e-mail a été changé avec succès !');

      // Vider les champs email et email_confirmation
      
      
      setVerification_code('');
      setIsVerificationStep(false); // Retourner à l'étape initiale
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className='container-fluid'>
        <div className='row'>
          <SideBar />
          <div className='col-md-8 mb-5 p-4' style={{ marginLeft: '0', transition: 'margin-left 0.3s' }}>
            <h2 className='border-bottom' style={{ color: 'rgba(33, 51, 97, 1)' }}>Changer l'e-mail</h2>

            {loading ? (
              <p>Chargement...</p>
            ) : error ? (
              <p style={{ color: 'red' }}>{error}</p>
            ) : (
              <>
                {!isVerificationStep ? (
                  // Formulaire pour saisir le nouvel e-mail
                  <form onSubmit={handleChangeEmailSubmit} className='mt-5'>
                    <p className="mt-3">E-mail actuel : {email}</p>
                    <div className="mb-3 row">
                      <div className="col-md-2 pe-1">
                        <label htmlFor="newEmail" className="form-label">Nouveau e-mail :</label>
                      </div>
                      <div className="col-md-6 ps-1">
                        <input 
                          style={{ outline: 'none', boxShadow: 'none' }} 
                          type="email" 
                          className="form-control" 
                          id="newEmail" 
                          placeholder="Entrer le nouveau e-mail"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <div className="col-md-2 pe-1">
                        <label htmlFor="confirmEmail" className="form-label">Confirmer l’e-mail :</label>
                      </div>
                      <div className="col-md-6 ps-1">
                        <input 
                          style={{ outline: 'none', boxShadow: 'none' }} 
                          type="email" 
                          className="form-control" 
                          id="confirmEmail" 
                          placeholder="Entrer encore le nouveau e-mail"
                          value={email_confirmation}
                          onChange={(e) => setEmail_confirmation(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <button type="submit" className="btn" style={{ backgroundColor: 'rgba(234, 106, 8, 1)', color: 'white' }}>
                      {loading ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      ) : (
                        'Enregistrer le nouvel e-mail'
                      )}
                    </button>
                  </form>
                ) : (
                  // Formulaire de vérification
                  <form onSubmit={handleVerificationSubmit} className='mt-5'>
                    <div className="mb-3 row">
                      <div className="col-md-2 pe-1">
                        <label htmlFor="verificationCode" className="form-label">Code de vérification :</label>
                      </div>
                      <div className="col-md-6 ps-1">
                        <input 
                          style={{ outline: 'none', boxShadow: 'none' }} 
                          type="text" 
                          className="form-control" 
                          id="verificationCode" 
                          placeholder="Entrer le code reçu"
                          value={verification_code}
                          onChange={(e) => setVerification_code(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <button type="submit" className="btn" style={{ backgroundColor: 'rgba(234, 106, 8, 1)', color: 'white' }}>
                      {loading ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      ) : (
                        'Vérifier et changer l’e-mail'
                      )}
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className='container-fluid' style={{ background: 'rgba(0, 0, 0, 1)' }}>
        <Footer />
      </div>
      <ToastContainer /> {/* Container for Toast Notifications */}
    </>
  );
};

export default ChangeEmail;
