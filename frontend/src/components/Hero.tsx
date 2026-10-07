import { ArrowRight, CalendarCheck, ShieldCheck } from "lucide-react";
import doctorImage from "../assets/doctors.png";

function Hero() {
    return (
        <section
            id="home"
            className="relative overflow-hidden bg-linear-to-br from-green-50 via-white to-teal-50"
        >
            {/* Decorative background */}
            <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-green-100/60 blur-3xl" />
            <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-teal-100/50 blur-3xl" />

            <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:py-16 lg:grid-cols-2 lg:px-8 lg:py-20">

                {/* Left Content */}
                <div className="max-w-2xl">

                    <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-teal-700 shadow-sm ring-1 ring-teal-100">
                        <ShieldCheck size={18} />
                        Mother & Child Health Clinic
                    </div>

                    <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                        Compassionate Care
                        <span className="block text-teal-700">
                            for Every Mother & Child
                        </span>
                    </h1>

                    <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
                        SHIVVAY Mother and Child Health Clinic provides dedicated
                        healthcare for children, mothers and families with personalized
                        care from experienced specialists in Pediatrics and Obstetrics &
                        Gynaecology.
                    </p>

                    {/* Buttons */}
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                        <a
                            href="#appointment"
                            className="group inline-flex items-center justify-center gap-2 rounded-full bg-teal-700 px-7 py-3.5 font-semibold text-white shadow-lg shadow-teal-700/20 transition hover:bg-teal-800"
                        >
                            <CalendarCheck size={20} />
                            Book Your Appointment
                            <ArrowRight
                                size={18}
                                className="transition-transform group-hover:translate-x-1"
                            />
                        </a>

                        <a
                            href="#doctors"
                            className="inline-flex items-center justify-center rounded-full border-2 border-teal-700 bg-white px-7 py-3.5 font-semibold text-teal-700 transition hover:bg-teal-50"
                        >
                            Meet Our Doctors
                        </a>

                    </div>

                    {/* Trust information */}
                    <div className="mt-10 grid grid-cols-1 gap-4 border-t border-gray-200 pt-7 sm:grid-cols-3">

                        <div>
                            <p className="text-2xl font-bold text-teal-700">10+</p>
                            <p className="mt-1 text-sm text-gray-600">
                                Years Pediatric Experience
                            </p>
                        </div>

                        <div>
                            <p className="text-2xl font-bold text-green-600">3+</p>
                            <p className="mt-1 text-sm text-gray-600">
                                Years Gynaecology Experience
                            </p>
                        </div>

                        <div>
                            <p className="text-2xl font-bold text-teal-700">2</p>
                            <p className="mt-1 text-sm text-gray-600">
                                Specialist Doctors
                            </p>
                        </div>

                    </div>
                </div>

                {/* Doctor Image */}
                <div className="relative mx-auto w-full max-w-xl lg:ml-auto">

                    {/* Image background */}
                    <div className="absolute inset-x-8 bottom-0 top-1 rounded-[3rem] bg-linear-to-br from-teal-100 to-green-100" />

                    <div className="relative overflow-hidden rounded-[3rem]">
                        <img
                            src={doctorImage}
                            alt="Dr. Parikshit Chohatkar and Dr. Vaishnavi Chohatkar"
                            className="relative z-10 w-full object-contain"
                        />
                    </div>

                    {/* Floating card */}
                    <div className="absolute bottom-5 left-2 z-20 rounded-2xl bg-white px-5 py-4 shadow-xl ring-1 ring-gray-100 sm:left-0">
                        <p className="text-sm font-semibold text-gray-900">
                            Specialist Care
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                            Pediatrics & Women's Health
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Hero;