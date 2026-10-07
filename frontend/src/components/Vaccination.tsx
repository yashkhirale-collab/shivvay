import {
    BellRing,
    CalendarCheck,
    ShieldCheck,
    Syringe,
} from "lucide-react";

function Vaccination() {
    return (
        <section className="bg-linear-to-br from-teal-700 to-green-700 px-5 py-20 text-white lg:py-24">
            <div className="mx-auto max-w-7xl">

                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-100">
                            Vaccination & Preventive Care
                        </p>

                        <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                            Stay on Track With Vaccinations
                        </h2>

                        <p className="mt-5 max-w-xl leading-7 text-teal-50">
                            Keeping vaccinations on schedule is an important part of
                            protecting children and maintaining long-term health. SHIVVAY
                            provides vaccination services along with guidance and follow-up
                            reminders.
                        </p>

                        <a
                            href="#appointment"
                            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-teal-800 shadow-lg transition hover:bg-teal-50"
                        >
                            <CalendarCheck size={20} />
                            Book a Vaccination Appointment
                        </a>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">

                        <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
                            <Syringe size={28} />

                            <h3 className="mt-4 font-bold">
                                Vaccination Services
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-teal-50">
                                Vaccination services with appropriate guidance.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
                            <ShieldCheck size={28} />

                            <h3 className="mt-4 font-bold">
                                Preventive Care
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-teal-50">
                                Support for regular preventive healthcare.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
                            <CalendarCheck size={28} />

                            <h3 className="mt-4 font-bold">
                                Scheduled Follow-ups
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-teal-50">
                                Keep upcoming vaccination dates organized.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
                            <BellRing size={28} />

                            <h3 className="mt-4 font-bold">
                                Whatsaap message Reminders
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-teal-50">
                                Reminder notifications will be sent before scheduled
                                vaccinations.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default Vaccination;