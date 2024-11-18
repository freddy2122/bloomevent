import React, { useRef, useState, useEffect } from 'react';
import API_URL from '../../pages/config/api'; 
import EnteteDash from '../../components/EnteteDash';
import DashHeader from '../../components/DashHeader';

const InfoCompte = () => {
  const fileInputRef = useRef(null);
  const [profileData, setProfileData] = useState({
    name: '',
    phone_number: '',
    address: '',
    profile_picture: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
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
          throw new Error(`Erreur ${response.status} : ${response.statusText}`);
        }

        const data = await response.json();
        setProfileData({
          name: data.user.name,
          phone_number: data.user.phone_number,
          address: data.user.address,
          profile_picture: data.user.profile_picture, // Ou autre champ correspondant à l'image de profil
        });
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchProfileData();
  }, []);

  const handleCameraClick = () => {
    fileInputRef.current.click(); // Déclenche le clic sur l'input file
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Met à jour l'aperçu avec l'URL de l'image chargée
      };
      reader.readAsDataURL(file);
      // Stocker le fichier sélectionné
      setProfileData((prevData) => ({
        ...prevData,
        profile_picture: file // Utiliser profile_picture comme champ pour stocker le fichier
      }));
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token is missing');
      return;
    }

    const formData = new FormData();
    formData.append('name', profileData.name);
    formData.append('phone_number', profileData.phone_number);
    formData.append('address', profileData.address);

    // Ajoutez l'image au FormData seulement si un nouveau fichier a été sélectionné
    if (profileData.profile_picture && profileData.profile_picture instanceof File) {
      formData.append('profile_picture', profileData.profile_picture);
    }

    try {
      const response = await fetch(`${API_URL}/api/user/update_my_profil`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erreur:', errorData);
        throw new Error(`Erreur ${response.status} : ${response.statusText}`);
      }

      const data = await response.json();
      setProfileData((prevData) => ({
        ...prevData,
        profile_picture: data.user.profile_picture || prevData.profile_picture,
      }));
      setSuccessMessage('Profil mis à jour avec succès !');

      // Supprimez le message de succès après 3 secondes
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error(error.message);
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
          <div className="row">

            <div className="col-md-8 mb-5 p-4">
              <h2 className="mb-4" style={{ color: '#1a4a7c' }}>Informations sur le compte</h2>
              {successMessage && (
                <div className="alert alert-success text-center" style={{ transition: 'opacity 0.5s' }}>
                  {successMessage}
                </div>
              )}
              <div className="row">
                <div className="col-md-6">
                  <form onSubmit={handleSubmit}>
                    {/* Section de la photo de profil */}
                    <div className="mb-4">
                      <div className="position-relative d-inline-block">
                        <h4>Photo de profil</h4>
                        <img
                          src={imagePreview || `${API_URL}/${profileData.profile_picture}`}
                          alt="Profile"
                          className="rounded-circle"
                          style={{ width: '200px', height: '200px' }}
                        />
                        {/* Input file caché */}
                        <input
                          type="file"
                          ref={fileInputRef}
                          style={{ display: 'none' }} // Cacher l'input file
                          onChange={handleFileChange} // Gérer le changement d'image
                          name="profile_picture"
                        />
                        <span
                          className="position-absolute bottom-0 end-0 p-2 bg-white rounded-circle"
                          style={{ fontSize: '15px', cursor: 'pointer' }}
                          onClick={handleCameraClick} // Déclenche l'événement de clic
                        >
                          <i className="fa fa-camera"></i>
                        </span>
                      </div>
                    </div>

                    <h5 className="mb-4">Informations sur le profil</h5>
                    <div className="form-group mb-3 d-flex align-items-center">
                      <label htmlFor="firstName" className="me-2" style={{ minWidth: '100px' }}>Nom & Prénom:</label>
                      <input
                        type="text"
                        name="name"
                        id="firstName"
                        className="form-control"
                        placeholder="Entrez le prénom"
                        value={profileData.name}
                        onChange={handleChange}
                        style={{ outline: 'none', boxShadow: 'none' }}
                      />
                    </div>
                    <div className="form-group mb-3 d-flex align-items-center">
                      <label htmlFor="phone" className="me-2" style={{ minWidth: '100px' }}>Téléphone:</label>
                      <input
                        type="text"
                        name="phone_number"
                        id="phone"
                        className="form-control"
                        placeholder="Entrez votre téléphone"
                        value={profileData.phone_number}
                        onChange={handleChange}
                        style={{ outline: 'none', boxShadow: 'none' }}
                      />
                    </div>
                    <div className="form-group mb-4 d-flex align-items-center">
                      <label htmlFor="address" className="me-2" style={{ minWidth: '100px' }}>Adresse:</label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        className="form-control"
                        placeholder="Entrez l'adresse"
                        value={profileData.address}
                        onChange={handleChange}
                        style={{ outline: 'none', boxShadow: 'none' }}
                      />
                    </div>
                    <button type="submit" className="btn w-100" style={{ backgroundColor: 'rgba(234, 106, 8, 1)', color: 'white' }}>
                      Enregistrer mon profil
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoCompte;
