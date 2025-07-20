import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth';

export const login = async (data: { email: string; password: string }) => {
    const response = await axios.post(`${API_URL}/login`, data);
    if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response;
};

export const register = (data: { email: string; password: string }) => {
    return axios.post(`${API_URL}/register`, data);
};

export const changePassword = async (data: { oldPassword: string, newPassword: string }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No authentication token found. Please log in.');
    }

    return await axios.post(`${API_URL}/change-password`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

