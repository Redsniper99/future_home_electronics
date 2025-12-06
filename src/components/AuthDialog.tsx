'use client';

import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Tabs,
    Tab,
    Box,
    TextField,
    Button,
    Alert,
    IconButton,
    Typography,
    Divider,
} from '@mui/material';
import { Close } from '@mui/icons-material';

// Google Logo Component
const GoogleLogo = () => (
    <svg width="18" height="18" viewBox="0 0 48 48" style={{ marginRight: 8 }}>
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
);
import { useAuth } from '@/context/AuthContext';

interface AuthDialogProps {
    open: boolean;
    onClose: () => void;
}

export default function AuthDialog({ open, onClose }: AuthDialogProps) {
    const { signIn, signUp } = useAuth();
    const [tab, setTab] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Sign In Form State
    const [signInData, setSignInData] = useState({
        email: '',
        password: '',
    });

    // Sign Up Form State
    const [signUpData, setSignUpData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
        setError('');
        setSuccess('');
    };

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!signInData.email || !signInData.password) {
            setError('Please fill in all fields');
            return;
        }

        if (!validateEmail(signInData.email)) {
            setError('Please enter a valid email address');
            return;
        }

        setLoading(true);

        const result = await signIn(signInData.email, signInData.password);

        setLoading(false);

        if (result.success) {
            setSuccess('Signed in successfully!');
            setTimeout(() => {
                onClose();
                setSignInData({ email: '', password: '' });
                setSuccess('');
            }, 1000);
        } else {
            setError(result.error || 'Sign in failed');
        }
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!signUpData.name || !signUpData.email || !signUpData.password || !signUpData.confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (!validateEmail(signUpData.email)) {
            setError('Please enter a valid email address');
            return;
        }

        if (signUpData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        if (signUpData.password !== signUpData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        const result = await signUp(signUpData.name, signUpData.email, signUpData.password);

        setLoading(false);

        if (result.success) {
            setSuccess('Account created successfully!');
            setTimeout(() => {
                onClose();
                setSignUpData({ name: '', email: '', password: '', confirmPassword: '' });
                setSuccess('');
            }, 1000);
        } else {
            setError(result.error || 'Sign up failed');
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                },
            }}
        >
            <DialogTitle>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        Welcome to FutureHome
                    </Typography>
                    <IconButton onClick={onClose} size="small">
                        <Close />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent>
                <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 3 }}>
                    <Tab label="Sign In" sx={{ flex: 1, fontWeight: 600 }} />
                    <Tab label="Sign Up" sx={{ flex: 1, fontWeight: 600 }} />
                </Tabs>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
                        {error}
                    </Alert>
                )}

                {success && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        {success}
                    </Alert>
                )}

                {/* Sign In Tab */}
                {tab === 0 && (
                    <Box component="form" onSubmit={handleSignIn} sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            value={signInData.email}
                            onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                            sx={{ mb: 2 }}
                            autoFocus
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            value={signInData.password}
                            onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                            sx={{ mb: 3 }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                            disabled={loading}
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </Button>

                        <Divider sx={{ my: 3 }}>
                            <Typography variant="body2" color="text.secondary">
                                OR
                            </Typography>
                        </Divider>

                        <Button
                            variant="outlined"
                            fullWidth
                            size="large"
                            startIcon={<GoogleLogo />}
                            sx={{
                                borderColor: 'divider',
                                color: 'text.primary',
                                '&:hover': {
                                    borderColor: 'primary.main',
                                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                },
                            }}
                            onClick={() => {
                                setError('');
                                setSuccess('Google Sign-In will be implemented with OAuth');
                            }}
                        >
                            Continue with Google
                        </Button>
                    </Box>
                )}

                {/* Sign Up Tab */}
                {tab === 1 && (
                    <Box component="form" onSubmit={handleSignUp} sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            value={signUpData.name}
                            onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                            sx={{ mb: 2 }}
                            autoFocus
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            value={signUpData.email}
                            onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            value={signUpData.password}
                            onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Confirm Password"
                            type="password"
                            value={signUpData.confirmPassword}
                            onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                            sx={{ mb: 3 }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                            disabled={loading}
                        >
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </Button>

                        <Divider sx={{ my: 3 }}>
                            <Typography variant="body2" color="text.secondary">
                                OR
                            </Typography>
                        </Divider>

                        <Button
                            variant="outlined"
                            fullWidth
                            size="large"
                            startIcon={<GoogleLogo />}
                            sx={{
                                borderColor: 'divider',
                                color: 'text.primary',
                                '&:hover': {
                                    borderColor: 'primary.main',
                                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                },
                            }}
                            onClick={() => {
                                setError('');
                                setSuccess('Google Sign-Up will be implemented with OAuth');
                            }}
                        >
                            Sign up with Google
                        </Button>
                    </Box>
                )}
            </DialogContent>
        </Dialog>
    );
}
