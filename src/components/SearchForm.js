import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
    const [searchParams, setSearchParams] = useState({
        title: '',
        location: '', // Ajoutez d'autres champs ici si nécessaire
    });
    

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams((prevParams) => ({ ...prevParams, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Construire la query string pour les paramètres de recherche
        const query = new URLSearchParams(searchParams).toString();

        // Rediriger vers la page des résultats de recherche avec les paramètres
        navigate(`/result-page?${query}`);
    };



    return (
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <form onSubmit={handleSubmit} className="d-flex w-100 justify-content-center" role="search" style={{ maxWidth: '900px' }}>
                
                <div className="input-group" style={{ width: '75%' }}>
                    <input
                        className="form-control"
                        type="search"
                        placeholder="Rechercher des événements, des catégories, des emplacements ..."
                        name="title"
                        value={searchParams.title}
                        onChange={handleInputChange}
                        style={{ borderRadius: '0px', outline: 'none', boxShadow: 'none' }}
                    />
                    <button className="input-group-text bg-white" type="submit" style={{ borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }}>
                        <i className="fa fa-search"></i>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SearchForm;
