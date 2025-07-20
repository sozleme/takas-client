import React from 'react';
import DashboardLayout from './DashboardLayout';
import { Typography } from '@mui/material';

const Dashboard = () => {
    return (
        <DashboardLayout>
            <Typography variant="h4" gutterBottom>
                Ana Sayfa
            </Typography>
            <Typography variant="body1">
                Burası ana içerik alanı. Buraya Takas uygulamanın kullanıcı arayüzünü ve bileşenlerini ekleyebilirsin.
            </Typography>
        </DashboardLayout>
    );
};

export default Dashboard;
