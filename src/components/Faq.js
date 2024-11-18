import React from 'react';
import { Link } from 'react-router-dom';

const Faq = () => {
    const faqData = [
        {
            id: 1,
            question: 'Comment puis-je acheter un billet pour un événement ?',
            answer: "Vous pouvez acheter un billet en ligne via notre site web en cliquant sur l'événement souhaité et en suivant les instructions d'achat."
        },
        {
            id: 2,
            question: "Quels modes de paiement acceptez-vous ?",
            answer: "Nous acceptons les paiements par carte bancaire, PayPal, et virement bancaire."
        },
        {
            id: 3,
            question: "Puis-je annuler ou modifier ma réservation ?",
            answer: "Les annulations ou modifications peuvent être effectuées jusqu'à 48 heures avant l'événement. Veuillez nous contacter pour plus de détails."
        },
        {
            id: 4,
            question: "Puis-je annuler ou modifier ma réservation ?",
            answer: "Les annulations ou modifications peuvent être effectuées jusqu'à 48 heures avant l'événement. Veuillez nous contacter pour plus de détails."
        },
        {
            id: 5,
            question: "Puis-je annuler ou modifier ma réservation ?",
            answer: "Les annulations ou modifications peuvent être effectuées jusqu'à 48 heures avant l'événement. Veuillez nous contacter pour plus de détails."
        },
    ];

    return (
        <div className="row mt-5">
            <div className='col-md-4 mb-3'>
                <h1 style={{ color: '#EA6A08' }}>FAQ</h1>
                <p>Trouvez ici les réponses aux questions les plus fréquentes concernant nos événements et services.</p>
                <Link to="/contact"
                    className='btn'
                    style={{
                       
                        border: 'solid #EA6A08 1px',
                        textAlign: 'center',
                        width: '200px',
                        borderRadius: '0px'
                    }}
                >
                    Contact 
                </Link>
            </div>

            <div className='col-md-8'>
                <div className="accordion" id="accordionFaq" style={{ border: 'none' }}>
                    {faqData.map((faq) => (
                        <div className="accordion-item" key={faq.id}>
                            <h2 className="accordion-header" id={`heading${faq.id}`}>
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${faq.id}`} aria-expanded="false" aria-controls={`collapse${faq.id}`}  style={{  outline: 'none', boxShadow: 'none'}}>
                                    {faq.question}
                                </button>
                            </h2>
                            <div id={`collapse${faq.id}`} className="accordion-collapse collapse" aria-labelledby={`heading${faq.id}`} data-bs-parent="#accordionFaq">
                                <div className="accordion-body">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Faq;
