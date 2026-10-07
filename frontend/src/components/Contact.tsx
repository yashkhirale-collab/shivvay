import {
    Clock3,
    Mail,
    MapPin,
    Phone,
} from "lucide-react";

function Contact() {
    return (
        <section id="contact" className="bg-white px-5 py-20 lg:py-28">
            <div className="mx-auto max-w-7xl">

                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
                        Contact Us
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
                        Visit SHIVVAY
                    </h2>

                    <p className="mt-5 leading-7 text-gray-600">
                        Mother & Child Health Clinic
                    </p>
                </div>

                <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

                    <div className="rounded-2xl border border-gray-100 bg-green-50 p-6">
                        <MapPin className="text-teal-700" size={26} />

                        <h3 className="mt-4 font-bold text-gray-900">
                            Address
                        </h3>

                        <div className="mt-3 space-y-4 text-left font-semibold text-gray-700">

                            <div className="flex items-start gap-2">
                                <MapPin className=" mt-1 shrink-0 text-teal-700" size={20} strokeWidth={2} />
                                <p className="m-0 leading-6">
                                    First Floor, Prabhakar Smruti, Opp. Arjuna Celebrations,Pandey Lay-out, Khamla Main Road, Nagpur - 440022
                                </p>
                            </div>
                            <hr className="my-2 border-gray-300" />
                            <div className="flex items-start gap-2">
                                <MapPin className="mt-1 shrink-0 text-teal-700" size={20} strokeWidth={2} />
                                <p className="m-0 leading-6">
                                    First Floor, Jasleen Building, Panchsheel Square, Wardha Road,Dhantoli, Nagpur - 440012 (Opposite Big Bazar)
                                </p>
                            </div>

                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-teal-50 p-6">
                        <Phone className="text-teal-700" size={26} />

                        <h3 className="mt-4 font-bold text-gray-900">
                            Phone
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-gray-600">
                            9623246731 / 9096983925
                        </p>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-green-50 p-6">
                        <Mail className="text-green-700" size={26} />

                        <h3 className="mt-4 font-bold text-gray-900">
                            Email
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-gray-600">
                           <a href="mailto:s.m.c.h.shivvay@gmail.com">
                             s.m.c.h.shivvay@gmail.com
                           </a>
                        </p>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-teal-50 p-6">
                        <Clock3 className="text-teal-700" size={26} />

                        <h3 className="mt-4 font-bold text-gray-900">
                            Clinic Hours
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-gray-600">
                            10 PM to 8 PM
                        </p>
                    </div>

                </div>

                {/* Map placeholder */}
                <div className="mt-10 flex min-h-72 items-center justify-center rounded-3xl bg-gray-100">
                    <div className="mt-3 space-y-4 text-left font-semibold text-gray-700">

                        <div className="flex items-start gap-2">
                            <MapPin className=" mt-1 shrink-0 text-teal-700" size={20} strokeWidth={2} />
                            <p className="m-0 leading-6">
                                First Floor, Prabhakar Smruti, Opp. Arjuna Celebrations,Pandey Lay-out, Khamla Main Road, Nagpur - 440022
                            </p>
                        </div>
                        <hr className="my-5 border-gray-300" />
                        <div className="flex items-start gap-2">
                            <MapPin className="mt-1 shrink-0 text-teal-700" size={20} strokeWidth={2} />
                            <p className="m-0 leading-6">
                                First Floor, Jasleen Building, Panchsheel Square, Wardha Road,Dhantoli, Nagpur - 440012 (Opposite Big Bazar)
                            </p>
                        </div>

                    </div>





                </div>

            </div>
        </section>
    );
}

export default Contact;