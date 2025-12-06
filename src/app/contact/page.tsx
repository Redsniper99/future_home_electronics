'use client';

import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Paper,
    Alert,
} from '@mui/material';
import { Email, Phone, LocationOn, Send } from '@mui/icons-material';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate form submission
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const contactInfo = [
        {
            icon: Email,
            title: 'Email',
            value: 'info@futurehome.com',
            link: 'mailto:info@futurehome.com',
        },
        {
            icon: Phone,
            title: 'Phone',
            value: '+94 11 234 5678',
            link: 'tel:+94112345678',
        },
        {
            icon: LocationOn,
            title: 'Address',
            value: '123 Tech Street, Colombo 03, Sri Lanka',
        },
    ];

    return (
        <Box sx={{ py: 4 }}>
            <Container maxWidth="lg">
                <Typography variant="h3" sx={{ mb: 4, fontWeight: 700, textAlign: 'center' }}>
                    Get in Touch
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 6, textAlign: 'center', maxWidth: 600, mx: 'auto' }}>
                    Have a question or need assistance? We're here to help! Fill out the form below or reach out to us directly.
                </Typography>

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
                    {/* Contact Form */}
                    <Paper sx={{ p: 4 }}>
                        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                            Send us a Message
                        </Typography>
                        {submitted && (
                            <Alert severity="success" sx={{ mb: 3 }}>
                                Thank you for your message! We'll get back to you soon.
                            </Alert>
                        )}
                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Message"
                                name="message"
                                multiline
                                rows={6}
                                value={formData.message}
                                onChange={handleChange}
                                required
                                sx={{ mb: 3 }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                fullWidth
                                endIcon={<Send />}
                            >
                                Send Message
                            </Button>
                        </Box>
                    </Paper>

                    {/* Contact Info */}
                    <Box>
                        <Paper sx={{ p: 4, mb: 3 }}>
                            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                                Contact Information
                            </Typography>
                            {contactInfo.map((info, index) => {
                                const Icon = info.icon;
                                return (
                                    <Box key={index} sx={{ display: 'flex', gap: 2, mb: 3 }}>
                                        <Icon color="primary" sx={{ fontSize: 28 }} />
                                        <Box>
                                            <Typography variant="subtitle2" color="text.secondary">
                                                {info.title}
                                            </Typography>
                                            {info.link ? (
                                                <Typography
                                                    component="a"
                                                    href={info.link}
                                                    sx={{
                                                        color: 'text.primary',
                                                        textDecoration: 'none',
                                                        '&:hover': { color: 'primary.main' },
                                                    }}
                                                >
                                                    {info.value}
                                                </Typography>
                                            ) : (
                                                <Typography>{info.value}</Typography>
                                            )}
                                        </Box>
                                    </Box>
                                );
                            })}
                        </Paper>

                        <Paper sx={{ p: 4 }}>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                Business Hours
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2">Monday - Friday:</Typography>
                                <Typography variant="body2" fontWeight={600}>
                                    9:00 AM - 6:00 PM
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2">Saturday:</Typography>
                                <Typography variant="body2" fontWeight={600}>
                                    10:00 AM - 4:00 PM
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2">Sunday:</Typography>
                                <Typography variant="body2" fontWeight={600}>
                                    Closed
                                </Typography>
                            </Box>
                        </Paper>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
