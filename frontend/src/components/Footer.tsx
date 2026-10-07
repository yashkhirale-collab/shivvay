import logo from "../assets/shivvay-logo.png";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-gray-950 px-5 py-12 text-gray-300">
            <div className="mx-auto max-w-7xl">

                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

                    {/* Brand */}
                    <div className="lg:col-span-2">

                        <img
                            src={logo}
                            alt="SHIVVAY Mother and Child Health Clinic"
                            className="h-20 w-auto rounded-lg bg-white object-contain p-1"
                        />

                        <p className="mt-5 max-w-md text-sm leading-6 text-gray-400">
                            SHIVVAY Mother and Child Health Clinic provides dedicated
                            healthcare for mothers, children and families through
                            specialized medical care.
                        </p>

                    </div>

                    {/* Quick links */}
                    <div>
                        <h3 className="font-semibold text-white">
                            Quick Links
                        </h3>

                        <div className="mt-4 flex flex-col gap-3 text-sm">
                            <a href="#home" className="transition hover:text-white">
                                Home
                            </a>

                            <a href="#about" className="transition hover:text-white">
                                About Us
                            </a>

                            <a href="#doctors" className="transition hover:text-white">
                                Our Doctors
                            </a>

                            <a href="#services" className="transition hover:text-white">
                                Services
                            </a>

                            <a href="#contact" className="transition hover:text-white">
                                Contact
                            </a>
                        </div>
                    </div>

                    {/* Doctors */}
                    <div>
                        <h3 className="font-semibold text-white">
                            Our Specialists
                        </h3>

                        <div className="mt-4 space-y-4 text-sm">

                            <div>
                                <p className="font-medium text-gray-200">
                                    Dr. Parikshit Chohatkar
                                </p>

                                <p className="mt-1 text-gray-500">
                                    Pediatrics & Neonatology
                                </p>
                            </div>

                            <div>
                                <p className="font-medium text-gray-200">
                                    Dr. Vaishnavi Chohatkar
                                </p>

                                <p className="mt-1 text-gray-500">
                                    Obstetrics & Gynaecology
                                </p>
                            </div>
                            <Link
                                to="/doctor/login"
                                className="text-sm text-gray-500 transition hover:text-teal-700"
                            >
                                Doctor Login
                            </Link>

                        </div>
                    </div>

                </div>

                <div className="mt-10 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} SHIVVAY Mother and Child Health Clinic.
                    All rights reserved.
                </div>

            </div>
        </footer>
    );
}

export default Footer;