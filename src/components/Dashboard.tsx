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
                    title="Asus Computer"
                    description={'Asus Computer description text'}
                    category={'Electronics'}
                    distance={'1 km'}
                    images={multipleImages}
                    height={240}
                    width={180}
                    isFavorite={true}
                    onClick={() => handleCardClick('Beautiful Landscapes')}
                />
                <ListingCard
                    title="Asus Computer"
                    description={'Asus Computer description text'}
                    category={'Electronics'}
                    distance={'1 km'}
                    images={multipleImages}
                    height={240}
                    width={180}
                    isFavorite={true}
                    onClick={() => handleCardClick('Beautiful Landscapes')}
                />
                <ListingCard
                    title="Asus Computer"
                    description={'Asus Computer description text'}
                    category={'Electronics'}
                    distance={'1 km'}
                    images={multipleImages}
                    height={240}
                    width={180}
                    isFavorite={true}
                    onClick={() => handleCardClick('Beautiful Landscapes')}
                />
                <ListingCard
                    title="Asus Computer"
                    description={'Asus Computer description text'}
                    category={'Electronics'}
                    distance={'1 km'}
                    images={multipleImages}
                    height={240}
                    width={180}
                    isFavorite={true}
                    onClick={() => handleCardClick('Beautiful Landscapes')}
                />
                <ListingCard
                    title="Asus Computer"
                    description={'Asus Computer description text'}
                    category={'Electronics'}
                    distance={'1 km'}
                    images={multipleImages}
                    height={240}
                    width={180}
                    isFavorite={true}
                    onClick={() => handleCardClick('Beautiful Landscapes')}
                />
                <ListingCard
                    title="Asus Computer"
                    description={'Asus Computer description text'}
                    category={'Electronics'}
                    distance={'1 km'}
                    images={multipleImages}
                    height={240}
                    width={180}
                    isFavorite={true}
                    onClick={() => handleCardClick('Beautiful Landscapes')}
                />
                <ListingCard
                    title="Asus Computer"
                    description={'Asus Computer description text'}
                    category={'Electronics'}
                    distance={'1 km'}
                    images={multipleImages}
                    height={240}
                    width={180}
                    isFavorite={true}
                    onClick={() => handleCardClick('Beautiful Landscapes')}
                />
            </Grid>
        </Box>
        </DashboardLayout>
    );
};

export default Dashboard;