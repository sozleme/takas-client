import React from 'react';
import DashboardLayout from './DashboardLayout';
import {Box, Grid} from '@mui/material';
import ListingCard from "./ListingCard";

const Dashboard : React.FC = () => {
    // Example data
    const multipleImages = [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
        'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400',
        'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400',
        'https://images.unsplash.com/photo-1528543606781-2f6e6857f318?w=400',
    ];

    const handleCardClick = (cardTitle: string) => {
        alert(`Clicked on ${cardTitle}`);
    };

    return (
        <DashboardLayout>
        <Box sx={{ p: 1 }}>
            <Grid container spacing={3} alignContent={'center'}>
                <ListingCard
                    title="Compact Gallery"
                    images={multipleImages}
                    height={100}
                    width={200}
                    isFavorite={true}
                    onClick={() => handleCardClick('Beautiful Landscapes')}
                />
                <ListingCard
                    title="Compact Gallery"
                    images={multipleImages}
                    height={100}
                    width={200}
                    isFavorite={false}
                />
                <ListingCard
                    title="Compact Gallery"
                    images={multipleImages}
                    height={100}
                    width={200}
                    isFavorite={true}
                />
                <ListingCard
                    title="Compact Gallery"
                    images={multipleImages}
                    height={100}
                    width={200}
                    isFavorite={false}
                />
                <ListingCard
                    title="Compact Gallery"
                    images={multipleImages}
                    height={100}
                    width={200}
                    isFavorite={true}
                />
            </Grid>
        </Box>
        </DashboardLayout>
    );
};

export default Dashboard;