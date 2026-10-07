import { useState, type FormEvent } from "react";
import { Eye, EyeOff, Lock, Mail, Phone, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import DoctorAuthLayout from "../../components/doctor/DoctorAuthLayout";
import { registerDoctor } from "../../services/api";

export default function DoctorRegister() {
    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [department, setDepartment] = useState(
        "Pediatrics"
    );
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [showPassword, setShowPassword] =
        useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");

        if (
            !fullName.trim() ||
            !email.trim() ||
            !phone.trim() ||
            !password
        ) {
            setError("Please fill all required fields.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (password.length < 6) {
            setError(
                "Password must contain at least 6 characters."
            );
            return;
        }

        try {
            setLoading(true);

            await registerDoctor({
                full_name: fullName.trim(),
                email: email.trim().toLowerCase(),
                phone: phone.trim(),
                department,
                password,
            });

            navigate("/doctor/login");
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Registration failed."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <DoctorAuthLayout
            title="Create Doctor Account"
            subtitle="Register a doctor account for SHIVVAY Clinic"
        >
            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                {error && (
                    <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Full Name
                    </label>

                    <div className="relative">
                        <UserRound
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) =>
                                setFullName(e.target.value)
                            }
                            placeholder="Dr. Full Name"
                            className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 outline-none focus:border-green-600"
                        />
                    </div>
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Email
                    </label>

                    <div className="relative">
                        <Mail
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="doctor@example.com"
                            className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 outline-none focus:border-green-600"
                        />
                    </div>
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Phone
                    </label>

                    <div className="relative">
                        <Phone
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) =>
                                setPhone(e.target.value)
                            }
                            placeholder="Mobile number"
                            className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 outline-none focus:border-green-600"
                        />
                    </div>
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Department
                    </label>

                    <select
                        value={department}
                        onChange={(e) =>
                            setDepartment(e.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 px-3 py-3 outline-none focus:border-green-600"
                    >
                        <option value="Pediatrics">
                            Pediatrics
                        </option>

                        <option value="Obstetrics & Gynaecology">
                            Obstetrics & Gynaecology
                        </option>
                    </select>
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Password
                    </label>

                    <div className="relative">
                        <Lock
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="Password"
                            className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-10 outline-none focus:border-green-600"
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword(
                                    !showPassword
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

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>

                    <div className="relative">
                        <Lock
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type={
                                showConfirmPassword
                                    ? "text"
                                    : "password"
                            }
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(
                                    e.target.value
                                )
                            }
                            placeholder="Confirm password"
                            className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-10 outline-none focus:border-green-600"
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowConfirmPassword(
                                    !showConfirmPassword
                                )
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                        >
                            {showConfirmPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading
                        ? "Creating Account..."
                        : "Create Doctor Account"}
                </button>

                <p className="text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                        to="/doctor/login"
                        className="font-semibold text-green-600 hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </form>
        </DoctorAuthLayout>
    );
}