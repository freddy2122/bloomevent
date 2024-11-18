import React, { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import maps from '../assets/images/Maps.png';
// Vous pouvez utiliser `react-toastify` pour des toasts plus interactifs
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API_URL from './config/api';

const Contact = () => {
  // États pour les champs de formulaire
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');

  // Gérer l'envoi du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construire les données pour l'API
    const data = { name, email, message, subject };

    try {
      const response = await fetch(`${API_URL}/api/send_message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`Erreur: ${errorData.errors?.join(', ') || 'Une erreur est survenue'}`);
        return;
      }

      // Réinitialiser les champs de formulaire en cas de succès
      setName('');
      setEmail('');
      setMessage('');
      setSubject('');
      toast.success('Votre message a été envoyé avec succès !');
    } catch (error) {
      toast.error("Erreur d'envoi du message. Veuillez réessayer.");
    }
  };

  return (
    <>
      <Header />
      <div className="container-fluid d-flex justify-content-center mt-5 mb-5">
        <div className="row rounded shadow" style={{ backgroundColor: 'rgba(48, 48, 48, 1)' }}>
          {/* Colonne gauche */}
          <div className="col-12 col-md-6 bg-white p-5">
            <h3 className="mb-4" style={{ fontSize: '32px' }}>Entrer en contact</h3>
            <hr style={{ width: '110px', height: '10px', backgroundColor: '#EA6A08', border: 'none' }} />

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ outline: 'none', boxShadow: 'none', height: '50px' }}
                />
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ outline: 'none', boxShadow: 'none', height: '50px' }}
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Sujet"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  style={{ outline: 'none', boxShadow: 'none', height: '50px' }}
                />
              </div>

              <div className="mb-3">
                <textarea
                  className="form-control"
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ outline: 'none', boxShadow: 'none', height: '150px' }}
                />
              </div>

              <button
                type="submit"
                className="btn w-100"
                style={{
                  backgroundColor: 'rgba(234, 106, 8, 1)',
                  color: 'white',
                  boxShadow: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.1)',
                  transition: 'box-shadow 0.3s ease',
                  borderRadius: '100px'
                }}
              >
                Soumettre
              </button>
            </form>
          </div>

          {/* Colonne droite */}
          <div className="col-12 col-md-6 text-white p-5">
            <h5 className="mb-3 mt-5">Découvrez des événements sur mesure.</h5>
            <p>Inscrivez-vous dès aujourd'hui pour recevoir des recommandations personnalisées !</p>
            <img src={maps} alt="maps" className="img-fluid" style={{ maxHeight: '174px' }} />

            <div className="mt-4">
              <p><i className="fas fa-map-marker-alt" style={{ color: 'rgba(234, 106, 8, 1)' }}></i> Agla Hlazounto, Maison du Peuple, Cotonou, Bénin</p>
              <p><i className="fas fa-phone" style={{ color: 'rgba(234, 106, 8, 1)' }}></i> +229 55 73 35 35</p>
              <p><i className="fas fa-envelope" style={{ color: 'rgba(234, 106, 8, 1)' }}></i> support@dflgroupe.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid" style={{ background: 'rgba(0, 0, 0, 1)' }}>
        <Footer />
      </div>
    </>
  );
};

export default Contact;
