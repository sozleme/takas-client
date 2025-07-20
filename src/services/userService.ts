import axios from 'axios';

const API_URL = 'http://localhost:3000/api/user';

export const marketingEmails = async (data: { allow: boolean }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No authentication token found. Please log in.');
    }

    return await axios.post(`${API_URL}/marketing`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
};
