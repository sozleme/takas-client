import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    IconButton,
    Fade,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface ListingCardProps {
    title?: string;
    description?: string;
    images: string[];
    height?: number;
    width?: string | number;
    isFavorite: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
}

const ListingCard: React.FC<ListingCardProps> = ({
                                                       title,
                                                       description,
                                                       images,
                                                       height = 200,
                                                       width = '100%',
                                                       isFavorite = false,
                                                       children,
                                                       onClick,
                                                   }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handlePrevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    const handleNextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
        );
    };

    const handleDotClick = (index: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex(index);
    };

    if (!images || images.length === 0) {
        return (
            <Card
                sx={{ width, cursor: onClick ? 'pointer' : 'default' }}
                onClick={onClick}
            >
                <Box
                    sx={{
                        height,
                        backgroundColor: 'grey.200',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="body2" color="text.secondary">
                        No Image Available
                    </Typography>
                </Box>
                {(title || description || children) && (
                    <CardContent>
                        {title && (
                            <Typography variant="h6" component="h2" gutterBottom>
                                {title}
                            </Typography>
                        )}
                        {description && (
                            <Typography variant="body2" color="text.secondary">
                                {description}
                            </Typography>
                        )}
                        {children}
                    </CardContent>
                )}
            </Card>
        );
    }

    return (
        <Card
            sx={{ width, cursor: onClick ? 'pointer' : 'default' }}
            onClick={onClick}
        >
            <Box sx={{ position: 'relative', height }}>
                <Fade in={true} timeout={300} key={currentImageIndex}>
                    <CardMedia
                        component="img"
                        height={height}
                        image={images[currentImageIndex]}
                        alt={`${title || 'Image'} ${currentImageIndex + 1}`}
                        sx={{
                            objectFit: 'cover',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                        }}
                    />
                </Fade>

                {/* Navigation arrows - only show if more than 1 image */}
                {images.length > 1 && (
                    <>
                        <IconButton
                            sx={{
                                position: 'absolute',
                                left: 8,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                },
                                width: 25,
                                height: 25,
                            }}
                            onClick={handlePrevImage}
                        >
                            <ChevronLeft />
                        </IconButton>

                        <IconButton
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                },
                                width: 25,
                                height: 25,
                            }}
                            onClick={handleNextImage}
                        >
                            <ChevronRight />
                        </IconButton>

                        {/* Dots indicator */}
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 12,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                display: 'flex',
                                gap: 1,
                            }}
                        >
                            {images.map((_, index) => (
                                <Box
                                    key={index}
                                    onClick={(e) => handleDotClick(index, e)}
                                    sx={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: '50%',
                                        backgroundColor:
                                            index === currentImageIndex
                                                ? 'white'
                                                : 'rgba(255, 255, 255, 0.5)',
                                        cursor: 'pointer',
                                        transition: 'backgroundColor 0.2s ease',
                                        '&:hover': {
                                            backgroundColor: 'white',
                                        },
                                    }}
                                />
                            ))}
                        </Box>

                        {/* Image counter */}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 12,
                                right: 12,
                                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                color: 'white',
                                padding: '4px 8px',
                                borderRadius: 1,
                                fontSize: '0.75rem',
                            }}
                        >
                            {currentImageIndex + 1} / {images.length}
                        </Box>
                    </>
                )}
            </Box>

            {/* Card content */}
            {(title || description || children) && (
                <CardContent>
                    {title && (
                        <Typography variant="h6" component="h2" gutterBottom>
                            {title}
                        </Typography>
                    )}
                    {description && (
                        <Typography variant="body2" color="text.secondary">
                            {description}
                        </Typography>
                    )}
                    {children}
                </CardContent>
            )}

            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                minHeight: 40,
                mt: 1
            }}>
                {
                    isFavorite ?
                        <FavoriteBorderIcon
                            sx={{ mt: 5, mr:1, mb: 1, color: 'red', cursor: 'pointer' }}
                            onClick={(e) => {
                                e.stopPropagation();
                                alert('Added as favorite!');
                            }}/> :
                        <FavoriteIcon
                            sx={{ mt: 5, mr:1, mb: 1, color: 'red', cursor: 'pointer' }}
                            onClick={(e) => {
                                e.stopPropagation();
                                alert('Removed from favorite!');
                            }}/>
                }

            </Box>
        </Card>
    );
};

export default ListingCard;