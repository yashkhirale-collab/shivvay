import { ArrowRight, GraduationCap } from "lucide-react";
import drParikshit from "../assets/dr-parikshit.png";
import drVaishnavi from "../assets/dr-vaishnavi.png";

function Doctors() {
    return (
        <section
            id="doctors"
            className="bg-green-50 px-5 py-20 lg:py-28"
        >
            <div className="mx-auto max-w-7xl">

                <div className="mx-auto max-w-3xl text-center">

                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
                        Our Doctors
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
                        Meet Our Specialists
                    </h2>

                    <p className="mt-5 leading-7 text-gray-600">
                        Experienced specialists dedicated to providing focused and
                        compassionate healthcare for mothers, children and families.
                    </p>

                </div>


                <div className="mt-14 grid gap-8 lg:grid-cols-2">


                    {/* Doctor 1 */}

                    <article className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-100">

                        <div className="grid md:grid-cols-2">

                            {/* IMAGE */}

                            <div className="h-112.5 overflow-hidden bg-teal-50">

                                <img
                                    src={drParikshit}
                                    alt="Dr. Parikshit Chohatkar"
                                    className="h-full w-full object-cover object-top"
                                />

                            </div>


                            {/* CONTENT */}

                            <div className="p-7">

                                <p className="text-sm font-semibold text-teal-700">
                                    PEDIATRICIAN & NEONATOLOGIST
                                </p>

                                <h3 className="mt-2 text-2xl font-bold text-gray-900">
                                    Dr. Parikshit Chohatkar
                                </h3>

                                <p className="mt-2 font-medium text-gray-600">
                                    MBBS, MD (Pediatrics)
                                </p>

                                <div className="mt-5 flex gap-3">

                                    <GraduationCap
                                        size={20}
                                        className="mt-1 shrink-0 text-teal-700"
                                    />

                                    <p className="text-sm leading-6 text-gray-600">
                                        MD (Pediatrics) from MGIMS, Sevagram.
                                    </p>

                                </div>

                                <p className="mt-4 text-sm leading-6 text-gray-600">
                                    More than 10 years of experience in Pediatrics and
                                    Neonatology, working as a consultant pediatrician and
                                    neonatal intensivist in Nagpur.
                                </p>

                                <a
                                    href="#services"
                                    className="mt-6 inline-flex items-center gap-2 font-semibold text-teal-700 transition hover:text-teal-900"
                                >
                                    View Pediatric Services
                                    <ArrowRight size={18} />
                                </a>

                            </div>

                        </div>

                    </article>


                    {/* Doctor 2 */}

                    <article className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-100">

                        <div className="grid md:grid-cols-2">

                            {/* IMAGE */}

                            <div className="h-112.5 overflow-hidden bg-green-50">

                                <img
                                    src={drVaishnavi}
                                    alt="Dr. Vaishnavi Chohatkar"
                                    className="h-full w-full object-cover object-top"
                                />

                            </div>


                            {/* CONTENT */}

                            <div className="p-7">

                                <p className="text-sm font-semibold text-green-700">
                                    OBSTETRICIAN & GYNAECOLOGIST 
                                </p>

                                <h3 className="mt-2 text-2xl font-bold text-gray-900">

                                    Dr. Vaishnavi Chohatkar

                                    <span className="block text-base font-medium text-gray-600">
                                        (Kapse)
                                    </span>

                                </h3>

                                <p className="mt-2 font-medium text-gray-600">
                                    MBBS, DGO
                                </p>

                                <div className="mt-5 flex gap-3">

                                    <GraduationCap
                                        size={20}
                                        className="mt-1 shrink-0 text-green-700"
                                    />

                                    <p className="text-sm leading-6 text-gray-600">
                                       MBBS from DMIMS <br/>
                                       DGO from Government women's hospital Nanded.
                                    </p>

                                </div>

                                <p className="mt-4 text-sm leading-6 text-gray-600">
                                    More than 3 years of experience in Obstetrics and
                                    Gynaecology, working as a consultant obstetrician,
                                    gynaecologist and infertility specialist in Nagpur.
                                </p>

                                <a
                                    href="#services"
                                    className="mt-6 inline-flex items-center gap-2 font-semibold text-green-700 transition hover:text-green-900"
                                >
                                    View Women's Health Services
                                    <ArrowRight size={18} />
                                </a>

                            </div>

                        </div>

                    </article>

                </div>

            </div>
        </section>
    );
}

export default Doctors;