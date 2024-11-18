import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  const userRole = localStorage.getItem('role'); // Récupère le rôle de l'utilisateur

  if (userRole !== 'admin') {
    // Rediriger vers une page si l'utilisateur n'est pas admin
    return <Navigate to="/not-authorized" />;
  }

  return children; // Affiche la page si l'utilisateur est admin
};

export default ProtectedAdminRoute;
