
import type { ReactNode } from "react";
import {
    CalendarDays,
    LayoutDashboard,
    LogOut,
    Syringe,
    Users,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface DoctorDashboardLayoutProps {
    doctorName: string;
    department: string;
    children: ReactNode;
}

export default function DoctorDashboardLayout({
    doctorName,
    department,
    children,
}: DoctorDashboardLayoutProps) {
    const location = useLocation();

    const navigation = [
        {
            label: "Dashboard",
            path: "/doctor/dashboard",
            icon: LayoutDashboard,
        },
        {
            label: "Appointments",
            path: "/doctor/appointments",
            icon: CalendarDays,
        },
        {
            label: "Patients",
            path: "/doctor/patients",
            icon: Users,
        },
        {
            label: "Vaccination Management",
            path: "/doctor/vaccinations",
            icon: Syringe,
        },
    ];

    return (
        <div className="min-h-screen bg-[#f7faf9]">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-gray-200 bg-white lg:block">
                <div className="flex h-full flex-col">
                    <div className="border-b border-gray-200 px-6 py-6">
                        <p className="text-lg font-bold text-teal-700">
                            SHIVVAY
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                            Mother & Child Health Clinic
                        </p>
                    </div>

                    <div className="border-b border-gray-200 px-6 py-5">
                        <p className="font-semibold text-gray-900">
                            {doctorName}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-gray-500">
                            {department}
                        </p>
                    </div>

                    <nav className="flex-1 space-y-1 px-4 py-5">
                        {navigation.map((item) => {
                            const Icon = item.icon;

                            const active =
                                location.pathname ===
                                item.path.split("?")[0];

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${active
                                        ? "bg-teal-50 text-teal-700"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        }`}
                                >
                                    <Icon size={18} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="border-t border-gray-200 p-4">
                        <Link
                            to="/"
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50"
                        >
                            <LogOut size={18} />
                            Exit Dashboard
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main area */}
            <div className="lg:pl-64">
                <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/95 backdrop-blur">
                    <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-teal-700">
                                Doctor Dashboard
                            </p>

                            <h1 className="text-lg font-bold text-gray-900 sm:text-xl">
                                {doctorName}
                            </h1>
                        </div>

                        <div className="flex items-center gap-2">
                            {/* Simple Exit */}
                            <Link
                                to="/"
                                className="rounded-lg bg-green-100 px-3 py-2 text-sm font-medium text-green-700 transition hover:bg-green-200"
                            >
                                Exit
                            </Link>

                            {/* Logout */}
                            <button
                                type="button"
                                onClick={() => {
                                    localStorage.removeItem("doctor_token");
                                    localStorage.removeItem("doctor");
                                    window.location.href = "/";
                                }}
                                className="rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-200"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </header>

                <main className="px-4 py-6 sm:px-6 lg:px-8">
                    {children}
                </main>
            </div>
        </div>
    );
}

