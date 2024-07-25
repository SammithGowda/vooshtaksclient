import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const goggleLogin = (data) => {
        setUser(data)
    }
    const goggleLogout = (callback) => {
        if (user) {
            setUser(null)
        }
        // callback()
    }
    return (
        <AuthContext.Provider value={{ user, goggleLogin, goggleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};