import {
    CalendarDays,
    Clock,
    Syringe,
    UserCheck,
    Users,
} from "lucide-react";

import { Link } from "react-router-dom";

import DoctorDashboardLayout from "../../components/doctor/DoctorDashboardLayout";
import StatusBadge from "../../components/doctor/StatusBadge";

import {
    DoctorProvider,
    useDoctor,
} from "../../context/DoctorContext";


function DashboardContent() {
    const {
        doctor,
        appointments,
        patients,
        loading,
        error,
    } = useDoctor();


    const visited =
        appointments.filter(
            (item) =>
                item.status === "Visited"
        ).length;


    const pending =
        appointments.filter(
            (item) =>
                item.status === "Not Visited"
        ).length;


    const today =
        new Date()
            .toISOString()
            .split("T")[0];


    const todayAppointments =
        appointments.filter(
            (item) =>
                item.date === today
        );


    return (
        <DoctorDashboardLayout
            doctorName={doctor.name}
            department={doctor.department}
        >
            <div className="mb-8">
                <p className="text-sm font-medium text-teal-700">
                    {doctor.department}
                </p>

                <h2 className="mt-1 text-2xl font-bold text-gray-900">
                    Welcome, {doctor.name}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Here is today's clinic overview.
                </p>
            </div>


            {error && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}


            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                <div className="rounded-2xl border border-gray-200 bg-white p-5">
                    <CalendarDays
                        size={22}
                        className="text-teal-700"
                    />

                    <p className="mt-4 text-sm text-gray-500">
                        Total Appointments
                    </p>

                    <p className="mt-1 text-2xl font-bold text-gray-900">
                        {appointments.length}
                    </p>
                </div>


                <div className="rounded-2xl border border-gray-200 bg-white p-5">
                    <Users
                        size={22}
                        className="text-teal-700"
                    />

                    <p className="mt-4 text-sm text-gray-500">
                        Clinic Patients
                    </p>

                    <p className="mt-1 text-2xl font-bold text-gray-900">
                        {patients.length}
                    </p>
                </div>


                <div className="rounded-2xl border border-gray-200 bg-white p-5">
                    <UserCheck
                        size={22}
                        className="text-green-600"
                    />

                    <p className="mt-4 text-sm text-gray-500">
                        Visited
                    </p>

                    <p className="mt-1 text-2xl font-bold text-gray-900">
                        {visited}
                    </p>
                </div>


                <div className="rounded-2xl border border-gray-200 bg-white p-5">
                    <Clock
                        size={22}
                        className="text-orange-600"
                    />

                    <p className="mt-4 text-sm text-gray-500">
                        Pending
                    </p>

                    <p className="mt-1 text-2xl font-bold text-gray-900">
                        {pending}
                    </p>
                </div>

            </div>


            <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">

                <div className="mb-5 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                            Today's Appointments
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                            Appointments scheduled for today.
                        </p>
                    </div>

                    <Link
                        to="/doctor/appointments"
                        className="text-sm font-semibold text-teal-700 hover:text-teal-800"
                    >
                        View all →
                    </Link>
                </div>


                {loading ? (
                    <p className="text-sm text-gray-500">
                        Loading appointments...
                    </p>
                ) : todayAppointments.length ===
                  0 ? (
                    <p className="rounded-xl bg-gray-50 p-6 text-center text-sm text-gray-500">
                        No appointments scheduled for today.
                    </p>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {todayAppointments
                            .slice(0, 8)
                            .map(
                                (
                                    appointment
                                ) => (
                                    <div
                                        key={
                                            appointment.id
                                        }
                                        className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
                                    >
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <span className="rounded-lg bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-700">
                                                    {
                                                        appointment.time
                                                    }
                                                </span>

                                                <p className="font-semibold text-gray-900">
                                                    {
                                                        appointment.patientName
                                                    }
                                                </p>
                                            </div>

                                            <p className="mt-1 text-sm text-gray-500">
                                                {
                                                    appointment.reason
                                                }
                                            </p>
                                        </div>

                                        <StatusBadge
                                            status={
                                                appointment.status
                                            }
                                        />
                                    </div>
                                )
                            )}
                    </div>
                )}

            </section>


            <section className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900">
                    Clinic Management
                </h3>

                <div className="mt-4 grid gap-4 md:grid-cols-2">

                    <Link
                        to="/doctor/patients"
                        className="rounded-2xl border border-gray-200 bg-white p-6 transition hover:border-teal-200 hover:bg-teal-50"
                    >
                        <Users
                            size={24}
                            className="text-teal-700"
                        />

                        <h4 className="mt-4 font-semibold text-gray-900">
                            Patient Management
                        </h4>

                        <p className="mt-1 text-sm text-gray-500">
                            View and manage all clinic patients.
                        </p>
                    </Link>


                    <Link
                        to="/doctor/vaccinations"
                        className="rounded-2xl border border-gray-200 bg-white p-6 transition hover:border-teal-200 hover:bg-teal-50"
                    >
                        <Syringe
                            size={24}
                            className="text-teal-700"
                        />

                        <h4 className="mt-4 font-semibold text-gray-900">
                            Vaccination Management
                        </h4>

                        <p className="mt-1 text-sm text-gray-500">
                            Register vaccinations and manage reminders.
                        </p>
                    </Link>

                </div>
            </section>
        </DoctorDashboardLayout>
    );
}


export default function DoctorDashboard() {
    return (
        <DoctorProvider>
            <DashboardContent />
        </DoctorProvider>
    );
}