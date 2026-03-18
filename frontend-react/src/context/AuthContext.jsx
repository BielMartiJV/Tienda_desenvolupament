import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);         // accessToken
    const [refreshToken, setRefreshToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Carrega la sessió des de localStorage en iniciar
        const savedUser = localStorage.getItem('usuari');
        const savedToken = localStorage.getItem('token');
        const savedRefreshToken = localStorage.getItem('refreshToken');

        if (savedUser && savedToken) {
            setUser(JSON.parse(savedUser));
            setToken(savedToken);
            setRefreshToken(savedRefreshToken);
        }
        setLoading(false);
    }, []);

    // Crmat des de Login o Register: guarda usuari + ambdós tokens
    const login = (userData, accessToken, refreshTokenValue) => {
        setUser(userData);
        setToken(accessToken);
        setRefreshToken(refreshTokenValue);
        localStorage.setItem('usuari', JSON.stringify(userData));
        localStorage.setItem('token', accessToken);
        if (refreshTokenValue) {
            localStorage.setItem('refreshToken', refreshTokenValue);
        }
    };

    // Logout: elimina el refreshToken de la BD i neteja localStorage
    const logout = async () => {
        try {
            const storedRefreshToken = localStorage.getItem('refreshToken');
            if (storedRefreshToken) {
                await fetch('http://127.0.0.1:3000/api/auth/logout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ refreshToken: storedRefreshToken })
                });
            }
        } catch (err) {
            console.error('Error al fer logout:', err);
        } finally {
            setUser(null);
            setToken(null);
            setRefreshToken(null);
            localStorage.removeItem('usuari');
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
        }
    };

    // Refresca el accessToken usant el refreshToken
    const refreshAccessToken = async () => {
        try {
            const storedRefreshToken = localStorage.getItem('refreshToken');
            if (!storedRefreshToken) return null;

            const response = await fetch('http://127.0.0.1:3000/api/auth/refresh', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken: storedRefreshToken })
            });

            const data = await response.json();
            if (data.status === 'success') {
                const newAccessToken = data.data.accessToken;
                setToken(newAccessToken);
                localStorage.setItem('token', newAccessToken);
                return newAccessToken;
            }
        } catch (err) {
            console.error('Error al refrescar el token:', err);
        }
        return null;
    };

    return (
        <AuthContext.Provider value={{ user, token, refreshToken, login, logout, refreshAccessToken, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
