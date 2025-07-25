import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Link, useNavigate } from "react-router-dom"
import GreenTownImage from "@/components/images/green-town.png"
import axios from "axios"
import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
    const [step, setStep] = useState<"role" | "auth">("role");
    const [selectedRole, setSelectedRole] = useState("");
    const isLogin = mode === "login";
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nama: "",
        nik: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const endpoint = isLogin ? "/login" : "/register";
            const payload = isLogin
                ? {
                    email: formData.email,
                    password: formData.password,
                }
                : {
                    name: formData.nama,
                    nik: formData.nik,
                    email: formData.email,
                    password: formData.password,
                    role: selectedRole,
                };

            const res = await axios.post(`${API_URL}/users${endpoint}`, payload);
            const user = res.data.data;
            login(user);
            toast.success(isLogin ? "Login berhasil!" : "Registrasi berhasil!");
            navigate("/");
        } catch (err: any) {
            setError(err.response?.data?.message || "Terjadi kesalahan.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen overflow-y-auto bg-gray-100 p-4">
            <Card className="flex flex-col md:flex-row w-full max-w-4xl overflow-hidden rounded-xl shadow-lg">
                <div className="md:w-1/2 p-6 flex items-center justify-center">
                    <img
                        src={GreenTownImage}
                        alt="Illustration"
                        className="w-[571.42px] h-[297px]"
                    />
                </div>

                <div className="md:w-1/2 p-6 flex items-center">
                    <CardContent className="p-0 w-full">
                        <h2 className="text-2xl font-bold text-center mb-6">
                            Hi, Welcome Back!
                        </h2>

                        {step === "role" ? (
                            <div className="space-y-4">
                                <Label htmlFor="role">Select Role</Label>
                                <select
                                    id="role"
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    value={selectedRole}
                                    onChange={(e) => setSelectedRole(e.target.value)}
                                >
                                    <option value="">Select Role</option>
                                    <option value="BUMDES">BUMDES</option>
                                    <option value="villager">Villager</option>
                                    <option value="corporate">Corporate</option>
                                </select>

                                <Button
                                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-semibold"
                                    onClick={() => {
                                        if (selectedRole) setStep("auth");
                                    }}
                                    disabled={!selectedRole}
                                >
                                    Lanjut
                                </Button>
                            </div>
                        ) : (
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                {!isLogin && (
                                    <>
                                        <div>
                                            <Label htmlFor="nama">Name</Label>
                                            <Input id="nama" placeholder="Masukkan nama" className="mt-1" value={formData.nama}
                                                onChange={(e) => setFormData({ ...formData, nama: e.target.value })} />
                                        </div>
                                        <div>
                                            <Label htmlFor="nik">NIK</Label>
                                            <Input
                                                id="nik"
                                                placeholder="Masukkan NIK"
                                                className="mt-1"
                                                value={formData.nik}
                                                onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                                            />
                                        </div>
                                    </>
                                )}
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="Masukkan email" className="mt-1" value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                </div>

                                <div>
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" type="password" placeholder="Masukkan password" className="mt-1" value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                                </div>

                                {!isLogin && (
                                    <div>
                                        <Label htmlFor="confirm-password">Konfirmasi Password</Label>
                                        <Input id="confirm-password" type="password" placeholder="Konfirmasi password" className="mt-1" value={formData.confirmPassword}
                                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} />
                                    </div>
                                )}

                                {error && <p className="text-sm text-red-600">{error}</p>}
                                {loading && <p className="text-sm text-gray-500">Memproses...</p>}

                                <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-semibold">
                                    {isLogin ? "Login" : "Save"}
                                </Button>
                            </form>
                        )}

                        <div className="text-center text-sm mt-4">
                            {isLogin ? (
                                <>
                                    Belum punya akun?{" "}
                                    <Link to="/register" className="text-green-600 font-medium hover:underline">
                                        Daftar di sini
                                    </Link>
                                </>
                            ) : (
                                <>
                                    Sudah punya akun?{" "}
                                    <Link to="/login" className="text-green-600 font-medium hover:underline">
                                        Login di sini
                                    </Link>
                                </>
                            )}
                        </div>
                    </CardContent>
                </div>
            </Card>
        </div>
    );
}
