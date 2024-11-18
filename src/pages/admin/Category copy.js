import React, { useState, useEffect } from 'react';
import Footer from '../../components/Footer';
import SideBar from '../../components/SideBar';
import Header from '../../components/Header';
import API_URL from '../config/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Category = () => {
  const [showModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [totalCategories, setTotalCategories] = useState(0);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [editCategoryImage, setEditCategoryImage] = useState(null);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  const fetchCategories = async () => {
    const token = localStorage.getItem('token');
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
      setCategories(data.categories);
      setTotalCategories(data.total);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories(); // Appel à fetchCategories lors du montage du composant
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', categoryName);
    if (categoryImage) {
      formData.append('picture', categoryImage);
    }

    const token = localStorage.getItem('token');

    fetch(`${API_URL}/api/admin/store_category_event`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la soumission de la catégorie');
        }
        return response.json();
      })
      .then(data => {
        console.log('Réponse de l\'API:', data);
        setCategoryName('');
        setCategoryImage(null);
        setShowModal(false);
        fetchCategories(); // Re-fetch categories after adding a new one
        toast.success('Catégorie ajoutée avec succès !'); // Afficher un toast de succès
      })
      .catch(error => {
        console.error('Erreur lors de la soumission:', error);
        toast.error('Erreur lors de l\'ajout de la catégorie.'); // Afficher un toast d'erreur
      });
  };

  const handleDelete = (categoryId) => {
    const token = localStorage.getItem('token');
    fetch(`${API_URL}/api/admin/delete_category_event/${categoryId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la suppression de la catégorie');
        }
        fetchCategories(); // Re-fetch categories after deletion
        toast.success('Catégorie supprimée avec succès !'); // Afficher le toast après suppression
      })
      .catch(error => {
        console.error('Erreur lors de la suppression:', error);
        toast.error('Erreur lors de la suppression de la catégorie.'); // Afficher un toast d'erreur
      });
  };

  const confirmDelete = (categoryId) => {
    setCategoryToDelete(categoryId); // Définir la catégorie à supprimer
    // Afficher la modal de confirmation
    const deleteModal = new window.bootstrap.Modal(document.getElementById('deleteConfirmationModal'));
    deleteModal.show();
  };

  const handleConfirmDelete = () => {
    if (categoryToDelete) {
      handleDelete(categoryToDelete); // Supprimer la catégorie confirmée
      setCategoryToDelete(null); // Réinitialiser la catégorie à supprimer
    }
    const deleteModal = window.bootstrap.Modal.getInstance(document.getElementById('deleteConfirmationModal'));
    if (deleteModal) {
      deleteModal.hide();
    }
  };

  const handleEditClick = (category) => {
    setCategoryToEdit(category);
    setEditCategoryName(category.name);
    setEditCategoryImage(null); // Reset image for editing
    setShowEditModal(true); // Open the edit modal
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', editCategoryName);

    // Toujours envoyer l'image, même si elle n'a pas été modifiée
    if (editCategoryImage) {
      formData.append('picture', editCategoryImage);
    } else if (categoryToEdit.picture) {
      // Envoi de l'image actuelle seulement si aucune nouvelle image n'a été choisie
      formData.append('picture', categoryToEdit.picture);
    }

    const token = localStorage.getItem('token');

    fetch(`${API_URL}/api/admin/update_category_event/${categoryToEdit.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la mise à jour de la catégorie');
        }
        return response.json();
      })
      .then(data => {
        console.log('Réponse de l\'API:', data); // Vérifiez la réponse
        setShowEditModal(false); // Fermer le modal
        fetchCategories(); // Recharger les catégories après mise à jour
        toast.success('Catégorie mise à jour avec succès !'); // Afficher un toast de succès
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour:', error);
        toast.error('Erreur lors de la mise à jour de la catégorie.'); // Afficher un toast d'erreur
      });
  };

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <SideBar />
          <div className="col-md-8 mb-5 p-4">
            <h2 className="mb-4" style={{ color: '#1a4a7c' }}>Liste des catégories ({totalCategories})</h2>

            <button
              className="btn mb-3"
              onClick={() => setShowModal(true)}
              style={{ backgroundColor: 'rgba(33, 51, 97, 1)', color: 'white' }}
            >
              Ajouter une catégorie
            </button>

            <div className="row">
              <div className="col-md-12">
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead>
                      <tr>
                        <th>Nom Catégorie</th>
                        <th>Image</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map(category => (
                        <tr key={category.id}>
                          <td>{category.name}</td>
                          <td>
                            <img src={`${API_URL}/${category.picture}`} alt={category.name} style={{ width: '40px' }} />
                          </td>
                          <td>
                            <i className="fas fa-trash-alt text-danger me-3" title="Supprimer" style={{ cursor: 'pointer' }} onClick={() => confirmDelete(category.id)}></i>
                            <i className="fas fa-edit text-primary" title="Modifier" style={{ cursor: 'pointer' }} onClick={() => handleEditClick(category)}></i>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="modal fade" id="deleteConfirmationModal" tabIndex="-1" aria-labelledby="deleteConfirmationModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="deleteConfirmationModalLabel">
                            <i className="fas fa-exclamation-triangle text-danger" title="Supprimer" style={{ fontSize: '1.5rem' }}></i>
                            Confirmation de suppression
                          </h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          Êtes-vous sûr de vouloir supprimer cette catégorie ?
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                          <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>Confirmer</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal pour ajouter une catégorie */}
            <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="addCategoryModalLabel" aria-hidden={!showModal}>
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="addCategoryModalLabel">Ajouter une catégorie</h5>
                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                      <div className="mb-3">
                        <label htmlFor="categoryName" className="form-label">Nom de la catégorie</label>
                        <input
                          type="text"
                          className="form-control"
                          id="categoryName"
                          value={categoryName}
                          onChange={(e) => setCategoryName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="categoryImage" className="form-label">Image de la catégorie</label>
                        <input
                          type="file"
                          className="form-control"
                          id="categoryImage"
                          accept="image/*"
                          onChange={(e) => setCategoryImage(e.target.files[0])}
                        />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Annuler</button>
                      <button type="submit" className="btn" style={{ backgroundColor: 'rgba(33, 51, 97, 1)', color: 'white' }}>Ajouter</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Modal pour modifier une catégorie */}
            <div className={`modal fade ${showEditModal ? 'show' : ''}`} style={{ display: showEditModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="editCategoryModalLabel" aria-hidden={!showEditModal}>
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="editCategoryModalLabel">Modifier la catégorie</h5>
                    <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
                  </div>
                  <form onSubmit={handleEditSubmit}>
                    <div className="modal-body">
                      <div className="mb-3">
                        <label htmlFor="editCategoryName" className="form-label">Nom de la catégorie</label>
                        <input
                          type="text"
                          className="form-control"
                          id="editCategoryName"
                          value={editCategoryName}
                          onChange={(e) => setEditCategoryName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="editCategoryImage" className="form-label">Image de la catégorie (optionnel)</label>
                        <input
                          type="file"
                          className="form-control"
                          id="editCategoryImage"
                          accept="image/*"
                          onChange={(e) => setEditCategoryImage(e.target.files[0])}
                        />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Annuler</button>
                      <button type="submit" className="btn" style={{ backgroundColor: 'rgba(33, 51, 97, 1)', color: 'white' }}>Modifier</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <ToastContainer />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Category;
