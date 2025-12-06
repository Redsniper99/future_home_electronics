'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
    id: string;
    name: string;
    email: string;
    createdAt: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    signUp: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load user from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (error) {
                console.error('Error loading user:', error);
            }
        }
        setIsInitialized(true);
    }, []);

    // Save user to localStorage whenever it changes
    useEffect(() => {
        if (isInitialized) {
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
            } else {
                localStorage.removeItem('user');
            }
        }
    }, [user, isInitialized]);

    const signUp = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Check if user already exists
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const userExists = existingUsers.some((u: User) => u.email === email);

        if (userExists) {
            return { success: false, error: 'Email already registered' };
        }

        // Create new user
        const newUser: User = {
            id: Date.now().toString(),
            name,
            email,
            createdAt: new Date().toISOString(),
        };

        // Save to users list
        existingUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(existingUsers));

        // Set as current user
        setUser(newUser);

        return { success: true };
    };

    const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Get users from localStorage
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const foundUser = existingUsers.find((u: User) => u.email === email);

        if (!foundUser) {
            return { success: false, error: 'Invalid email or password' };
        }

        // Set as current user
        setUser(foundUser);

        return { success: true };
    };

    const signOut = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                signIn,
                signUp,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
