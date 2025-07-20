import React from 'react';
import {Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography } from '@mui/material';
import { login } from '../services/authService';
import { useSnackbar } from 'notistack';

type LoginFormInputs = {
    email: string;
    password: string;
};

const Login: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const onSubmit = async (data: LoginFormInputs) => {
        try {
            const response = await login(data);
            if (response.status === 200) {
                enqueueSnackbar('Success!', {variant: 'success'});
                navigate('/dashboard');
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
            <Typography variant="h5" mb={3}>Login</Typography>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <TextField
                    label="Email"
                    fullWidth
                    margin="normal"
                    {...register('email',
                        {
                            required: 'Required',
                            pattern: { value: /^\S+@\S+$/i, message: 'Please enter a valid email address' }
                        })}
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ''}
                />

                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    {...register('password', { required: 'Required' })}
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message : ''}
                />

                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                    Login
                </Button>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    Don't have an account?{' '}
                    <Link
                        to={"/register"}
                        style={{
                            color: '#667eea',
                            textDecoration: 'none',
                            fontWeight: 600,
                        }}
                    >
                        Sign up here
                    </Link>
                </Typography>
            </form>
        </Box>
    );
};

export default Login;
