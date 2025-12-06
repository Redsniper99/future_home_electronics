'use client';

import React from 'react';
import { Box, Container, Typography, Link as MuiLink, IconButton, Divider } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn, YouTube } from '@mui/icons-material';
import Link from 'next/link';

const footerLinks = {
    shop: [
        { label: 'Gaming Gear', href: '/products?category=Gaming' },
        { label: 'Smart Home', href: '/products?category=Smart%20Home' },
        { label: 'Power & Plugs', href: '/products?category=Power%20%26%20Plugs' },
        { label: 'Audio', href: '/products?category=Audio' },
        { label: 'Accessories', href: '/products?category=Accessories' },
    ],
    support: [
        { label: 'Help Center', href: '/contact' },
        { label: 'Shipping Info', href: '/contact' },
        { label: 'Returns', href: '/contact' },
        { label: 'Warranty', href: '/contact' },
        { label: 'Track Order', href: '/contact' },
    ],
    company: [
        { label: 'About Us', href: '/about' },
        { label: 'Careers', href: '/about' },
        { label: 'Press', href: '/about' },
        { label: 'Privacy Policy', href: '/about' },
        { label: 'Terms of Service', href: '/about' },
    ],
};

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <Box
            component="footer"
            sx={{
                background: 'linear-gradient(180deg, #FAFBFC 0%, #F5F7FA 100%)',
                borderTop: '1px solid',
                borderColor: 'divider',
                pt: { xs: 4, md: 8 },
                pb: { xs: 2, md: 4 },
                mt: 'auto',
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: '4fr 2fr 3fr 3fr' },
                        gap: { xs: 3, md: 4 },
                    }}
                >
                    {/* Brand Section */}
                    <Box>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 700,
                                fontSize: { xs: '1.25rem', md: '1.5rem' },
                                background: 'linear-gradient(135deg, #6BBAEC 0%, #3D8FC7 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: { xs: 1, md: 2 },
                            }}
                        >
                            FutureHome Electronics
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                mb: { xs: 2, md: 3 },
                                lineHeight: 1.7,
                                fontSize: { xs: '0.8rem', md: '0.875rem' },
                            }}
                        >
                            Your trusted destination for premium tech accessories, smart home devices, and cutting-edge electronics. Empowering your digital lifestyle with quality products and exceptional service.
                        </Typography>
                        {/* Social Media */}
                        <Box sx={{ display: 'flex', gap: { xs: 0.75, md: 1 } }}>
                            <IconButton
                                size="small"
                                sx={{
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'primary.dark',
                                        transform: 'translateY(-2px)',
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <Facebook fontSize="small" />
                            </IconButton>
                            <IconButton
                                size="small"
                                sx={{
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'primary.dark',
                                        transform: 'translateY(-2px)',
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <Twitter fontSize="small" />
                            </IconButton>
                            <IconButton
                                size="small"
                                sx={{
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'primary.dark',
                                        transform: 'translateY(-2px)',
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <Instagram fontSize="small" />
                            </IconButton>
                            <IconButton
                                size="small"
                                sx={{
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'primary.dark',
                                        transform: 'translateY(-2px)',
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <LinkedIn fontSize="small" />
                            </IconButton>
                            <IconButton
                                size="small"
                                sx={{
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'primary.dark',
                                        transform: 'translateY(-2px)',
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <YouTube fontSize="small" />
                            </IconButton>
                        </Box>
                    </Box>

                    {/* Shop Links */}
                    <Box>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                mb: { xs: 1.5, md: 2 },
                                fontSize: { xs: '0.95rem', md: '1.1rem' },
                            }}
                        >
                            Shop
                        </Typography>
                        {footerLinks.shop.map((link) => (
                            <MuiLink
                                key={link.label}
                                component={Link}
                                href={link.href}
                                underline="none"
                                sx={{
                                    display: 'block',
                                    mb: { xs: 1, md: 1.5 },
                                    color: 'text.secondary',
                                    fontSize: { xs: '0.8rem', md: '0.9rem' },
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        color: 'primary.main',
                                        transform: 'translateX(4px)',
                                    },
                                }}
                            >
                                {link.label}
                            </MuiLink>
                        ))}
                    </Box>

                    {/* Support Links */}
                    <Box>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                mb: { xs: 1.5, md: 2 },
                                fontSize: { xs: '0.95rem', md: '1.1rem' },
                            }}
                        >
                            Support
                        </Typography>
                        {footerLinks.support.map((link) => (
                            <MuiLink
                                key={link.label}
                                component={Link}
                                href={link.href}
                                underline="none"
                                sx={{
                                    display: 'block',
                                    mb: { xs: 1, md: 1.5 },
                                    color: 'text.secondary',
                                    fontSize: { xs: '0.8rem', md: '0.9rem' },
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        color: 'primary.main',
                                        transform: 'translateX(4px)',
                                    },
                                }}
                            >
                                {link.label}
                            </MuiLink>
                        ))}
                    </Box>

                    {/* Company Links */}
                    <Box>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                mb: { xs: 1.5, md: 2 },
                                fontSize: { xs: '0.95rem', md: '1.1rem' },
                            }}
                        >
                            Company
                        </Typography>
                        {footerLinks.company.map((link) => (
                            <MuiLink
                                key={link.label}
                                component={Link}
                                href={link.href}
                                underline="none"
                                sx={{
                                    display: 'block',
                                    mb: { xs: 1, md: 1.5 },
                                    color: 'text.secondary',
                                    fontSize: { xs: '0.8rem', md: '0.9rem' },
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        color: 'primary.main',
                                        transform: 'translateX(4px)',
                                    },
                                }}
                            >
                                {link.label}
                            </MuiLink>
                        ))}
                    </Box>
                </Box>

                <Divider sx={{ my: { xs: 3, md: 4 } }} />

                {/* Bottom Bar */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: { xs: 'center', md: 'space-between' },
                    alignItems: 'center',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: { xs: 1, md: 2 },
                    textAlign: { xs: 'center', md: 'left' },
                }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                        © {currentYear} FutureHome Electronics. All rights reserved.
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                        Email: info@futurehome.com | Phone: +94 11 234 5678
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}
