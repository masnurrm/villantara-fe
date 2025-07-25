import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import axios from "axios";

type User = {
    id: string;
    email: string;
    name: string;
    role: string;
};

type AuthContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
    login: (user: User) => void;
    logout: () => void;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const login = (userData: User) => {
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("user");
    };

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                // First check localStorage for existing user data
                const storedUser = localStorage.getItem("user");
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    setUser(parsedUser);
                    setIsAuthenticated(true);
                }

                // Then verify with server
                const res = await axios.get("/auth/me", { withCredentials: true });
                if (res.data) {
                    setUser(res.data);
                    setIsAuthenticated(true);
                    // Update localStorage with fresh data
                    localStorage.setItem("user", JSON.stringify(res.data));
                } else {
                    // Server says no user, clear local state
                    setUser(null);
                    setIsAuthenticated(false);
                    localStorage.removeItem("user");
                }
            } catch (error) {
                // Server error or no valid session
                setUser(null);
                setIsAuthenticated(false);
                localStorage.removeItem("user");
                console.error("Failed to initialize auth:", error);
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);

    return (
        <AuthContext.Provider 
            value={{ 
                user, 
                setUser, 
                isAuthenticated, 
                setIsAuthenticated, 
                login, 
                logout, 
                loading 
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};