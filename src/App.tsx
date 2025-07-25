import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import RoleSelectorPage from "./pages/RoleSelectorPage";
import DashboardLayout from "./layouts/DashboardLayout";

import HomePage from "@/pages/Homepage";
import Marketplace from "@/pages/marketplace/Marketplace";

import Dashboard from "@/pages/dashboard/Dashboard";

function ProtectedRoute({ children, role }: { children: React.ReactNode; role?: string }) {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) return <Navigate to="/login" />;
    if (role && user?.role !== role) return <Navigate to="/" />;
    return children;
}

function App() {
    return (
        <AuthProvider>
            <Toaster position="top-center" reverseOrder={false} />
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<RoleSelectorPage mode="login" />} />
                    <Route path="/register" element={<RoleSelectorPage mode="register" />} />

                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute role="BUMDES">
                                <DashboardLayout>
                                    <Dashboard />
                                </DashboardLayout>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/marketplace"
                        element={
                            <ProtectedRoute>
                                <DashboardLayout>
                                    <Marketplace />
                                </DashboardLayout>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
