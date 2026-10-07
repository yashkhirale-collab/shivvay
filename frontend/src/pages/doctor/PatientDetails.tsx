import {
    ArrowLeft,
    CalendarDays,
    Phone,
    UserRound,
} from "lucide-react";

import {
    Link,
    useParams,
} from "react-router-dom";

import {
    useEffect,
    useState,
} from "react";

import DoctorDashboardLayout from "../../components/doctor/DoctorDashboardLayout";

import {
    getDoctorPatient,
    getDoctorAppointments,
} from "../../services/api";

import type {
    Doctor,
    Appointment,
} from "../../types";


function getLoggedInDoctor(): Doctor | null {
    const saved =
        localStorage.getItem("doctor");

    if (!saved) {
        return null;
    }

    try {
        const data = JSON.parse(saved);

        return {
            id: String(data.id),
            name: data.full_name,
            qualification:
                data.department === "Pediatrics"
                    ? "MBBS, MD (Pediatrics)"
                    : "MBBS, DGO",
            department:
                data.department,
            experience:
                data.department === "Pediatrics"
                    ? "10+ Years"
                    : "3+ Years",
            email: data.email,
        };
    } catch {
        return null;
    }
}


interface PatientData {
    id: number;
    full_name: string;
    mobile: string;
    date_of_birth: string;
    gender: string;
    reason_for_visit: string;
}


export default function PatientDetails() {
    const { patientId } =
        useParams<{
            patientId: string;
        }>();

    const doctor =
        getLoggedInDoctor();


    const [patient, setPatient] =
        useState<PatientData | null>(
            null
        );

    const [appointments, setAppointments] =
        useState<Appointment[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    useEffect(() => {
        if (!patientId) {
            setError("Patient not found.");
            setLoading(false);
            return;
        }


        async function loadPatient() {
            try {
                setLoading(true);
                setError("");

                const [
                    backendPatient,
                    backendAppointments,
                ] = await Promise.all([
                    getDoctorPatient(
                        Number(patientId)
                    ),
                    getDoctorAppointments(),
                ]);


                setPatient(
                    backendPatient
                );


                const mapped: Appointment[] = backendAppointments
                    .filter(
                        (item) =>
                            String(item.patient_id) === patientId
                    )
                    .map((item) => ({
                        id: String(item.id),
                        patientId: String(item.patient_id),
                        patientName: backendPatient.full_name,
                        date: item.appointment_date,
                        time: item.appointment_time,
                        reason: item.reason,
                        status:
                            item.status === "Visited"
                                ? "Visited"
                                : "Not Visited",
                        doctorId:
                            item.doctor_id === null
                                ? ""
                                : String(item.doctor_id),
                    }));

                setAppointments(mapped);

            } catch (loadError) {
                setError(
                    loadError instanceof Error
                        ? loadError.message
                        : "Unable to load patient details."
                );
            } finally {
                setLoading(false);
            }
        }


        loadPatient();
    }, [patientId]);


    if (!doctor) {
        window.location.href =
            "/doctor/login";

        return null;
    }


    return (
        <DoctorDashboardLayout
            doctorName={doctor.name}
            department={doctor.department}
        >
            <Link
                to="/doctor/patients"
                className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-800"
            >
                <ArrowLeft size={17} />
                Back to Patients
            </Link>


            {loading ? (
                <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
                    Loading patient details...
                </div>
            ) : error ? (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            ) : patient ? (
                <div className="space-y-6">

                    <div className="rounded-2xl border border-gray-200 bg-white p-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                                <UserRound
                                    size={26}
                                />
                            </div>

                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {
                                        patient.full_name
                                    }
                                </h1>

                                <p className="text-sm text-gray-500">
                                    Patient ID:{" "}
                                    {patient.id}
                                </p>
                            </div>
                        </div>
                    </div>


                    <div className="grid gap-4 md:grid-cols-2">

                        <div className="rounded-2xl border border-gray-200 bg-white p-5">
                            <p className="text-xs text-gray-500">
                                Date of Birth
                            </p>

                            <p className="mt-1 font-semibold text-gray-900">
                                {
                                    patient.date_of_birth
                                }
                            </p>
                        </div>


                        <div className="rounded-2xl border border-gray-200 bg-white p-5">
                            <p className="text-xs text-gray-500">
                                Gender
                            </p>

                            <p className="mt-1 font-semibold text-gray-900">
                                {
                                    patient.gender
                                }
                            </p>
                        </div>


                        <div className="rounded-2xl border border-gray-200 bg-white p-5">
                            <div className="flex items-center gap-2">
                                <Phone
                                    size={17}
                                    className="text-teal-700"
                                />

                                <p className="text-xs text-gray-500">
                                    Mobile
                                </p>
                            </div>

                            <p className="mt-1 font-semibold text-gray-900">
                                {
                                    patient.mobile
                                }
                            </p>
                        </div>


                        <div className="rounded-2xl border border-gray-200 bg-white p-5">
                            <p className="text-xs text-gray-500">
                                Reason for Visit
                            </p>

                            <p className="mt-1 font-semibold text-gray-900">
                                {
                                    patient.reason_for_visit
                                }
                            </p>
                        </div>

                    </div>


                    <div className="rounded-2xl border border-gray-200 bg-white p-6">
                        <div className="flex items-center gap-2">
                            <CalendarDays
                                size={20}
                                className="text-teal-700"
                            />

                            <h2 className="text-lg font-semibold text-gray-900">
                                Appointment History
                            </h2>
                        </div>


                        {appointments.length ===
                            0 ? (
                            <p className="mt-5 rounded-xl bg-gray-50 p-5 text-center text-sm text-gray-500">
                                No appointments found.
                            </p>
                        ) : (
                            <div className="mt-5 divide-y divide-gray-100">
                                {appointments.map(
                                    (
                                        appointment
                                    ) => (
                                        <div
                                            key={
                                                appointment.id
                                            }
                                            className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between"
                                        >
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {
                                                        appointment.date
                                                    }{" "}
                                                    ·{" "}
                                                    {
                                                        appointment.time
                                                    }
                                                </p>

                                                <p className="mt-1 text-sm text-gray-500">
                                                    {
                                                        appointment.reason
                                                    }
                                                </p>
                                            </div>

                                            <span className="text-sm font-medium text-gray-600">
                                                {
                                                    appointment.status
                                                }
                                            </span>
                                        </div>
                                    )
                                )}
                            </div>
                        )}
                    </div>

                </div>
            ) : null}
        </DoctorDashboardLayout>
    );
}