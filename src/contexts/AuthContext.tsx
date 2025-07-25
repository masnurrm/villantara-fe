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
    login: (user: any) => void;
    logout: () => void;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const login = (userData: any) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };
    
    const isAuthenticated = !!user;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get("/auth/me", { withCredentials: true });
                setUser(res.data);
                isAuthenticated(true);
            } catch {
                setUser(null);
                isAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);


    return (
        <AuthContext.Provider value={{ user, setUser, isAuthenticated, login, logout, loading }}>
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
