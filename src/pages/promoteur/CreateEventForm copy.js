import React, { useState } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import 'react-datepicker/dist/react-datepicker.css';
import ticket from '../../assets/images/ticket.png';
import tik from '../../assets/images/tik.png';
import Maps from '../../assets/images/Maps.png';
import free from '../../assets/images/Freeicon.png';
import { FaPlus } from 'react-icons/fa';

const CreateEventForm = () => {
    const [startDate, setStartDate] = useState(null);
    const [tickets, setTickets] = useState([{ name: '', price: '' }]);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        place: '',
        location: '',
        address: '',
        eventDate: '',
        start_date: '',
        end_date: '',
        start_time: '',
        end_time: '',
        is_free: false,
        total_tickets: '',
        is_online: false,
        eventCategory: '',
    });

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
        const newTickets = [...tickets];
        newTickets[index][e.target.name] = e.target.value;
        setTickets(newTickets);
    };
    const addTicketField = () => {
        setTickets([...tickets, { name: '', price: '' }]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
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
                                        onChange={handleChange}
                                        required
                                        style={{ outline: 'none', boxShadow: 'none', height: '50px' }}
                                    >
                                        <option value="">Please select one</option>
                                        <option value="concert">Concert</option>
                                        <option value="conference">Conférence</option>
                                        <option value="workshop">Atelier</option>
                                    </select>
                                </div>
                            </div>
                            <h2 style={{ color: 'rgba(45, 44, 60, 1)' }}>Date et heure</h2>
                            <div className="form-group row mb-4">
                                <label className="col-md-4 col-form-label">Type d'événement :</label>
                                <div className="col-md-4">
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            id="uniqueEvent"
                                            name="is_recurrent"
                                            value="false"
                                            checked={!formData.is_recurrent}
                                            onChange={() => setFormData({ ...formData, is_recurrent: false })}
                                            className="form-check-input"
                                            required
                                        />
                                        <label htmlFor="uniqueEvent" className="form-check-label">Événement unique</label>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            id="recurrentEvent"
                                            name="is_recurrent"
                                            value="true"
                                            checked={formData.is_recurrent}
                                            onChange={() => setFormData({ ...formData, is_recurrent: true })}
                                            className="form-check-input"
                                            required
                                        />
                                        <label htmlFor="recurrentEvent" className="form-check-label">Événement récurrent</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row mb-4">
                                <div className="col-md-4">
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
                                <div className="col-md-4">
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
                                <div className="col-md-4">
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
                                <div className="col-md-12 ps-1">
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
                                    <div className="card" style={{ backgroundColor: 'rgba(246, 251, 255, 1)', cursor: 'pointer' }} onClick={() => handleEventType('payant')}>
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
                                    <div className="card" style={{ cursor: 'pointer' }} onClick={() => handleEventType('gratuit')}>
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

                            <h3 className="text-center mb-5" style={{ color: 'rgba(45, 44, 60, 1)' }}>
                                Quels billets vendez-vous ?
                            </h3>
                            <div className="form-group row mb-3">
                                {tickets.map((ticket, index) => (
                                    <div className="row mb-3" key={index}>
                                        <div className="col-md-4 mb-3">
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
                                        <div className="col-md-4 mb-3">
                                            <label htmlFor={`eventPrice-${index}`} className="form-label">Prix du ticket</label>
                                            <input
                                                type="text"
                                                id={`eventPrice-${index}`}
                                                name="price"
                                                className="form-control"
                                                value={ticket.price}
                                                onChange={(e) => handleTicketChange(index, e)}
                                                placeholder="€..."
                                                required
                                                style={{ outline: 'none', boxShadow: 'none', height: '50px' }}
                                            />
                                        </div>
                                        <div className="col-md-4 d-flex align-items-center">
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
                                <div className=" rounded ">
                                    <div className="col-md-12 px-0">
                                        <img src="" style={{ width: '100%', height: '300px' }} alt="Event banner" classNameName="banner-img img-fluid" />
                                        <div className="row mb-4 mt-2    d-flex justify-content-between">
                                            <div className="col-md-6 col-6">
                                                <h2 style={{ color: 'rgba(33, 51, 97, 1)' }}></h2>
                                            </div>
                                            <div className="col-md-6 col-6 text-end">
                                                <h3>
                                                    <span>
                                                        <i className="fa-regular fa-star me-3" style={{ cursor: 'pointer' }}></i>
                                                        <i className="fa-solid fa-share-nodes" style={{ cursor: 'pointer' }}></i>
                                                    </span>
                                                </h3>
                                            </div>

                                        </div>
                                        <div className="row mb-4 mt-2    d-flex justify-content-between">
                                            <div className="col-md-6 col-6">
                                                <h4 style={{ color: 'rgba(33, 51, 97, 1)' }}>Date et Heure</h4>
                                                <p><i className="fa-regular fa-calendar"></i> </p>
                                                <p><i className="fa-regular fa-clock"></i> </p>
                                            </div>
                                            <div className="col-md-6 col-6 text-end">
                                                <button className="btn" style={{ backgroundColor: 'rgba(234, 106, 8, 1)', color: 'white' }}>
                                                    <img src={tik} height="20" width="20" alt="Ticket" /> Buy Tickets</button>

                                            </div>
                                        </div>

                                        <div className="row mb-4 mt-2    d-flex justify-content-between">
                                            <div className="col-md-6  p-4 ">
                                                <h2 style={{ color: 'rgba(33, 51, 97, 1)' }}>Emplacement</h2>
                                                <p><i className="fa-solid fa-location-dot"></i> Adresse</p>
                                                <img src={Maps} style={{ width: '100%', height: '250px' }} alt="Event banner" className="banner-img img-fluid" />
                                            </div>
                                            <div className="col-md-6  text-end">


                                            </div>
                                        </div>
                                        <div className="row mb-4 mt-2    d-flex justify-content-between">
                                            <div className="col-md-6  p-4 ">
                                                <h2 style={{ color: 'rgba(33, 51, 97, 1)' }}>Informations sur les billets</h2>
                                                <p> <img src={ticket} height="20" width="20" alt="Ticket" /> Type de billet: Prix/billet</p>


                                            </div>
                                            <div className="col-md-6  text-end">


                                            </div>
                                        </div>


                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col">
                                        <h5>Description de l'événement</h5>
                                        <p>
                                            Lorem ipsum dolor sit amet consectetur. Eget vulputate sociis sit urna sit aliquet. Vivamus facilisis diam libero dolor volutpat diam eu. Quis a id posuere etiam at enim vivamus. Urna nisi malesuada libero enim ornare in viverra. Nibh commodo quis tellus aliquet nibh tristique lobortis id. Consequat ultricies vulputate turpis neque viverra tempor nunc. Et amet massa tellus consequat mauris imperdiet tellus. Praesent risus magna nisl turpis egestas ultrices viverra pellentesque blandit. Rutrum consequat eu penatibus ipsum at.
                                        </p>
                                    </div>
                                </div>

                                <div className="row mb-5">
                                    <div className="col-md-4"></div>
                                    <div className="col-md-8  text-end">
                                        <button type="button" className="btn" onClick={handlePreviousStep}>
                                            Revenir à Modifier l'événement
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn "
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
