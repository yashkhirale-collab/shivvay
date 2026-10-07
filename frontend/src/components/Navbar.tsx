import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/shivvay-logo.png";
import { Link } from "react-router-dom";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 border-b border-teal-100 bg-white/95 backdrop-blur-md">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">

                {/* Logo */}
                <a href="#home" onClick={closeMenu} className="flex items-center">
                    <img
                        src={logo}
                        alt="SHIVVAY Mother and Child Health Clinic"
                        className="h-16 w-auto object-contain"
                    />
                </a>
                <h1 className="text-teal-900 font-bold text-4xl mr-80">SHIVVAY</h1>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-8 md:flex">
                    <a
                        href="#home"
                        className="font-medium text-teal-800 transition hover:text-green-600"
                    >
                        Home
                    </a>

                    <a
                        href="#about"
                        className="font-medium text-gray-700 transition hover:text-teal-700"
                    >
                        About Us
                    </a>

                    <a
                        href="#doctors"
                        className="font-medium text-gray-700 transition hover:text-teal-700"
                    >
                        Our Doctors
                    </a>

                    <a
                        href="#services"
                        className="font-medium text-gray-700 transition hover:text-teal-700"
                    >
                        Services
                    </a>

                    <a
                        href="#contact"
                        className="font-medium text-gray-700 transition hover:text-teal-700"
                    >
                        Contact
                    </a>

                    <Link
                        to="/appointment"
                        className="rounded-full bg-teal-700 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-teal-800 hover:shadow-lg"
                    >
                        Book Appointment
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="rounded-lg p-2 text-teal-800 md:hidden"
                    aria-label="Toggle navigation menu"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </nav>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="border-t border-teal-100 bg-white px-5 py-5 md:hidden">
                    <div className="flex flex-col gap-4">

                        <a href="#home" onClick={closeMenu} className="py-2 text-gray-700">
                            Home
                        </a>

                        <a href="#about" onClick={closeMenu} className="py-2 text-gray-700">
                            About Us
                        </a>

                        <a href="#doctors" onClick={closeMenu} className="py-2 text-gray-700">
                            Our Doctors
                        </a>

                        <a href="#services" onClick={closeMenu} className="py-2 text-gray-700">
                            Services
                        </a>

                        <a href="#contact" onClick={closeMenu} className="py-2 text-gray-700">
                            Contact
                        </a>

                        <Link
                            to="#appointment"
                            onClick={closeMenu}
                            className="mt-2 rounded-full bg-teal-700 px-6 py-3 text-center font-semibold text-white"
                        >
                            Book Appointment
                        </Link>

                    </div>
                </div>
            )}
        </header>
    );
}

export default Navbar;