import {
    Search,
    Users,
} from "lucide-react";

import { useState } from "react";
import { Link } from "react-router-dom";

import DoctorDashboardLayout from "../../components/doctor/DoctorDashboardLayout";

import {
    DoctorProvider,
    useDoctor,
} from "../../context/DoctorContext";


function PatientsContent() {
    const {
        doctor,
        patients,
        loading,
        error,
    } = useDoctor();

    const [search, setSearch] =
        useState("");


    const filtered =
        patients.filter((patient) =>
            patient.name
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );


    return (
        <DoctorDashboardLayout
            doctorName={doctor.name}
            department={doctor.department}
        >
            <div className="mb-8">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-700">
                        <Users size={22} />
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Patients
                        </h2>

                        <p className="text-sm text-gray-500">
                            All clinic patients.
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
                <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
                    Loading patients...
                </div>
            ) : filtered.length === 0 ? (
                <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
                    <p className="font-medium text-gray-900">
                        No patients found
                    </p>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2">
                    {filtered.map(
                        (patient) => (
                            <div
                                key={patient.id}
                                className="rounded-2xl border border-gray-200 bg-white p-5"
                            >
                                <h3 className="font-semibold text-gray-900">
                                    {
                                        patient.name
                                    }
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    DOB:{" "}
                                    {patient.dob}
                                </p>

                                <p className="mt-1 text-sm text-gray-500">
                                    Mobile:{" "}
                                    {patient.mobile}
                                </p>

                                <p className="mt-3 text-sm text-gray-600">
                                    {
                                        patient.reason
                                    }
                                </p>

                                <Link
                                    to={`/doctor/patients/${patient.id}`}
                                    className="mt-5 block w-full rounded-xl border border-teal-200 px-4 py-2.5 text-center text-sm font-semibold text-teal-700 hover:bg-teal-50"
                                >
                                    View Patient
                                </Link>
                            </div>
                        )
                    )}
                </div>
            )}
        </DoctorDashboardLayout>
    );
}


export default function DoctorPatients() {
    return (
        <DoctorProvider>
            <PatientsContent />
        </DoctorProvider>
    );
}