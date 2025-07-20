import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography } from '@mui/material';
import { register as registerUser } from '../services/authService';
import { useSnackbar } from 'notistack';

type RegisterFormInputs = {
    email: string;
    password: string;
};

const Register: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const onSubmit = async (data: RegisterFormInputs) => {
        try {
            const response = await registerUser(data);
            if (response.status === 201) {
                enqueueSnackbar(response?.data?.message, {variant: 'warning'});
                navigate('/login');
            }
        } catch (err : any) {
            enqueueSnackbar(err?.response?.data?.message || err.message || 'Unexpected error.', { variant: 'error' });
        }
    };

    return (
        <Box
            sx={{
                maxWidth: 400,
                mx: 'auto',
                mt: 5,
                p: 3,
                border: '1px solid #ddd',
                borderRadius: 2,
            }}
        >
            <Typography variant="h5" mb={3}>Register</Typography>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <TextField
                    label="Email"
                    fullWidth
                    margin="normal"
                    {...register('email', {
                        required: 'Required',
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Please enter a valid email address',
                        },
                    })}
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ''}
                />

                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    {...register('password', {
                        required: 'Required',
                        minLength: {
                            value: 6,
                            message: 'At least 6 character',
                        },
                    })}
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message : ''}
                />

                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                    Register
                </Button>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    Already have an account?{' '}
                    <Link
                        to={"/login"}
                        style={{
                            color: '#667eea',
                            textDecoration: 'none',
                            fontWeight: 600,
                        }}
                    >
                        Login here
                    </Link>
                </Typography>
            </form>
        </Box>
    );
};

export default Register;
