import axios from 'axios';

const API_URL = 'http://localhost:3000/api/country';

export const getCountries = () => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No authentication token found. Please log in.');
    }
    return axios.get(`${API_URL}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
};