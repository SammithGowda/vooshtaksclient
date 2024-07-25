import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const setUserProfile = (data) => {
        setUser(data)
    }
    const goggleLogout = (callback) => {
        if (user) {
            setUser(null)
        }
    }
    return (
        <AuthContext.Provider value={{ user, setUserProfile, goggleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};