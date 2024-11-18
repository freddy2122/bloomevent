import React from 'react';


function Events() {
  return (
    <div className="container">
      {/* Header */}
      <header className="d-flex justify-content-between align-items-center py-3">
        <h1>Paramètres du compte</h1>
        
      </header>

      
      <div className="row">
     
        <aside className="col-md-3">
          
        </aside>

        {/* Formulaire pour changer l'e-mail */}
        <div className="col-md-6">
          <h2>Changer l'e-mail</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="currentEmail" className="form-label">E-mail actuel :</label>
              <input type="email" className="form-control" id="currentEmail" value="divers@dflgroupe.com" readOnly />
            </div>

            <div className="mb-3">
              <label htmlFor="newEmail" className="form-label">Nouveau e-mail :</label>
              <input type="email" className="form-control" id="newEmail" placeholder="Entrer le nouveau e-mail" />
            </div>

            <div className="mb-3">
              <label htmlFor="confirmEmail" className="form-label">Confirmer l’e-mail :</label>
              <input type="email" className="form-control" id="confirmEmail" placeholder="Entrer encore le nouveau e-mail" />
            </div>

            <button type="submit" className="btn btn-primary">Enregistrer le nouvel e-mail</button>
          </form>
        </div>
      </div>

      
    </div>
  );
}

export default Events;
