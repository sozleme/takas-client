import React, {useEffect, useState} from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Divider,
    FormControlLabel,
    Checkbox,
    Grid,
    Paper,
} from '@mui/material';
import DashboardLayout from './DashboardLayout';
import {changePassword} from "../services/authService";
import {useSnackbar} from "notistack";
import {marketingEmails} from "../services/userService";
import {getUserInfo, saveUserInfo} from "../services/userInfoService";

const Profile: React.FC = () => {
    const { enqueueSnackbar } = useSnackbar();

    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        birthDate: '',
        address: '',
        postalCode: '',
        city: '',
        country: '',
        phone: '',
    });

    const [passwordInfo, setPasswordInfo] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [marketingConsent, setMarketingConsent] = useState(true);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await getUserInfo();
                if (response.status === 200) {
                    const data = response.data;
                    setUserInfo({
                        firstName: data.fistName,
                        lastName: data.lastName,
                        birthDate: data.birthdate?.substring(0, 10),
                        address: data.address,
                        postalCode: data.postalCode,
                        city: data.city,
                        country: data.country?.name || '',
                        phone: '',
                    });
                    setMarketingConsent(data.allowMarketingEmails);
                }
            } catch (err: any) {
                enqueueSnackbar("Kullanıcı bilgileri alınamadı", { variant: 'error' });
            }
        };

        fetchUserInfo().then();
    }, []);

    const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordInfo({ ...passwordInfo, [e.target.name]: e.target.value });
    };

    const handleDeleteAccount = () => {
            // TODO: Call delete API
            alert("Account deleted.");
    };

    const handleChangePassword = async () => {
        try {
            const response = await changePassword({
                oldPassword: passwordInfo.currentPassword,
                newPassword: passwordInfo.newPassword,
            });

            if (response.status === 200) {
                enqueueSnackbar(response.data.message, {variant: 'success'});
                setPasswordInfo({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                });
            }
        } catch (err : any) {
            enqueueSnackbar(err?.response?.data?.message || err.message || 'Unexpected error.', { variant: 'error' });
        }
    };

    const handleMarketingEmails = async (isChecked: boolean) => {
        setMarketingConsent(isChecked);
        try {
            const response = await marketingEmails({
                allow: isChecked,
            });
            if (response.status === 200) {
                enqueueSnackbar(response.data.message, {variant: 'success'});
            }
        } catch (err : any) {
            enqueueSnackbar(err?.response?.data?.message || err.message || 'Unexpected error.', { variant: 'error' });
        }
    }

    const handleSaveUserInfo = async () => {
        try {
            const response = await saveUserInfo({
                fistName: userInfo.firstName,
                lastName: userInfo.lastName,
                birthdate: userInfo.birthDate,
                address: userInfo.address,
                postalCode: parseInt(userInfo.postalCode),
                city: userInfo.city,
                countryId: 1, // Henüz countryId manuel, backend'den mapping gerekebilir
                allowMarketingEmails: marketingConsent,
            });

            if (response.status === 200) {
                enqueueSnackbar("User information saved successfully.", { variant: 'success' });
            }
        } catch (err: any) {
            enqueueSnackbar(err?.response?.data?.message || err.message || 'Unexpected error.', { variant: 'error' });
        }
    };

    return (
        <DashboardLayout>
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
                Profile
            </Typography>

            <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom>User Information</Typography>
                <Grid container spacing={2}>
                        <TextField
                            label="First Name"
                            name="firstName"
                            value={userInfo.firstName}
                            onChange={handleUserInfoChange}
                            fullWidth
                            size={"small"}
                        />
                        <TextField
                            label="Last Name"
                            name="lastName"
                            value={userInfo.lastName}
                            onChange={handleUserInfoChange}
                            fullWidth
                            size={"small"}
                        />
                        <TextField
                            label="Birthdate"
                            name="birthDate"
                            type="date"
                            value={userInfo.birthDate}
                            onChange={handleUserInfoChange}
                            fullWidth
                            slotProps={{
                                inputLabel: {
                                    shrink: true
                                }
                            }}
                            size={"small"}
                        />
                        <TextField
                            label="Full Address"
                            name="address"
                            value={userInfo.address}
                            onChange={handleUserInfoChange}
                            fullWidth
                            size={"small"}
                        />
                        <TextField
                            label="Postal Code"
                            name="postalCode"
                            value={userInfo.postalCode}
                            onChange={handleUserInfoChange}
                            fullWidth
                            size={"small"}
                        />
                        <TextField
                            label="City"
                            name="city"
                            value={userInfo.city}
                            onChange={handleUserInfoChange}
                            fullWidth
                            size={"small"}
                        />
                        <TextField
                            label="Country"
                            name="country"
                            value={userInfo.country}
                            onChange={handleUserInfoChange}
                            fullWidth
                            size={"small"}
                        />
                        <TextField
                            label="Mobile Phone"
                            name="phone"
                            value={userInfo.phone}
                            onChange={handleUserInfoChange}
                            fullWidth
                            size={"small"}
                        />
                </Grid>
                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" onClick={handleSaveUserInfo}>Save</Button>
                </Box>
            </Paper>

            <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom>Change Password</Typography>
                <Grid container spacing={2}>
                        <TextField
                            label="Current Password"
                            name="currentPassword"
                            type="password"
                            value={passwordInfo.currentPassword}
                            onChange={handlePasswordChange}
                            fullWidth
                            size={"small"}
                        />
                        <TextField
                            label="New Password"
                            name="newPassword"
                            type="password"
                            value={passwordInfo.newPassword}
                            onChange={handlePasswordChange}
                            fullWidth
                            size={"small"}
                        />
                        <TextField
                            label="Confirm New Password"
                            name="confirmPassword"
                            type="password"
                            value={passwordInfo.confirmPassword}
                            onChange={handlePasswordChange}
                            fullWidth
                            size={"small"}
                        />
                </Grid>
                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleChangePassword}>Change Password</Button>
                </Box>
            </Paper>

            <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>Manage Membership</Typography>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={marketingConsent}
                            onChange={(e) => handleMarketingEmails(e.target.checked)}
                        />
                    }
                    label="Allow marketing emails"
                />
                <Divider sx={{ my: 2 }} />
                <Button
                    variant="outlined"
                    color="error"
                    onClick={handleDeleteAccount}
                >
                    Delete My Account and All Data
                </Button>
            </Paper>
        </Box>
        </DashboardLayout>
    );
};

export default Profile;