import { useState, type FormEvent } from "react";
import {
    Eye,
    EyeOff,
    Lock,
    Mail,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import DoctorAuthLayout from "../../components/doctor/DoctorAuthLayout";
import { loginDoctor } from "../../services/api";

export default function DoctorLogin() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");

        if (!email.trim() || !password.trim()) {
            setError(
                "Please enter your email and password."
            );
            return;
        }

        try {
            setLoading(true);

            const result = await loginDoctor({
                email: email.trim(),
                password,
            });

            localStorage.setItem(
                "doctor_token",
                result.access_token
            );

            localStorage.setItem(
                "doctor",
                JSON.stringify(result.doctor)
            );

            navigate("/doctor/dashboard");

            navigate("/doctor/dashboard");
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <DoctorAuthLayout
            title="Doctor Login"
            subtitle="Sign in to access your clinic dashboard."
        >
            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                <div>
                    <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Email Address
                    </label>

                    <div className="relative">
                        <Mail
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            placeholder="doctor@example.com"
                            className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                        />
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Password
                    </label>

                    <div className="relative">
                        <Lock
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            id="password"
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            placeholder="Enter password"
                            className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-12 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword(
                                    (value) => !value
                                )
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                        >
                            {showPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading
                        ? "Signing in..."
                        : "Sign In"}
                </button>

                <p className="text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link
                        to="/doctor/register"
                        className="font-semibold text-teal-700"
                    >
                        Register
                    </Link>
                </p>
            </form>
        </DoctorAuthLayout>
    );
}