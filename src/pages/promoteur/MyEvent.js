import React, { useState, useEffect } from 'react';
import API_URL from '../config/api';
import EnteteDash from '../../components/EnteteDash';
import DashHeader from '../../components/DashHeader';

const MyEvent = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token is missing');
            return;
        }

        fetchEvents(token);
    }, []);

    const fetchEvents = (token) => {
        fetch(`${API_URL}/api/organizer/events`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                setEvents(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des événements:', error.message);
                setError(error.message);
                setLoading(false);
            });
    };

    const handleEdit = (event) => {
        setSelectedEvent(event);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleUpdate = (updatedEventData) => {
        const token = localStorage.getItem('token');
        fetch(`${API_URL}/api/organizer/update_event/${selectedEvent.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updatedEventData),
        })
            .then(response => response.json())
            .then(updatedEvent => {
                setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
                handleCloseModal();
            })
            .catch(error => console.error('Erreur lors de la mise à jour:', error));
    };

    return (
        <div className="container-scroller">
            <div className="horizontal-menu">
                <EnteteDash />
                <DashHeader />
            </div>
            <div className="container mt-5">
                <div className="row">
                    {events.map(event => (
                        <div className="col-sm-4 stretch-card grid-margin" key={event.id}>
                            <div className="card position-relative">
                                <span className={`badge position-absolute top-0 start-0 m-3 ${event.is_featured === 1 ? 'bg-success' : 'bg-warning'}`}>
                                    {event.is_featured === 1 ? 'Validé' : 'En attente'}
                                </span>
                                <div className="card-body p-0">
                                    <img className="img-fluid w-100" src={`${API_URL}/${event.image1_url}`} style={{ height: '250px' }} alt="" />
                                </div>
                                <div className="card-body px-3 text-dark">
                                    <div className="d-flex justify-content-between">
                                        <p className="text-muted font-13 mb-0">{event.title}</p>
                                    </div>
                                    <h5 className="font-weight-semibold"> {event.description} </h5>
                                    <div className="d-flex justify-content-between font-weight-semibold">
                                        <p className="mb-0">
                                            Date <br />
                                            <i className="fa-solid fa-calendar-days"></i> {event.start_date} / {event.end_date}
                                        </p>
                                    </div>
                                    <div className="pt-3 d-flex justify-content-between">
                                        <button
                                            className="btn btn-primary btn-sm mx-1"
                                            onClick={() => handleEdit(event)}
                                        >
                                            Modifier
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showModal && selectedEvent && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modifier l'événement</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    const updatedEventData = {
                                        title: e.target.title.value,
                                        description: e.target.description.value,
                                        place: e.target.place.value,
                                        location: e.target.location.value,
                                        address: e.target.address.value,
                                        date: e.target.date.value,
                                        start_date: e.target.start_date.value,
                                        end_date: e.target.end_date.value,
                                        start_time: e.target.start_time.value,
                                        end_time: e.target.end_time.value,
                                        is_free: e.target.is_free.checked,
                                        is_online: e.target.is_online.checked,
                                    };
                                    handleUpdate(updatedEventData);
                                }}>
                                    <div className="mb-3 col-md-6">

                                        <div className="mb-3">
                                            <label htmlFor="title" className="form-label">Titre</label>
                                            <input type="text" className="form-control" id="title" defaultValue={selectedEvent.title} required />
                                        </div>
                                    </div>
                                    <div className="mb-3 col-md-6">

                                        <div className="mb-3">
                                            <label htmlFor="description" className="form-label">Description</label>
                                            <textarea className="form-control" id="description" rows="3" defaultValue={selectedEvent.description}></textarea>
                                        </div>
                                    </div>
                                    {/* Ajout des autres champs */}
                                    <div className="mb-3">
                                        <label htmlFor="place" className="form-label">Lieu</label>
                                        <input type="text" className="form-control" id="place" defaultValue={selectedEvent.place} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="location" className="form-label">Emplacement</label>
                                        <input type="text" className="form-control" id="location" defaultValue={selectedEvent.location} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label">Adresse</label>
                                        <input type="text" className="form-control" id="address" defaultValue={selectedEvent.address} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="date" className="form-label">Date</label>
                                        <input type="date" className="form-control" id="date" defaultValue={selectedEvent.date} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="start_date" className="form-label">Date de début</label>
                                        <input type="date" className="form-control" id="start_date" defaultValue={selectedEvent.start_date} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="end_date" className="form-label">Date de fin</label>
                                        <input type="date" className="form-control" id="end_date" defaultValue={selectedEvent.end_date} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="start_time" className="form-label">Heure de début</label>
                                        <input type="time" className="form-control" id="start_time" defaultValue={selectedEvent.start_time} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="end_time" className="form-label">Heure de fin</label>
                                        <input type="time" className="form-control" id="end_time" defaultValue={selectedEvent.end_time} />
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="is_free" defaultChecked={selectedEvent.is_free} />
                                        <label className="form-check-label" htmlFor="is_free">Gratuit</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="is_online" defaultChecked={selectedEvent.is_online} />
                                        <label className="form-check-label" htmlFor="is_online">En ligne</label>
                                    </div>
                                    <button type="submit" className="btn btn-primary mt-3">Mettre à jour</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyEvent;
