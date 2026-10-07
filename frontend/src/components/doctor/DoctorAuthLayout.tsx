import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import logo from "../../assets/shivvay-logo.png";

interface DoctorAuthLayoutProps {
    title: string;
    subtitle: string;
    children: ReactNode;
}

export default function DoctorAuthLayout({
    title,
    subtitle,
    children,
}: DoctorAuthLayoutProps) {
    return (
        <div className="min-h-screen bg-[#f7faf9]">
            {/* Top bar */}
            <header className="border-b border-gray-200 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <Link to="/">
                        <img
                            src={logo}
                            alt="SHIVVAY Mother and Child Health Clinic"
                            className="h-14 w-auto"
                        />
                    </Link>

                    <Link
                        to="/"
                        className="flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-teal-700"
                    >
                        <ArrowLeft size={17} />
                        Back to Website
                    </Link>
                </div>
            </header>

            {/* Auth content */}
            <main className="flex min-h-[calc(100vh-89px)] items-center justify-center px-4 py-10">
                <div className="w-full max-w-md">
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                        <div className="mb-7 text-center">
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-50">
                                <span className="text-xl">🩺</span>
                            </div>

                            <h1 className="text-2xl font-bold text-gray-900">
                                {title}
                            </h1>

                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                {subtitle}
                            </p>
                        </div>

                        {children}
                    </div>

                    <p className="mt-5 text-center text-xs text-gray-500">
                        SHIVVAY Mother and Child Health Clinic
                    </p>
                </div>
            </main>
        </div>
    );
}