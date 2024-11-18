import React, { useRef, useState, useEffect } from 'react';
import API_URL from '../config/api';
import EnteteDash from '../../components/EnteteDash';
import DashHeader from '../../components/DashHeader';

const ProfilePromoteur = () => {
  const fileInputRef = useRef(null);
  const [profileData, setProfileData] = useState({
    name: '',
    phone_number: '',
    address: '',
    website: '',
    organisation_name: '',
    country: '',
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
        const response = await fetch(`${API_URL}/api/organizer/get_my_profil`, {
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
          website: data.user.website,
          organisation_name: data.user.organisation_name,
          country: data.user.country,
          profile_picture: data.user.profile_picture,
        });
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchProfileData();
  }, []);

  const handleCameraClick = () => {
    fileInputRef.current.click();
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
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setProfileData((prevData) => ({
        ...prevData,
        profile_picture: file
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
    formData.append('website', profileData.website);
    formData.append('organisation_name', profileData.organisation_name);
    formData.append('country', profileData.country);

    if (profileData.profile_picture && profileData.profile_picture instanceof File) {
      formData.append('profile_picture', profileData.profile_picture);
    }

    try {
      const response = await fetch(`${API_URL}/api/organizer/update_my_profil`, {
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

      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div class="container-scroller">

        <div class="horizontal-menu">
          <EnteteDash />
          <DashHeader />
        </div>
        <div className="container mt-3">
          <div className="row">
            <div className="col-md-1 "></div>
            <div className="col-md-10 ">
              <h2 className="mb-4" style={{ color: '#1a4a7c' }}>Informations sur le compte</h2>
              <div className="row">
                <div className="col-md-6">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <div className="position-relative d-inline-block">
                        <h4>Photo de profil</h4>
                        <img
                          src={imagePreview || "https://img.freepik.com/premium-photo/beautiful-african-american-young-woman-with-afro-large-hoop-earrings-stylish-coat-smiling_1048944-5827348.jpg?ga=GA1.1.2024749029.1707231351&semt=ais_hybrid"}
                          alt="Profile"
                          className="rounded-circle"
                          style={{ width: '150px', height: '150px' }}
                        />
                        <input
                          type="file"
                          ref={fileInputRef}
                          style={{ display: 'none' }}
                          onChange={handleFileChange}
                        />
                        <span
                          className="position-absolute bottom-0 end-0 p-2 bg-white rounded-circle"
                          style={{ fontSize: '15px', cursor: 'pointer' }}
                          onClick={handleCameraClick}
                        >
                          <i className="fa fa-camera"></i>
                        </span>
                      </div>
                    </div>

                    <h5 className="mb-4">Informations sur le profil</h5>
                    <div className="form-group mb-3 d-flex align-items-center">
                      <label htmlFor="name" className="me-2" style={{ minWidth: '100px' }}>Nom & Prénom:</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={profileData.name}
                        onChange={handleChange}
                        placeholder="Entrez le prénom"
                        style={{ outline: 'none', boxShadow: 'none' }}
                      />
                    </div>
                    <div className="form-group mb-3 d-flex align-items-center">
                      <label htmlFor="website" className="me-2" style={{ minWidth: '100px' }}>Site web:</label>
                      <input
                        type="text"
                        id="website"
                        name="website"
                        className="form-control"
                        value={profileData.website}
                        onChange={handleChange}
                        placeholder="Entrez le nom du site web"
                        style={{ outline: 'none', boxShadow: 'none' }}
                      />
                    </div>
                    <div className="form-group mb-3 d-flex align-items-center">
                      <label htmlFor="organisation_name" className="me-2" style={{ minWidth: '100px' }}>Entreprise:</label>
                      <input
                        type="text"
                        id="organisation_name"
                        name="organisation_name"
                        className="form-control"
                        value={profileData.organisation_name}
                        onChange={handleChange}
                        placeholder="Entrez le nom de l'entreprise"
                        style={{ outline: 'none', boxShadow: 'none' }}
                      />
                    </div>

                    <h5 className="mb-4">Coordonnées</h5>
                    <p className="mb-4">Ces informations sont privées et utilisées uniquement pour vous contacter pour l'achat de billets ou de prix.</p>

                    <div className="form-group mb-3 d-flex align-items-center">
                      <label htmlFor="phone_number" className="me-2" style={{ minWidth: '100px' }}>Téléphone:</label>
                      <input
                        type="text"
                        id="phone_number"
                        name="phone_number"
                        className="form-control"
                        value={profileData.phone_number}
                        onChange={handleChange}
                        placeholder="Entrez votre téléphone"
                        style={{ outline: 'none', boxShadow: 'none' }}
                      />
                    </div>
                    <div className="form-group mb-4 d-flex align-items-center">
                      <label htmlFor="address" className="me-2" style={{ minWidth: '100px' }}>Adresse:</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        className="form-control"
                        value={profileData.address}
                        onChange={handleChange}
                        placeholder="Entrez l'adresse"
                        style={{ outline: 'none', boxShadow: 'none' }}
                      />
                    </div>
                    <div className="form-group mb-4 d-flex align-items-center">
                      <label htmlFor="country" className="me-2" style={{ minWidth: '100px' }}>Pays:</label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        className="form-control"
                        value={profileData.country}
                        onChange={handleChange}
                        placeholder="Entrez l'adresse"
                        style={{ outline: 'none', boxShadow: 'none' }}
                      />
                    </div>

                    <button type="submit" className="btn w-100" style={{ backgroundColor: 'rgba(234, 106, 8, 1)', color: 'white' }}>
                      Enregistrer mon profil
                    </button>
                  </form>
                  {successMessage && (
                    <div className="alert alert-success mt-3">{successMessage}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-1 "></div>
          </div>
        </div>
      </div>

    </>
  );
};

export default ProfilePromoteur;
