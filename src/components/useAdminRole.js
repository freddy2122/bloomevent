import { useEffect, useState } from 'react';
import API_URL from '../pages/config/api';

const useAdminRole = () => {
    const [role, setRole] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchAdminRole = async () => {
            if (!token) {
                console.error('Token is missing');
                return;
            }

            try {
                const response = await fetch(`${API_URL}/api/admin/get_my_profil`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    console.error('HTTP error', response.status);
                    throw new Error(`Erreur ${response.status} : ${response.statusText}`);
                }

                const data = await response.json();
                setRole(data.user.role);
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchAdminRole();
    }, [token]);

    return role;
};

export default useAdminRole;
