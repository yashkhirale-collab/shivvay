import {
    HeartPulse,
    ShieldCheck,
    Stethoscope,
    Users,
} from "lucide-react";

function About() {
    return (
        <section id="about" className="bg-white px-5 py-20 lg:py-28">
            <div className="mx-auto max-w-7xl">

                {/* Heading */}
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
                        About SHIVVAY
                    </p>

                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Dedicated Care for Mothers & Children
                    </h2>

                    <p className="mt-5 leading-7 text-gray-600">
                        SHIVVAY Mother and Child Health Clinic is dedicated to providing
                        compassionate and specialized healthcare for children, mothers
                        and families.
                    </p>
                </div>

                {/* Main content */}
                <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:items-center">

                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                            Healthcare with a Personal Touch
                        </h3>

                        <p className="mt-5 leading-7 text-gray-600">
                            Our clinic brings together expertise in Pediatrics, Neonatology,
                            Obstetrics and Gynaecology to provide comprehensive care across
                            different stages of life.
                        </p>

                        <p className="mt-4 leading-7 text-gray-600">
                            From newborn and childhood care to vaccinations, adolescent
                            health, pregnancy care and women's health, our aim is to provide
                            appropriate medical attention in a comfortable and supportive
                            environment.
                        </p>
                    </div>

                    {/* Highlights */}
                    <div className="grid gap-5 sm:grid-cols-2">

                        <div className="rounded-2xl border border-teal-100 bg-teal-50 p-6">
                            <Stethoscope className="text-teal-700" size={30} />

                            <h4 className="mt-4 font-bold text-gray-900">
                                Specialist Care
                            </h4>

                            <p className="mt-2 text-sm leading-6 text-gray-600">
                                Focused healthcare from specialists in Pediatrics and
                                Obstetrics & Gynaecology.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-green-100 bg-green-50 p-6">
                            <HeartPulse className="text-green-700" size={30} />

                            <h4 className="mt-4 font-bold text-gray-900">
                                Mother & Child Focus
                            </h4>

                            <p className="mt-2 text-sm leading-6 text-gray-600">
                                Healthcare services designed around mothers, newborns,
                                children and families.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-teal-100 bg-teal-50 p-6">
                            <ShieldCheck className="text-teal-700" size={30} />

                            <h4 className="mt-4 font-bold text-gray-900">
                                Preventive Care
                            </h4>

                            <p className="mt-2 text-sm leading-6 text-gray-600">
                                Vaccination, health monitoring and preventive healthcare
                                services.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-green-100 bg-green-50 p-6">
                            <Users className="text-green-700" size={30} />

                            <h4 className="mt-4 font-bold text-gray-900">
                                Personalized Attention
                            </h4>

                            <p className="mt-2 text-sm leading-6 text-gray-600">
                                Care focused on understanding individual healthcare needs.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;