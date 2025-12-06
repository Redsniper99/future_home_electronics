'use client';

import React from 'react';
import { Box } from '@mui/material';

const snowflakes = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 10}s`,
    animationDuration: `${8 + Math.random() * 10}s`,
    opacity: 0.4 + Math.random() * 0.6,
    size: 4 + Math.random() * 8,
}));

export default function Snowfall() {
    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 9999,
                overflow: 'hidden',
            }}
        >
            {snowflakes.map((flake) => (
                <Box
                    key={flake.id}
                    sx={{
                        position: 'absolute',
                        top: '-20px',
                        left: flake.left,
                        width: flake.size,
                        height: flake.size,
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        opacity: flake.opacity,
                        boxShadow: '0 0 10px rgba(255,255,255,0.8)',
                        animation: `snowfall ${flake.animationDuration} linear infinite`,
                        animationDelay: flake.animationDelay,
                        '@keyframes snowfall': {
                            '0%': {
                                transform: 'translateY(0) rotate(0deg)',
                                opacity: flake.opacity,
                            },
                            '100%': {
                                transform: 'translateY(100vh) rotate(360deg)',
                                opacity: 0,
                            },
                        },
                    }}
                />
            ))}
        </Box>
    );
}
