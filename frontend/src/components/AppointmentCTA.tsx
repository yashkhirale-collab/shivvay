import { ArrowRight, CalendarCheck } from "lucide-react";

function AppointmentCTA() {
    return (
        <section id="appointment" className="bg-green-50 px-5 py-20 lg:py-24">
            <div className="mx-auto max-w-5xl">

                <div className="rounded-3xl bg-white px-6 py-12 text-center shadow-sm ring-1 ring-green-100 sm:px-10">

                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                        <CalendarCheck size={28} />
                    </div>

                    <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
                        Appointments
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
                        Your Health, Our Priority
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-600">
                        Schedule an appointment with our pediatric or gynaecology
                        specialist at a convenient time.
                    </p>

                    <a
                        href="/appointment"
                        className="group mt-8 inline-flex items-center gap-2 rounded-full bg-teal-700 px-8 py-4 font-semibold text-white shadow-lg shadow-teal-700/20 transition hover:bg-teal-800"
                    >
                        Book Your Appointment

                        <ArrowRight
                            size={19}
                            className="transition-transform group-hover:translate-x-1"
                        />
                    </a>

                </div>
            </div>
        </section>
    );
}

export default AppointmentCTA;