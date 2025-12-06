'use client';

import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Badge,
    InputBase,
    useMediaQuery,
    useTheme,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    alpha,
} from '@mui/material';
import {
    ShoppingCart,
    Favorite,
    Search,
    Person,
    Menu as MenuIcon,
    Close,
} from '@mui/icons-material';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import CartDrawer from '@/components/CartDrawer';
import AuthDialog from '@/components/AuthDialog';
import UserMenu from '@/components/UserMenu';
import SearchDropdown from './SearchDropdown';
import CategoryDropdown from './CategoryDropdown';
import { Avatar } from '@mui/material';

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/products' },
    { label: 'Deals', href: '/products?filter=deals' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
];

export default function Header() {
    const theme = useTheme();
    // Removed useMediaQuery to fix hydration mismatch
    const { getCartCount } = useCart();
    const { wishlist } = useWishlist();
    const { user, isAuthenticated } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchFocused, setSearchFocused] = useState(false);
    const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
    const [authDialogOpen, setAuthDialogOpen] = useState(false);
    const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
        }
    };

    return (
        <>
            <AppBar
                position="sticky"
                elevation={0}
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    top: { xs: 16, md: 24 },
                    mt: { xs: 2, md: 3 },
                    mx: { xs: 2, md: 4 },
                    borderRadius: { xs: '10px', md: 4 },
                    width: 'auto',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
                    {/* Logo */}
                    <Link href="/" style={{ textDecoration: 'none' }}>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                fontWeight: 700,
                                background: 'linear-gradient(135deg, #6BBAEC 0%, #3D8FC7 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontSize: { xs: '1.1rem', md: '1.4rem' },
                                letterSpacing: '-0.02em',
                            }}
                        >
                            FutureHome Electronics
                        </Typography>
                    </Link>

                    {/* Desktop Navigation */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, alignItems: 'center' }}>
                        {navLinks.map((link) => (
                            <Box
                                key={link.href}
                                sx={{ position: 'relative' }}
                                onMouseEnter={() => link.label === 'Shop' && setCategoryDropdownOpen(true)}
                                onMouseLeave={() => link.label === 'Shop' && setCategoryDropdownOpen(false)}
                            >
                                <Link
                                    href={link.href}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <Typography
                                        sx={{
                                            color: 'text.primary',
                                            fontWeight: 500,
                                            fontSize: '0.95rem',
                                            transition: 'color 0.2s ease',
                                            '&:hover': {
                                                color: 'primary.main',
                                            },
                                        }}
                                    >
                                        {link.label}
                                    </Typography>
                                </Link>
                                {link.label === 'Shop' && (
                                    <CategoryDropdown
                                        open={categoryDropdownOpen}
                                        onClose={() => setCategoryDropdownOpen(false)}
                                    />
                                )}
                            </Box>
                        ))}
                    </Box>

                    {/* Right Section - Search & Icons */}
                    <Box sx={{ display: 'flex', gap: { xs: 0.5, md: 1 }, alignItems: 'center' }}>
                        {/* Search Bar - Desktop */}
                        <Box
                            component="form"
                            onSubmit={handleSearch}
                            sx={{
                                position: 'relative',
                                borderRadius: 2,
                                backgroundColor: alpha(theme.palette.primary.main, 0.08),
                                '&:hover': {
                                    backgroundColor: alpha(theme.palette.primary.main, 0.12),
                                },
                                ml: 2,
                                mr: 1,
                                width: 'auto',
                                display: { xs: 'none', md: 'block' },
                            }}
                        >
                            <Box
                                sx={{
                                    padding: theme.spacing(0, 2),
                                    height: '100%',
                                    position: 'absolute',
                                    pointerEvents: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Search sx={{ color: 'text.secondary', fontSize: 20 }} />
                            </Box>
                            <InputBase
                                placeholder="Search products…"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setSearchFocused(true)}
                                onBlur={() => setSearchFocused(false)}
                                sx={{
                                    color: 'black',
                                    '& .MuiInputBase-input': {
                                        padding: theme.spacing(1, 1, 1, 0),
                                        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                                        transition: theme.transitions.create('width'),
                                        width: '200px',
                                        '&:focus': {
                                            width: '280px',
                                        },
                                    },
                                }}
                            />

                            {/* Search Dropdown */}
                            <SearchDropdown
                                open={searchFocused}
                                searchQuery={searchQuery}
                                onClose={() => setSearchFocused(false)}
                                onSelect={(term) => {
                                    setSearchQuery(term);
                                    setSearchFocused(false);
                                    window.location.href = `/products?search=${encodeURIComponent(term)}`;
                                }}
                            />
                        </Box>

                        {/* Wishlist */}
                        <IconButton
                            color="primary"
                            component={Link}
                            href="/wishlist"
                            sx={{
                                '& .MuiSvgIcon-root': {
                                    fontSize: { xs: '1.25rem', md: '1.5rem' }
                                }
                            }}
                        >
                            <Badge badgeContent={wishlist.length} color="secondary">
                                <Favorite />
                            </Badge>
                        </IconButton>

                        {/* Cart */}
                        <IconButton
                            color="primary"
                            onClick={() => setCartDrawerOpen(true)}
                            sx={{
                                '& .MuiSvgIcon-root': {
                                    fontSize: { xs: '1.25rem', md: '1.5rem' }
                                }
                            }}
                        >
                            <Badge badgeContent={getCartCount()} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>

                        {/* User Icon / Avatar - Desktop */}
                        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                            {isAuthenticated && user ? (
                                <IconButton
                                    color="primary"
                                    onClick={(e) => setUserMenuAnchor(e.currentTarget)}
                                >
                                    <Avatar
                                        sx={{
                                            width: 32,
                                            height: 32,
                                            fontSize: '0.875rem',
                                            bgcolor: 'primary.main',
                                        }}
                                    >
                                        {user.name.charAt(0).toUpperCase()}
                                    </Avatar>
                                </IconButton>
                            ) : (
                                <IconButton
                                    color="primary"
                                    onClick={() => setAuthDialogOpen(true)}
                                >
                                    <Person />
                                </IconButton>
                            )}
                        </Box>

                        {/* Mobile Menu Button */}
                        <IconButton
                            color="primary"
                            onClick={() => setMobileMenuOpen(true)}
                            edge="end"
                            sx={{ display: { xs: 'inline-flex', md: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Toolbar>

                {/* Mobile Search Bar - Below Navbar */}
                <Box
                    component="form"
                    onSubmit={handleSearch}
                    sx={{
                        display: { xs: 'flex', md: 'none' },
                        px: 2,
                        pb: 1.5,
                        pt: 0,
                        alignItems: 'center',
                        gap: 1,
                    }}
                >
                    <Box
                        sx={{
                            flex: 1,
                            position: 'relative',
                            borderRadius: '5px',
                            backgroundColor: alpha(theme.palette.primary.main, 0.08),
                            '&:hover': {
                                backgroundColor: alpha(theme.palette.primary.main, 0.12),
                            },
                        }}
                    >
                        <Box
                            sx={{
                                padding: theme.spacing(0, 1.5),
                                height: '100%',
                                position: 'absolute',
                                pointerEvents: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Search sx={{ color: 'text.secondary', fontSize: 18 }} />
                        </Box>
                        <InputBase
                            placeholder="Search products…"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setSearchFocused(true)}
                            onBlur={() => setSearchFocused(false)}
                            sx={{
                                color: 'black',
                                width: '100%',
                                '& .MuiInputBase-input': {
                                    padding: theme.spacing(1, 1, 1, 0),
                                    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
                                    fontSize: '0.9rem',
                                },
                            }}
                        />

                        {/* Search Dropdown for Mobile */}
                        <SearchDropdown
                            open={searchFocused}
                            searchQuery={searchQuery}
                            onClose={() => setSearchFocused(false)}
                            onSelect={(term) => {
                                setSearchQuery(term);
                                setSearchFocused(false);
                                window.location.href = `/products?search=${encodeURIComponent(term)}`;
                            }}
                        />
                    </Box>
                </Box>
            </AppBar>

            {/* Mobile Menu Drawer */}
            <Drawer
                anchor="right"
                open={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 280,
                        backgroundColor: 'background.paper',
                    },
                    display: { xs: 'block', md: 'none' }
                }}
            >
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Menu
                    </Typography>
                    <IconButton onClick={() => setMobileMenuOpen(false)}>
                        <Close />
                    </IconButton>
                </Box>

                {/* Mobile User Section */}
                <Box sx={{ px: 2, pb: 2, mb: 1, borderBottom: 1, borderColor: 'divider' }}>
                    {isAuthenticated && user ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1 }}>
                            <Avatar
                                sx={{
                                    width: 40,
                                    height: 40,
                                    fontSize: '1rem',
                                    bgcolor: 'primary.main',
                                }}
                            >
                                {user.name.charAt(0).toUpperCase()}
                            </Avatar>
                            <Box>
                                <Typography variant="subtitle1" fontWeight={600}>
                                    {user.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {user.email}
                                </Typography>
                            </Box>
                        </Box>
                    ) : (
                        <ListItemButton onClick={() => { setMobileMenuOpen(false); setAuthDialogOpen(true); }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Person color="primary" />
                                <ListItemText primary="Sign In / Register" />
                            </Box>
                        </ListItemButton>
                    )}
                </Box>

                <List>
                    {navLinks.map((link) => (
                        <ListItem key={link.href} disablePadding>
                            <ListItemButton
                                component={Link}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <ListItemText
                                    primary={link.label}
                                    primaryTypographyProps={{
                                        fontWeight: 500,
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}

                    {isAuthenticated && (
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => {
                                setMobileMenuOpen(false);
                                // Ideally trigger logout here or open user menu
                                setUserMenuAnchor(document.body); // Placeholder to show intent, though logic might need refinement for mobile
                            }}>
                                <ListItemText primary="Account Settings" />
                            </ListItemButton>
                        </ListItem>
                    )}
                </List>
            </Drawer>

            {/* Cart Drawer */}
            <CartDrawer
                open={cartDrawerOpen}
                onClose={() => setCartDrawerOpen(false)}
            />

            {/* Auth Dialog */}
            <AuthDialog
                open={authDialogOpen}
                onClose={() => setAuthDialogOpen(false)}
            />

            {/* User Menu */}
            <UserMenu
                anchorEl={userMenuAnchor}
                open={Boolean(userMenuAnchor)}
                onClose={() => setUserMenuAnchor(null)}
            />
        </>
    );
}
