import React from 'react';

const OrderSummary = () => {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="fw-bold"> <i className="bi bi-arrow-left"></i> Récapitulatif de la commande</h5>
                        </div>
                        <div className="card-body">

                            <div className="mb-4 " style={{ color: '#213361' }}>
                                <div style={{ border: '1px solid #dee2e6', borderTop: '4px solid #213361', borderRadius: '8px', padding: '10px', backgroundColor: '#f8f9fa', width: '90%', margin: '0 auto' }}>
                                    <h6 className="fw-bold mb-2 text-center">Type de billet</h6>
                                    <p className="mb-1">Nom du participant</p>
                                    <div className="d-flex justify-content-between mb-2">
                                        <p className="mb-2">somename@server.com</p>
                                        <span className="badge" style={{ backgroundColor: '#213361', }}>5000 FCFA</span>
                                    </div>

                                </div>
                            </div>


                           <div className='border-bottom'>
                           <div className="d-flex justify-content-center mb-2">
                                <span>Sous-total :</span>
                                <span>5000 FCFA</span>
                            </div>
                            <div className="d-flex justify-content-center mb-3">
                                <span>Taxe :</span>
                                <span>100 FCFA</span>
                            </div>
                           </div>


                            <div className="d-flex justify-content-center mb-4 fw-bold">
                                <span>Total de la commande :</span>
                                <span className="text-success">5100 FCFA</span>
                            </div>


                            <button className="btn btn-success w-100">
                                Payez maintenant <i class="bi bi-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-2"></div>
            </div>

        </div>
    );
};

export default OrderSummary;