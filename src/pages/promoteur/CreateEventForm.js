import React, { useState, useEffect } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import 'react-datepicker/dist/react-datepicker.css';
import API_URL from '../config/api';
import ticket from '../../assets/images/ticket.png';
import free from '../../assets/images/Freeicon.png';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaPlus } from 'react-icons/fa';


const CreateEventForm = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [tickets, setTickets] = useState([{ name: '', price: '', type: '', quantity: '' }]);
    const [isFreeEvent, setIsFreeEvent] = useState(0);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        place: '',
        location: '',
        address: '',
        start_date: '',
        end_date: '',
        start_time: '',
        end_time: '',
        is_free: 0,
        total_tickets: '',
        is_online: false,
        event_category_ids: [],
       
    });
    const handleEventType = (type) => {
        // Modifiez isFreeEvent en fonction du type d'événement sélectionné
        if (type === 'payant') {
            setIsFreeEvent(1); // Événement payant
        } else {
            setIsFreeEvent(0); // Événement gratuit
        }
    };

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handlePreviousStep = () => {
        setStep(step - 1);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };
    const handleTicketChange = (index, e) => {
        const { name, value } = e.target;
        const newTickets = [...tickets];
        newTickets[index][name] = value;
        setTickets(newTickets);
    };
    const addTicketField = () => {
        setTickets([...tickets, { name: '', price: '', type: '', quantity: '' }]);
    };
    const handleCategoryChange = (e) => {
        const selectedCategories = Array.from(e.target.selectedOptions, option => option.value);
        setFormData({
            ...formData,
            event_category_ids: selectedCategories, // Met à jour le tableau des catégories
        });
    };
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${API_URL}/api/categories_event`);
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des catégories.');
                }
                const data = await response.json();
                setCategories(data); // Mettez à jour l'état avec les catégories récupérées
            } catch (error) {
                console.error('Erreur:', error);
                // Affichez un message d'erreur à l'utilisateur si nécessaire
            }
        };

        fetchCategories(); // Appel de la fonction pour récupérer les catégories
    }, []); // L'effet s'exécute une seule fois au chargement du composant




    // Nouvelle fonction handleFileChange pour gérer le changement d'image vedette
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({
            ...formData,
            [name]: files[0], // On garde seulement le premier fichier
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title) {
            alert("Le titre ne peut pas être vide.");
            return;
        }

        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key === 'event_category_ids') {
                formData.event_category_ids.forEach((id) => {
                    data.append('event_category_ids[]', id);
                });
            } else {
                data.append(key, formData[key]);
            }
        });

        const is_free = isFreeEvent === 1 ? 1 : 0; // 1 pour payant, 0 pour gratuit

        data.append('is_free', is_free); // Ajout direct de is_free
        if (tickets.length > 0) {
            tickets.forEach((ticket, index) => {
                data.append(`tickets[${index}][name]`, ticket.name);
                data.append(`tickets[${index}][price]`, ticket.price);
                data.append(`tickets[${index}][type]`, ticket.type);
                data.append(`tickets[${index}][quantity]`, ticket.quantity);
            });
        }

        // Affichez toutes les paires clé-valeur dans FormData
        for (const [key, value] of data.entries()) {
            console.log(`${key}: ${value}`);
        }

        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token is missing');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/organizer/store_event`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: data,
            });

            if (!response.ok) {
                throw new Error('Une erreur s\'est produite lors de la soumission du formulaire.');
            }

            const result = await response.json();
            console.log(result);
            toast.success('Événement créé avec succès !');
            setTimeout(() => {
                navigate('/promoteur/info-compte'); // Remplacez '/dashboard' par le chemin de votre tableau de bord
            }, 2000);
            // Réinitialisez le formulaire ou redirigez l'utilisateur
        } catch (error) {
            console.error('Erreur:', error);
            // Affichez un message d'erreur à l'utilisateur
        }
    };






    return (
        <>
            <Header />

            {/* Step Wizard */}
            <div className="container progress-bar-container">
                <div className="step-wrapper">
                    <div className={`step ${step >= 1 ? 'active' : ''}`}>
                        <div className="step-number">1</div>
                        <div className="step-label">Editer</div>
                    </div>
                    <div className={`step-line ${step > 1 ? 'completed' : ''}`}></div>
                    <div className={`step ${step >= 2 ? 'active' : ''}`}>
                        <div className="step-number">2</div>
                        <div className="step-label">Banière</div>
                    </div>
                    <div className={`step-line ${step > 2 ? 'completed' : ''}`}></div>
                    <div className={`step ${step >= 3 ? 'active' : ''}`}>
                        <div className="step-number">3</div>
                        <div className="step-label">Billetterie</div>
                    </div>
                    <div className={`step-line ${step > 3 ? 'completed' : ''}`}></div>
                    <div className={`step ${step >= 4 ? 'active' : ''}`}>
                        <div className="step-number">4</div>
                        <div className="step-label">Revoir</div>
                    </div>
                </div>
            </div>

            <div className="container">

                <form onSubmit={handleSubmit}>
                    {step === 1 && (
                        <div>
                            <h2 style={{ color: 'rgba(45, 44, 60, 1)' }}>Détails de l'événement</h2>
                            <div className="row mb-3">
                                <div className="col-md-6 ps-1">
                                    <label htmlFor="title" className="form-label">Titre de l'événement</label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        className="form-control"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="Enter event name"
                                        required
                                        style={{ outline: 'none', boxShadow: 'none', height: '50px' }}
                                    />
                                </div>
                                <div className="col-md-6 ps-1">
                                    <label htmlFor="eventCategory" className="form-label">Catégorie d'événement:</label>
                                    <select
                                        className="form-select"
                                        id="eventCategory"
                                        name="eventCategory"
                                        value={formData.eventCategory}
                                        onChange={handleCategoryChange}
                                        required
                                        style={{ outline: 'none', boxShadow: 'none', height: '50px' }}
                                    >
                                        <option value="">Please select one</option>
                                        {categories.map(category => (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <h2 style={{ color: 'rgba(45, 44, 60, 1)' }}>Date et heure</h2>

                            <div className="form-group row mb-4">
                                <div className="col-md-3">
                                    <label className="form-label">Date de début :</label>
                                    <input
                                        type="date"
                                        id="start_date"
                                        name="start_date"
                                        className="form-control"
                                        value={formData.start_date}
                                        onChange={handleChange}
                                        required
                                        style={{ outline: 'none', boxShadow: 'none', height: '50px' }}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label">Date de fin :</label>
                                    <input
                                        type="date"
                                        id="end_date"
                                        name="end_date"
                                        className="form-control"
                                        value={formData.end_date}
                                        onChange={handleChange}
                                        required
                                        style={{ outline: 'none', boxShadow: 'none', height: '50px' }}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label">Heure de début :</label>
                                    <input
                                        type="time"
                                        id="start_time"
                                        name="start_time"
                                        className="form-control"
                                        value={formData.start_time}
                                        onChange={handleChange}
                                        required
                                        style={{ outline: 'none', boxShadow: 'none', height: '50px' }}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label">Heure de fin :</label>
                                    <input
                                        type="time"
                                        id="end_time"
                                        name="end_time"
                                        className="form-control"
                                        value={formData.end_time}
                                        onChange={handleChange}
                                        required
                                        style={{ outline: 'none', boxShadow: 'none', height: '50px' }}
                                    />
                                </div>
                            </div>
                            <h2 style={{ color: 'rgba(45, 44, 60, 1)' }}>Emplacement</h2>
                            <div className="row mb-3">

                                <div className="col-md-4 ps-1">
                                    <label htmlFor="location" className="form-label">Où aura lieu votre événement ?</label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        className="form-control"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="Enter event location"
                                        required
                                        style={{ outline: 'none', boxShadow: 'none', height: '50px' }}
                                    />
                                </div>
                                <div className="col-md-4 ps-1">
                                    <label htmlFor="addresse" className="form-label">Addresse</label>
                                    <input
                                        type="text"
                                        id="adress"
                                        name="address"
                                        className="form-control"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Enter event addresse"
                                        required
                                        style={{ outline: 'none', boxShadow: 'none', height: '50px' }}
                                    />
                                </div>
                                <div className="col-md-4 ps-1">
                                    <label htmlFor="place" className="form-label">Place</label>
                                    <input
                                        type="text"
                                        id="place"
                                        name="place"
                                        className="form-control"
                                        value={formData.place}
                                        onChange={handleChange}
                                        placeholder="Enter event place"
                                        required
                                        style={{ outline: 'none', boxShadow: 'none', height: '50px' }}
                                    />
                                </div>
                            </div>
                            <h2 style={{ color: 'rgba(45, 44, 60, 1)' }}>Informations Complémentaires</h2>
                            <div className="row mb-3">
                                <div className="col-md-12 ps-1">
                                    <label htmlFor="description" className="form-label">Description de l'événement</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        className="form-control"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Décrivez ce qui est spécial à propos de votre événement et d'autres détails importants."
                                        required
                                        style={{ outline: 'none', boxShadow: 'none', height: '100px', resize: 'vertical' }}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="row mb-5">
                                <div className="col-md-8"></div>
                                <div className="col-md-4 text-end">
                                    <button
                                        type="button"
                                        className="btn w-100"
                                        style={{ backgroundColor: 'rgba(234, 106, 8, 1)', color: 'white' }}
                                        onClick={handleNextStep}
                                    >
                                        Enregistrer et continuer
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}


                    {step === 2 && (
                        <div>
                            <div className="form-group row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="image1" className="form-label">Image Vedette</label>
                                    <input
                                        type="file"
                                        id="image1"
                                        name="image1"
                                        className="form-control"
                                        onChange={handleFileChange} // Assurez-vous que cette fonction gère le changement de fichier
                                        required
                                        style={{ outline: 'none', boxShadow: 'none', height: '50px' }}
                                    />
                                    <p>
                                        L’image vedette doit mesurer au moins 1 170 pixels de largeur sur 504 pixels de hauteur. Formats de fichiers valides : JPG, GIF, PNG.
                                    </p>
                                </div>
                            </div>

                            <div className="row mb-5">
                                <div className="col-md-4"></div>
                                <div className="col-md-8 text-end">
                                    <button
                                        type="button"
                                        className="btn me-3"
                                        onClick={handlePreviousStep}
                                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', color: 'black' }}
                                    >
                                        Revenir à Modifier l'événement
                                    </button>
                                    <button
                                        type="button"
                                        className="btn"
                                        style={{ backgroundColor: 'rgba(234, 106, 8, 1)', color: 'white' }}
                                        onClick={handleNextStep}
                                    >
                                        Enregistrer et continuer
                                    </button>

                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div>
                            <h3 className="text-center mb-5" style={{ color: 'rgba(45, 44, 60, 1)' }}>
                                Quel type d’événement organisez-vous ?
                            </h3>
                            <div className="form-group row mb-3">
                                <div className="col-md-2 mb-3"></div>
                                <div className="col-md-4 col-6 mb-3">
                                    <div
                                        className="card"
                                        style={{ backgroundColor: 'rgba(246, 251, 255, 1)', cursor: 'pointer' }}
                                        onClick={() => handleEventType('payant')}
                                    >
                                        <div className="card-body">
                                            <h5 className="card-title text-center">
                                                <img src={ticket} height="50" width="50" alt="Ticket" />
                                            </h5>
                                            <h6 className="card-subtitle mb-2 text-muted text-center">Événement payant</h6>
                                            <p className="card-text text-center">Mon événement nécessite des billets d'entrée</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-6 mb-3">
                                    <div
                                        className="card"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleEventType('gratuit')}
                                    >
                                        <div className="card-body">
                                            <h5 className="card-title text-center">
                                                <img src={free} height="50" width="50" alt="Gratuit" />
                                            </h5>
                                            <h6 className="card-subtitle mb-2 text-muted text-center">Événement gratuit</h6>
                                            <p className="card-text text-center">J'organise un événement gratuit</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-2 mb-3"></div>
                            </div>
                            {isFreeEvent && ( // N'affichez les billets que si l'événement est payant
                                <div className="form-group row mb-3">
                                    <h3 className="text-center mb-5" style={{ color: 'rgba(45, 44, 60, 1)' }}>
                                        Quels billets vendez-vous ?
                                    </h3>
                                    {tickets.map((ticket, index) => (
                                        <div className="row mb-3" key={index}>
                                            <div className="col-md-3 mb-3">
                                                <label htmlFor={`eventName-${index}`} className="form-label">Nom du billet</label>
                                                <input
                                                    type="text"
                                                    id={`eventName-${index}`}
                                                    name="name"
                                                    className="form-control"
                                                    value={ticket.name}
                                                    onChange={(e) => handleTicketChange(index, e)}
                                                    placeholder="VIP..."
                                                    required
                                                    style={{ outline: 'none', boxShadow: 'none', height: '50px' }}
                                                />
                                            </div>
                                            <div className="col-md-3 mb-3">
                                                <label htmlFor={`eventPrice-${index}`} className="form-label">Prix du billet (€)</label>
                                                <input
                                                    type="number"
                                                    id={`eventPrice-${index}`}
                                                    name="price"
                                                    className="form-control"
                                                    value={ticket.price}
                                                    onChange={(e) => handleTicketChange(index, e)}
                                                    placeholder="FCFA..."
                                                    required
                                                    style={{ outline: 'none', boxShadow: 'none', height: '50px' }}
                                                />
                                            </div>
                                            <div className="col-md-2 mb-3">
                                                <label htmlFor={`eventType-${index}`} className="form-label">Type de billet</label>
                                                <input
                                                    type="text"
                                                    id={`eventType-${index}`}
                                                    name="type"
                                                    className="form-control"
                                                    value={ticket.type}
                                                    onChange={(e) => handleTicketChange(index, e)}
                                                    placeholder="Type..."
                                                    required
                                                    style={{ outline: 'none', boxShadow: 'none', height: '50px' }}
                                                />
                                            </div>
                                            <div className="col-md-2 mb-3">
                                                <label htmlFor={`eventQuantity-${index}`} className="form-label">Quantité</label>
                                                <input
                                                    type="number"
                                                    id={`eventQuantity-${index}`}
                                                    name="quantity"
                                                    className="form-control"
                                                    value={ticket.quantity}
                                                    onChange={(e) => handleTicketChange(index, e)}
                                                    placeholder="Quantité..."
                                                    required
                                                    style={{ outline: 'none', boxShadow: 'none', height: '50px' }}
                                                />
                                            </div>
                                            <div className="col-md-2 d-flex align-items-center">
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary"
                                                    onClick={addTicketField}
                                                    style={{ height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                >
                                                    <FaPlus />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="row mb-5">
                                <div className="col-md-4"></div>
                                <div className="col-md-8 text-end">
                                    <button
                                        type="button"
                                        className="btn me-3"
                                        onClick={handlePreviousStep}
                                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', color: 'black' }}
                                    >
                                        Revenir à Modifier l'événement
                                    </button>
                                    <button
                                        type="button"
                                        className="btn"
                                        style={{ backgroundColor: 'rgba(234, 106, 8, 1)', color: 'white' }}
                                        onClick={handleNextStep}
                                    >
                                        Enregistrer et continuer
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div>
                            <h4>On y est presque ! Vérifiez que tout est correct.</h4>
                            <div className="container mt-4">
                                <div className="rounded">
                                    <div className="col-md-12 px-0">
                                        <img src={formData.image1} style={{ width: '100%', height: '300px' }} alt="Event banner" className="banner-img img-fluid" />
                                        <div className="row mb-4 mt-2 d-flex justify-content-between">
                                            <div className="col-md-6 col-6">
                                                <h2 style={{ color: 'rgba(33, 51, 97, 1)' }}>{formData.title}</h2>
                                            </div>
                                            <div className="col-md-6 col-6 text-end">

                                            </div>
                                        </div>

                                        <div className="row mb-4 mt-2 d-flex justify-content-between">
                                            <div className="col-md-6 col-6">
                                                <h4 style={{ color: 'rgba(33, 51, 97, 1)' }}>Date et Heure</h4>
                                                <p><i className="fa-regular fa-calendar"></i> Du {formData.start_date} au {formData.end_date} </p>
                                                <p><i className="fa-regular fa-clock"></i> De {formData.start_time} à {formData.end_time}</p>
                                            </div>

                                        </div>

                                        <div className="row mb-4 mt-2 d-flex justify-content-between">
                                            <div className="col-md-6 p-4">
                                                <h2 style={{ color: 'rgba(33, 51, 97, 1)' }}>Emplacement</h2>
                                                <p><i className="fa-solid fa-location-dot"></i> {formData.location},{formData.address},{formData.place}</p>
                                            </div>
                                            <div className="col-md-6 text-end"></div>
                                        </div>


                                    </div>
                                </div>

                                <div className="row mt-4">
                                    <div className="col">
                                        <h5>Description de l'événement</h5>
                                        <p>
                                            {formData.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="row mb-5">
                                    <div className="col-md-4"></div>
                                    <div className="col-md-8 text-end">
                                        <button type="button" className="btn" onClick={handlePreviousStep}>
                                            Revenir à Modifier l'événement
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn"
                                            style={{ backgroundColor: 'rgba(234, 106, 8, 1)', color: 'white' }}
                                        >
                                            Publier l’évènement
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}


                </form>
            </div>

            <div className='container-fluid' style={{ background: 'rgba(0, 0, 0, 1)' }}>
                <Footer />
            </div>
        </>
    );
};

export default CreateEventForm;
