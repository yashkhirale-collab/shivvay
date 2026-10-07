import {
    CalendarDays,
    CheckCircle,
    Search,
} from "lucide-react";
import { useState } from "react";

import DoctorDashboardLayout from "../../components/doctor/DoctorDashboardLayout";
import StatusBadge from "../../components/doctor/StatusBadge";

import {
    DoctorProvider,
    useDoctor,
} from "../../context/DoctorContext";


function AppointmentContent() {
    const {
        doctor,
        appointments,
        markVisited,
        loading,
        error,
    } = useDoctor();

    const [search, setSearch] =
        useState("");

    const [updatingId, setUpdatingId] =
        useState<string | null>(null);


    const filtered =
        appointments.filter((appointment) =>
            appointment.patientName
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );


    const handleMarkVisited = async (
        appointmentId: string
    ) => {
        try {
            setUpdatingId(appointmentId);
            await markVisited(appointmentId);
        } finally {
            setUpdatingId(null);
        }
    };


    return (
        <DoctorDashboardLayout
            doctorName={doctor.name}
            department={doctor.department}
        >
            <div className="mb-8">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                        <CalendarDays size={22} />
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Appointments
                        </h2>

                        <p className="text-sm text-gray-500">
                            View all clinic appointments.
                        </p>
                    </div>
                </div>
            </div>


            <div className="relative mb-6 max-w-md">
                <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                    type="search"
                    value={search}
                    onChange={(event) =>
                        setSearch(
                            event.target.value
                        )
                    }
                    placeholder="Search patient..."
                    className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                />
            </div>


            {error && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}


            {loading ? (
                <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
                    Loading appointments...
                </div>
            ) : filtered.length === 0 ? (
                <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
                    <p className="font-medium text-gray-700">
                        No appointments found.
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                        {search
                            ? "Try a different patient name."
                            : "There are no clinic appointments yet."}
                    </p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                    {filtered.map(
                        (appointment) => (
                            <div
                                key={
                                    appointment.id
                                }
                                className="flex flex-col gap-4 border-b border-gray-100 p-5 last:border-0 md:flex-row md:items-center md:justify-between"
                            >
                                <div>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <span className="rounded-lg bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-700">
                                            {
                                                appointment.time
                                            }
                                        </span>

                                        <h3 className="font-semibold text-gray-900">
                                            {
                                                appointment.patientName
                                            }
                                        </h3>
                                    </div>

                                    <p className="mt-2 text-sm text-gray-500">
                                        {
                                            appointment.reason
                                        }
                                    </p>

                                    <p className="mt-1 text-xs text-gray-400">
                                        {
                                            appointment.date
                                        }
                                    </p>
                                </div>


                                <div className="flex items-center gap-3">
                                    <StatusBadge
                                        status={
                                            appointment.status
                                        }
                                    />

                                    {appointment.status ===
                                        "Not Visited" && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleMarkVisited(
                                                    appointment.id
                                                )
                                            }
                                            disabled={
                                                updatingId ===
                                                appointment.id
                                            }
                                            className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            <CheckCircle
                                                size={17}
                                            />

                                            {updatingId ===
                                            appointment.id
                                                ? "Updating..."
                                                : "Mark Visited"}
                                        </button>
                                    )}
                                </div>
                            </div>
                        )
                    )}
                </div>
            )}
        </DoctorDashboardLayout>
    );
}


export default function DoctorAppointments() {
    return (
        <DoctorProvider>
            <AppointmentContent />
        </DoctorProvider>
    );
}