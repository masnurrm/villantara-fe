import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function HomePage() {
    const { isAuthenticated, user } = useAuth();

    console.log("isAuthenticated:", isAuthenticated);
    console.log("user:", user);

    if (isAuthenticated) {
        if (user?.role === "BUMDES") {
            return <Navigate to="/dashboard" />;
        } else {
            return <Navigate to="/marketplace" />;
        }
    }

    return <Navigate to="/login" />;
}