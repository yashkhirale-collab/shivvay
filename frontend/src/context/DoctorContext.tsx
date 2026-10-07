import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";

import { toast } from "react-toastify";

import {
    createVaccination,
    getDoctorAppointments,
    getDoctorPatients,
    getVaccinations,
    markAppointmentVisited,
} from "../services/api";

import type {
    Appointment,
    Doctor,
    Patient,
    Vaccination,
} from "../types";


interface DoctorContextValue {
    doctor: Doctor;
    appointments: Appointment[];
    patients: Patient[];
    vaccinations: Vaccination[];
    loading: boolean;
    error: string;

    markVisited: (
        appointmentId: string
    ) => Promise<void>;

    addVaccination: (
        vaccination: Vaccination
    ) => Promise<void>;
}


const DoctorContext =
    createContext<DoctorContextValue | null>(null);


interface DoctorProviderProps {
    children: ReactNode;
}


function getLoggedInDoctor(): Doctor | null {
    const savedDoctor =
        localStorage.getItem("doctor");

    if (!savedDoctor) {
        return null;
    }

    try {
        const doctorData =
            JSON.parse(savedDoctor);

        return {
            id: String(doctorData.id),
            name: doctorData.full_name,
            qualification:
                doctorData.department === "Pediatrics"
                    ? "MBBS, MD (Pediatrics)"
                    : "MBBS, DGO",
            department:
                doctorData.department,
            experience:
                doctorData.department === "Pediatrics"
                    ? "10+ Years"
                    : "3+ Years",
            email: doctorData.email,
        };
    } catch {
        localStorage.removeItem("doctor");
        localStorage.removeItem("doctor_token");
        return null;
    }
}


