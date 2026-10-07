import {
    useMemo,
    useState,
    type FormEvent,
} from "react";

import {
    CalendarDays,
    CheckCircle2,
    Phone,
    Search,
    Syringe,
    UserRound,
    MessageCircle,
} from "lucide-react";

import DoctorDashboardLayout from "../../components/doctor/DoctorDashboardLayout";

import {
    useDoctor,
    DoctorProvider
} from "../../context/DoctorContext";



import type { Patient } from "../../types";

function VaccinationContent() {
    const {
        doctor,
        patients,
        vaccinations,
        addVaccination,
        loading,
        error: doctorError,
    } = useDoctor();

    const [search, setSearch] = useState("");

    const [selectedPatient, setSelectedPatient] =
        useState<Patient | null>(null);

    const [vaccine, setVaccine] = useState("");

    const [date, setDate] = useState("");

    const [reminderEnabled, setReminderEnabled] =
        useState(true);

    const [message, setMessage] = useState("");

    const [error, setError] = useState("");

    const [saving, setSaving] = useState(false);

    /*
     * Search patients by:
     * 1. Patient name
     * 2. Mobile number
     */
    const filteredPatients = useMemo(() => {
        const searchValue =
            search.trim().toLowerCase();

        if (!searchValue) {
            return [];
        }

        return patients.filter((patient) => {
            const nameMatch =
                patient.name
                    .toLowerCase()
                    .includes(searchValue);

            const mobileMatch =
                patient.mobile
                    .toLowerCase()
                    .includes(searchValue);

            return nameMatch || mobileMatch;
        });
    }, [patients, search]);

    /*
     * Select patient.
     */
    const handleSelectPatient = (
        patient: Patient
    ) => {
        setSelectedPatient(patient);
        setSearch(patient.name);

        setMessage("");
        setError("");
    };

    /*
     * Clear selected patient.
     */
    const handleClearPatient = () => {
        setSelectedPatient(null);
        setSearch("");
        setMessage("");
        setError("");
    };

    /*
     * Find patient mobile number from backend-loaded patients.
     */
    const getPatientMobile = (
        patientId: string
    ) => {
        const patient = patients.find(
            (item) =>
                item.id === patientId
        );

        return patient?.mobile ?? "";
    };

    /*
     * Open WhatsApp with a pre-filled
     * vaccination reminder.
     *
     * This does NOT automatically send
     * the message.
     *
     * The doctor must press Send in WhatsApp.
     */
    const sendWhatsAppReminder = (
        patientName: string,
        mobile: string,
        vaccineName: string,
        vaccinationDate: string
    ) => {
        const cleanMobile =
            mobile.replace(/\D/g, "");

        if (!cleanMobile) {
            alert(
                "Patient mobile number is not available."
            );
            return;
        }

        /*
         * Indian mobile numbers:
         * If exactly 10 digits are stored,
         * add country code 91.
         *
         * If the database already contains
         * 91XXXXXXXXXX, keep it.
         */
        const whatsappNumber =
            cleanMobile.length === 10
                ? `91${cleanMobile}`
                : cleanMobile;

        /*
         * Convert YYYY-MM-DD into
         * DD/MM/YYYY for the message.
         */
        const formattedDate =
            vaccinationDate
                ? (() => {
                    const [
                        year,
                        month,
                        day,
                    ] =
                        vaccinationDate.split(
                            "-"
                        );

                    if (
                        year &&
                        month &&
                        day
                    ) {
                        return `${day}/${month}/${year}`;
                    }

                    return vaccinationDate;
                })()
                : vaccinationDate;

        const whatsappMessage =
            `Hello ${patientName},\n\n` +
            `This is a vaccination reminder from ` +
            `SHIVVAY Mother and Child Health Clinic.\n\n` +
            `Vaccine: ${vaccineName}\n` +
            `Vaccination Date: ${formattedDate}\n\n` +
            `Please visit the clinic as scheduled.\n\n` +
            `Thank you,\n` +
            `SHIVVAY Mother and Child Health Clinic`;

        const whatsappUrl =
            `https://wa.me/${whatsappNumber}` +
            `?text=${encodeURIComponent(
                whatsappMessage
            )}`;

        window.open(
            whatsappUrl,
            "_blank",
            "noopener,noreferrer"
        );
    };

    /*
     * Register vaccination.
     */
    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setMessage("");
        setError("");

        if (!selectedPatient) {
            setError(
                "Please search and select a patient."
            );
            return;
        }

        if (!vaccine) {
            setError(
                "Please select a vaccine."
            );
            return;
        }

        if (!date) {
            setError(
                "Please select the vaccination date."
            );
            return;
        }

        /*
         * Backend calculates:
         *
         * reminder_date =
         * vaccination_date - 1 day
         */
        try {
            setSaving(true);

            await addVaccination({
                id: "",
                patientId:
                    selectedPatient.id,
                patientName:
                    selectedPatient.name,
                vaccine,
                date,
                reminderDate: "",
                reminderEnabled,
            });

            setMessage(
                `Vaccination registered successfully for ${selectedPatient.name}.`
            );

            setSelectedPatient(null);
            setSearch("");
            setVaccine("");
            setDate("");
            setReminderEnabled(true);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Unable to register vaccination."
            );
        } finally {
            setSaving(false);
        }
    };

    return (
        <DoctorDashboardLayout
            doctorName={doctor.name}
            department={doctor.department}
        >
            <div className="space-y-6">

                {/* Page Header */}
                <div>
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                            <Syringe size={22} />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Vaccination Management
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                Search a patient and register their vaccination.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600">
                        Loading vaccination records...
                    </div>
                )}

                {/* Doctor/context error */}
                {doctorError && (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                        {doctorError}
                    </div>
                )}

                {/* Vaccination Form */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                    <h2 className="mb-6 text-lg font-semibold text-gray-900">
                        Register Vaccination
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Patient Search */}
                        <div className="relative">

                            <label
                                htmlFor="patient-search"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Search Patient
                            </label>

                            <div className="relative">

                                <Search
                                    size={19}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    id="patient-search"
                                    type="text"
                                    value={search}
                                    onChange={(event) => {
                                        setSearch(
                                            event.target.value
                                        );

                                        if (
                                            selectedPatient
                                        ) {
                                            setSelectedPatient(
                                                null
                                            );
                                        }

                                        setMessage("");
                                        setError("");
                                    }}
                                    placeholder="Search by patient name or mobile number"
                                    autoComplete="off"
                                    className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 text-gray-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                                />

                            </div>

                            {/* Search Results */}
                            {search.trim() &&
                                !selectedPatient && (
                                    <div className="absolute left-0 right-0 z-20 mt-2 max-h-64 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg">

                                        {filteredPatients.length >
                                            0 ? (
                                            filteredPatients.map(
                                                (patient) => (
                                                    <button
                                                        key={
                                                            patient.id
                                                        }
                                                        type="button"
                                                        onClick={() =>
                                                            handleSelectPatient(
                                                                patient
                                                            )
                                                        }
                                                        className="flex w-full items-center gap-4 border-b border-gray-100 px-4 py-3 text-left transition last:border-0 hover:bg-teal-50"
                                                    >

                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                                                            <UserRound
                                                                size={
                                                                    18
                                                                }
                                                            />
                                                        </div>

                                                        <div className="min-w-0">

                                                            <p className="font-medium text-gray-900">
                                                                {
                                                                    patient.name
                                                                }
                                                            </p>

                                                            <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">

                                                                <Phone
                                                                    size={
                                                                        13
                                                                    }
                                                                />

                                                                <span>
                                                                    {
                                                                        patient.mobile
                                                                    }
                                                                </span>

                                                            </div>

                                                        </div>

                                                    </button>
                                                )
                                            )
                                        ) : (
                                            <div className="px-4 py-4 text-sm text-gray-500">
                                                No patient found.
                                            </div>
                                        )}

                                    </div>
                                )}

                        </div>

                        {/* Selected Patient */}
                        {selectedPatient && (
                            <div className="rounded-xl border border-teal-200 bg-teal-50 p-5">

                                <div className="mb-4 flex items-center justify-between">

                                    <div className="flex items-center gap-2">

                                        <CheckCircle2
                                            size={19}
                                            className="text-teal-700"
                                        />

                                        <p className="font-semibold text-teal-900">
                                            Selected Patient
                                        </p>

                                    </div>

                                    <button
                                        type="button"
                                        onClick={
                                            handleClearPatient
                                        }
                                        className="text-sm font-medium text-teal-700 hover:text-teal-900"
                                    >
                                        Change
                                    </button>

                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">

                                    {/* Name */}
                                    <div className="flex items-center gap-3">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-teal-700">
                                            <UserRound
                                                size={18}
                                            />
                                        </div>

                                        <div>
                                            <p className="text-xs text-gray-500">
                                                Patient Name
                                            </p>

                                            <p className="font-semibold text-gray-900">
                                                {
                                                    selectedPatient.name
                                                }
                                            </p>
                                        </div>

                                    </div>

                                    {/* Mobile */}
                                    <div className="flex items-center gap-3">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-teal-700">
                                            <Phone
                                                size={18}
                                            />
                                        </div>

                                        <div>
                                            <p className="text-xs text-gray-500">
                                                Mobile Number
                                            </p>

                                            <p className="font-semibold text-gray-900">
                                                {
                                                    selectedPatient.mobile
                                                }
                                            </p>
                                        </div>

                                    </div>

                                </div>

                            </div>
                        )}

                        {/* Vaccine */}
                        <div>

                            <label
                                htmlFor="vaccine"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Vaccine
                            </label>

                            <select
                                id="vaccine"
                                value={vaccine}
                                onChange={(event) =>
                                    setVaccine(
                                        event.target.value
                                    )
                                }
                                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                            >

                                <option value="">
                                    Select vaccine
                                </option>

                                <option value="BCG">
                                    BCG
                                </option>

                                <option value="OPV">
                                    OPV
                                </option>

                                <option value="Hepatitis B">
                                    Hepatitis B
                                </option>

                                <option value="DPT">
                                    DPT
                                </option>

                                <option value="MMR">
                                    MMR
                                </option>

                                <option value="Rotavirus">
                                    Rotavirus
                                </option>

                                <option value="IPV">
                                    IPV
                                </option>

                                <option value="Hib">
                                    Hib
                                </option>

                                <option value="Typhoid">
                                    Typhoid
                                </option>

                                <option value="Influenza">
                                    Influenza
                                </option>

                                <option value="Other">
                                    Other
                                </option>

                            </select>

                        </div>

                        {/* Vaccination Date */}
                        <div>

                            <label
                                htmlFor="vaccination-date"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Vaccination Date
                            </label>

                            <div className="relative">

                                <CalendarDays
                                    size={19}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    id="vaccination-date"
                                    type="date"
                                    value={date}
                                    min={
                                        new Date()
                                            .toISOString()
                                            .split("T")[0]
                                    }
                                    onChange={(event) =>
                                        setDate(
                                            event.target.value
                                        )
                                    }
                                    className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 text-gray-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                                />

                            </div>

                        </div>

                        {/* WhatsApp Reminder */}
                        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 p-4 transition hover:bg-gray-50">

                            <input
                                type="checkbox"
                                checked={
                                    reminderEnabled
                                }
                                onChange={(event) =>
                                    setReminderEnabled(
                                        event.target.checked
                                    )
                                }
                                className="mt-1 h-4 w-4 accent-teal-600"
                            />

                            <div>

                                <p className="font-medium text-gray-900">
                                    Enable WhatsApp reminder
                                </p>

                                <p className="mt-1 text-sm text-gray-500">
                                    The reminder date will be
                                    scheduled one day before
                                    the vaccination date.
                                </p>

                            </div>

                        </label>

                        {/* Error */}
                        {error && (
                            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                                {error}
                            </div>
                        )}

                        {/* Success */}
                        {message && (
                            <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                                {message}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={saving}
                            className="rounded-xl bg-teal-700 px-6 py-3 font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                        >
                            {saving
                                ? "Registering..."
                                : "Register Vaccination"}
                        </button>

                    </form>

                </div>

                {/* Vaccination Records */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                    <div className="mb-5">

                        <h2 className="text-lg font-semibold text-gray-900">
                            Vaccination Records
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Recently registered vaccination records.
                        </p>

                    </div>

                    {vaccinations.length === 0 ? (
                        <div className="rounded-xl bg-gray-50 px-4 py-8 text-center text-sm text-gray-500">
                            No vaccination records found.
                        </div>
                    ) : (
                        <div className="space-y-3">

                            {vaccinations.map(
                                (record) => {
                                    const mobile =
                                        getPatientMobile(
                                            record.patientId
                                        );

                                    return (
                                        <div
                                            key={
                                                record.id
                                            }
                                            className="rounded-xl border border-gray-200 p-4"
                                        >

                                            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                                                {/* Patient + Vaccine */}
                                                <div className="flex items-center gap-3">

                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                                                        <Syringe
                                                            size={
                                                                18
                                                            }
                                                        />
                                                    </div>

                                                    <div>

                                                        <p className="font-semibold text-gray-900">
                                                            {
                                                                record.patientName
                                                            }
                                                        </p>

                                                        <p className="text-sm text-gray-500">
                                                            {
                                                                record.vaccine
                                                            }
                                                        </p>

                                                    </div>

                                                </div>

                                                {/* Date + Reminder */}
                                                <div className="text-sm text-gray-600 sm:text-right">

                                                    <p>
                                                        Vaccination:{" "}
                                                        <span className="font-medium text-gray-900">
                                                            {
                                                                record.date
                                                            }
                                                        </span>
                                                    </p>

                                                    <p className="mt-1">
                                                        Reminder:{" "}
                                                        <span className="font-medium text-gray-900">
                                                            {record.reminderEnabled
                                                                ? record.reminderDate
                                                                : "Disabled"}
                                                        </span>
                                                    </p>

                                                </div>

                                                {/* WhatsApp Button */}
                                                <button
                                                    type="button"
                                                    disabled={
                                                        !mobile
                                                    }
                                                    onClick={() =>
                                                        sendWhatsAppReminder(
                                                            record.patientName,
                                                            mobile,
                                                            record.vaccine,
                                                            record.date
                                                        )
                                                    }
                                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                                                    title={
                                                        mobile
                                                            ? "Open WhatsApp reminder"
                                                            : "Patient mobile number is not available"
                                                    }
                                                >
                                                    <MessageCircle
                                                        size={
                                                            18
                                                        }
                                                    />

                                                    WhatsApp Reminder
                                                </button>

                                            </div>

                                            {/* Missing mobile warning */}
                                            {!mobile && (
                                                <p className="mt-3 text-xs font-medium text-red-600">
                                                    Patient mobile number is not available.
                                                </p>
                                            )}

                                        </div>
                                    );
                                }
                            )}

                        </div>
                    )}

                </div>

            </div>
        </DoctorDashboardLayout>
    );
}


/*
 * clinic vaccination management
 */
export default function Vaccinations() {
    return (
        <DoctorProvider>
            <VaccinationContent />
        </DoctorProvider>
    );
}