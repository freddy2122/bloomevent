import React, { useState, useEffect } from 'react';
import API_URL from '../pages/config/api';
import NProgress from 'nprogress';
const Categorie = () => {
  const [categories, setCategories] = useState([]);

  // Fonction pour récupérer les catégories depuis l'API
  const fetchCategories = async () => {
    const token = localStorage.getItem('token');
    NProgress.start();
    try {
      const response = await fetch(`${API_URL}/api/categories_event`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data); // Stocker les catégories dans le state
    } catch (error) {
      console.error('Error fetching categories:', error);
    }finally {
        NProgress.done(); 
      }
  };

  // Appeler fetchCategories au chargement du composant
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className='container mt-5 text-center'> 
      <div 
        className="d-flex flex-row flex-nowrap overflow-auto" 
        style={{ whiteSpace: 'nowrap' }}  
      >
        {/* Boucle pour afficher les catégories */}
        {categories.map((categorie) => (
          <div className="col-lg-2 col-md-4 col-sm-6 mb-3" key={categorie.id} style={{ flex: '0 0 auto' }}>
            <img
              className="bd-placeholder-img rounded-circle"
              width="140"
              height="140"
              src={`${API_URL}/${categorie.picture}`} alt={categorie.name} 
              style={{ objectFit: 'cover' }}
            />
            <h6 className="fw-normal pt-3">{categorie.name}</h6> {/* Assurez-vous d'utiliser les bons champs */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categorie;