export function DoctorProvider({
    children,
}: DoctorProviderProps) {
    const doctor = getLoggedInDoctor();

    const [appointments, setAppointments] =
        useState<Appointment[]>([]);

    const [patients, setPatients] =
        useState<Patient[]>([]);

    const [vaccinations, setVaccinations] =
        useState<Vaccination[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    useEffect(() => {
        if (!doctor) {
            window.location.href =
                "/doctor/login";
            return;
        }

        let cancelled = false;


        async function loadDoctorData() {
            try {
                setLoading(true);
                setError("");

                /*
                 * IMPORTANT:
                 *
                 * These APIs now return clinic-wide
                 * data for every authenticated doctor.
                 */
                const [
                    backendAppointments,
                    backendPatients,
                    backendVaccinations,
                ] = await Promise.all([
                    getDoctorAppointments(),
                    getDoctorPatients(),
                    getVaccinations(),
                ]);


                if (cancelled) {
                    return;
                }


                const mappedPatients: Patient[] =
                    backendPatients.map(
                        (patient) => ({
                            id: String(patient.id),
                            name: patient.full_name,
                            dob: patient.date_of_birth,
                            gender: patient.gender,
                            mobile: patient.mobile,
                            reason:
                                patient.reason_for_visit,
                        })
                    );


                const patientMap =
                    new Map(
                        mappedPatients.map(
                            (patient) => [
                                patient.id,
                                patient,
                            ]
                        )
                    );


                const mappedAppointments:
                    Appointment[] =
                    backendAppointments.map(
                        (appointment) => {
                            const patient =
                                patientMap.get(
                                    String(
                                        appointment.patient_id
                                    )
                                );

                            return {
                                id: String(
                                    appointment.id
                                ),
                                patientId: String(
                                    appointment.patient_id
                                ),
                                patientName:
                                    patient?.name ??
                                    `Patient #${appointment.patient_id}`,
                                date:
                                    appointment.appointment_date,
                                time:
                                    appointment.appointment_time,
                                reason:
                                    appointment.reason,
                                status:
                                    appointment.status ===
                                    "Visited"
                                        ? "Visited"
                                        : "Not Visited",
                                doctorId: String(
                                    appointment.doctor_id
                                ),
                            };
                        }
                    );


                const mappedVaccinations:
                    Vaccination[] =
                    backendVaccinations.map(
                        (vaccination) => {
                            const patient =
                                patientMap.get(
                                    String(
                                        vaccination.patient_id
                                    )
                                );

                            return {
                                id: String(
                                    vaccination.id
                                ),
                                patientId: String(
                                    vaccination.patient_id
                                ),
                                patientName:
                                    patient?.name ??
                                    `Patient #${vaccination.patient_id}`,
                                vaccine:
                                    vaccination.vaccine,
                                date:
                                    vaccination.vaccination_date,
                                reminderDate:
                                    vaccination.reminder_date,
                                reminderEnabled:
                                    vaccination.reminder_enabled,
                            };
                        }
                    );


                setPatients(mappedPatients);
                setAppointments(mappedAppointments);
                setVaccinations(mappedVaccinations);

            } catch (loadError) {
                if (cancelled) {
                    return;
                }

                console.error(
                    "Doctor data loading error:",
                    loadError
                );

                const message =
                    loadError instanceof Error
                        ? loadError.message
                        : "Unable to load doctor data.";

                setError(message);
                toast.error(message);

            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }


        loadDoctorData();


        return () => {
            cancelled = true;
        };

    }, [doctor?.id]);


    const markVisited = async (
        appointmentId: string
    ) => {
        try {
            const updatedAppointment =
                await markAppointmentVisited(
                    Number(appointmentId)
                );

            setAppointments((current) =>
                current.map((appointment) =>
                    appointment.id === appointmentId
                        ? {
                              ...appointment,
                              status:
                                  updatedAppointment.status ===
                                  "Visited"
                                      ? "Visited"
                                      : "Not Visited",
                          }
                        : appointment
                )
            );

            toast.success(
                "Appointment marked as visited."
            );

        } catch (error) {
            console.error(
                "Mark appointment visited error:",
                error
            );

            const message =
                error instanceof Error
                    ? error.message
                    : "Unable to mark appointment as visited.";

            setError(message);
            toast.error(message);
        }
    };


    const addVaccination = async (
        vaccination: Vaccination
    ) => {
        try {
            const savedVaccination =
                await createVaccination({
                    patient_id:
                        Number(
                            vaccination.patientId
                        ),
                    vaccine:
                        vaccination.vaccine,
                    vaccination_date:
                        vaccination.date,
                    reminder_enabled:
                        vaccination.reminderEnabled,
                });


            const patient =
                patients.find(
                    (item) =>
                        item.id ===
                        String(
                            savedVaccination.patient_id
                        )
                );


            const mappedVaccination:
                Vaccination = {
                    id: String(
                        savedVaccination.id
                    ),
                    patientId: String(
                        savedVaccination.patient_id
                    ),
                    patientName:
                        patient?.name ??
                        vaccination.patientName,
                    vaccine:
                        savedVaccination.vaccine,
                    date:
                        savedVaccination.vaccination_date,
                    reminderDate:
                        savedVaccination.reminder_date,
                    reminderEnabled:
                        savedVaccination.reminder_enabled,
                };


            setVaccinations((current) => [
                mappedVaccination,
                ...current,
            ]);

            toast.success(
                "Vaccination record added successfully."
            );

        } catch (error) {
            console.error(
                "Add vaccination error:",
                error
            );

            const message =
                error instanceof Error
                    ? error.message
                    : "Unable to add vaccination record.";

            setError(message);
            toast.error(message);

            throw error;
        }
    };


    if (!doctor) {
        return null;
    }


    const value = useMemo(
        () => ({
            doctor,
            appointments,
            patients,
            vaccinations,
            loading,
            error,
            markVisited,
            addVaccination,
        }),
        [
            doctor,
            appointments,
            patients,
            vaccinations,
            loading,
            error,
        ]
    );


    return (
        <DoctorContext.Provider value={value}>
            {children}
        </DoctorContext.Provider>
    );
}


export function useDoctor() {
    const context =
        useContext(DoctorContext);

    if (!context) {
        throw new Error(
            "useDoctor must be used inside DoctorProvider"
        );
    }

    return context;
}