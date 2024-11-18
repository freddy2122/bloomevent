import React from 'react';
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const TestimonialsCarousel = () => {
    const testimonials = [
        {
            id: 1,
            text: "Cette plateforme a transformé notre manière d'organiser des événements.",
            name: "Jean Dupont",
            role: "Organisateur, Festivités",
            image: "https://randomuser.me/api/portraits/men/1.jpg", // Image d'exemple
            companyLogo: "https://www.anthedesign.fr/wp-content/uploads/2015/01/alojob-logo-finale-e1422526125972.png",
            rating: 5
        },
        {
            id: 2,
            text: "Une expérience utilisateur incroyable, je recommande vivement !",
            name: "Marie Curie",
            role: "Directrice, Événements",
            image: "https://randomuser.me/api/portraits/women/1.jpg", // Image d'exemple
            companyLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd1ItbLR9_1kVT-hdH_4HAcEb_E8eHVBAJWQ&s",
            rating: 5
        },
        {
            id: 3,
            text: "Une expérience utilisateur incroyable, je recommande vivement !",
            name: "Nora Freddy Ezé",
            role: "Directrice, Événements",
            image: "https://randomuser.me/api/portraits/women/1.jpg", // Image d'exemple
            companyLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd1ItbLR9_1kVT-hdH_4HAcEb_E8eHVBAJWQ&s",
            rating: 5
        }
    ];

    return (
        <div className="container my-5">
            <h2 className="text-orange" style={{ color: '#EA6A08' }}>Témoignages clients</h2>
            <p>Découvrez ce que nos utilisateurs en pensent !</p>

            <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {testimonials.map((testimonial, index) => (
                        <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={testimonial.id}>
                            <div className="row justify-content-center text-center">
                                <div className="col-md-6">
                                    <div className="d-flex justify-content-center">
                                        <div>
                                            {/* Rating Stars */}
                                            <div className="d-flex justify-content-center mb-2">
                                                {[...Array(testimonial.rating)].map((_, i) => (
                                                    <FaStar key={i} color="#EA6A08" className="me-1" />
                                                ))}
                                            </div>
                                            {/* Testimonial Text */}
                                            <p>"{testimonial.text}"</p>
                                            {/* Testimonial Author */}
                                            <div className="d-flex align-items-center justify-content-center mt-3">
                                                <img src={testimonial.image} alt={testimonial.name} className="rounded-circle me-3" width="50" height="50" />
                                                <div className="text-start">
                                                    <h6 className="mb-0">{testimonial.name}</h6>
                                                    <p className="mb-0 text-muted">{testimonial.role}</p>
                                                </div>
                                                <img src={testimonial.companyLogo} alt="company logo" className="ms-3" width="80" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Carousel Controls */}
                <button className="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
                    <FaChevronLeft className="text-dark" />
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
                    <FaChevronRight className="text-dark" />
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
};

export default TestimonialsCarousel;
