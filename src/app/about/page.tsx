import { Box, Container, Typography, Paper, alpha, useTheme } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

export default function AboutPage() {
    const stats = [
        { value: '5000+', label: 'Happy Customers' },
        { value: '50+', label: 'Product Categories' },
        { value: '4.9★', label: 'Average Rating' },
        { value: '24/7', label: 'Customer Support' },
    ];

    const values = [
        {
            title: 'Quality First',
            description: 'We source only the best products from trusted manufacturers worldwide',
        },
        {
            title: 'Customer Satisfaction',
            description: 'Your happiness is our priority. We go above and beyond to ensure satisfaction',
        },
        {
            title: 'Innovation',
            description: 'Staying ahead with the latest tech trends and cutting-edge products',
        },
        {
            title: 'Affordability',
            description: 'Premium products at competitive prices, making tech accessible to all',
        },
    ];

    return (
        <Box>
            {/* Hero Section */}
            <Box
                sx={{
                    background: 'linear-gradient(135deg, rgba(107, 186, 236, 0.1) 0%, rgba(250, 251, 252, 1) 100%)',
                    py: 8,
                    textAlign: 'center',
                }}
            >
                <Container maxWidth="lg">
                    <Typography variant="h2" sx={{ mb: 2, fontWeight: 700 }}>
                        About FutureHome Electronics
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
                        Empowering your digital lifestyle with premium electronics and smart home solutions since 2020
                    </Typography>
                </Container>
            </Box>

            {/* Story Section */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Box sx={{ mb: 8 }}>
                    <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
                        Our Story
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
                        FutureHome Electronics was founded with a simple mission: to make cutting-edge technology accessible
                        to everyone. What started as a small online store has grown into a trusted destination for tech enthusiasts,
                        gamers, smart home advocates, and anyone looking to enhance their digital lifestyle.
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                        We carefully curate our product selection, partnering with leading brands and innovative manufacturers
                        to bring you the latest and greatest in gaming gear, smart home devices, audio equipment, power solutions,
                        and essential tech accessories. Every product we offer is tested and verified to meet our high standards
                        of quality and performance.
                    </Typography>
                </Box>

                {/* Stats */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                        gap: 3,
                        mb: 8,
                    }}
                >
                    {stats.map((stat, index) => (
                        <Paper
                            key={index}
                            sx={{
                                p: 4,
                                textAlign: 'center',
                                background: 'linear-gradient(135deg, rgba(107, 186, 236, 0.05) 0%, rgba(61, 143, 199, 0.05) 100%)',
                            }}
                        >
                            <Typography variant="h3" color="primary" sx={{ fontWeight: 700, mb: 1 }}>
                                {stat.value}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {stat.label}
                            </Typography>
                        </Paper>
                    ))}
                </Box>

                {/* Values */}
                <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
                    Our Values
                </Typography>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                        gap: 3,
                    }}
                >
                    {values.map((value, index) => (
                        <Paper key={index} sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                                <CheckCircle color="primary" sx={{ mt: 0.5 }} />
                                <Box>
                                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                                        {value.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {value.description}
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    ))}
                </Box>
            </Container>
        </Box>
    );
}
