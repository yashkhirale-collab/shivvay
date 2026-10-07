import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    CalendarDays,
    CheckCircle2,
    Clock3,
    Phone,
} from "lucide-react";

import { createAppointment } from "../services/api";

function getTodayDate(): string {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

export default function Appointment() {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");

    const [patientName, setPatientName] = useState("");
    const [phone, setPhone] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [gender, setGender] = useState("");
    const [reason, setReason] = useState("");

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [appointmentId, setAppointmentId] =
        useState<number | null>(null);

    const today = useMemo(() => getTodayDate(), []);

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");

        if (selectedDate === "") {
            setError("Please select an appointment date.");
            return;
        }

        if (selectedTime === "") {
            setError("Please select an appointment time.");
            return;
        }

        if (patientName.trim() === "") {
            setError("Please enter the patient's full name.");
            return;
        }

        if (phone.trim() === "") {
            setError("Please enter a mobile number.");
            return;
        }

        if (dateOfBirth === "") {
            setError(
                "Please select the patient's date of birth."
            );
            return;
        }

        if (gender === "") {
            setError("Please select gender.");
            return;
        }

        try {
            setSubmitting(true);

            const response = await createAppointment({
                appointment_date: selectedDate,
                appointment_time: selectedTime,
                patient_name: patientName.trim(),
                mobile: phone.trim(),
                date_of_birth: dateOfBirth,
                gender,
                reason_for_visit:
                    reason.trim() || "General consultation",
            });

            setAppointmentId(response.id);
            setSubmitted(true);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Unable to book the appointment."
            );
        } finally {
            setSubmitting(false);
        }
    };

    /*
     * Success screen
     */
    if (submitted) {
        return (
            <div className="min-h-screen bg-[#f8faf9] px-4 py-10">
                <div className="mx-auto flex min-h-[80vh] max-w-2xl items-center justify-center">
                    <div className="w-full rounded-3xl bg-white p-8 text-center shadow-lg sm:p-12">
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                            <CheckCircle2
                                size={44}
                                className="text-emerald-600"
                            />
                        </div>

                        <h1 className="text-3xl font-bold text-slate-800">
                            Appointment Booked Successfully
                        </h1>

                        <p className="mt-4 text-slate-600">
                            Your appointment request has been
                            successfully recorded.
                        </p>

                        {appointmentId !== null && (
                            <div className="mx-auto mt-6 max-w-sm rounded-2xl bg-teal-50 p-4">
                                <p className="text-sm text-slate-500">
                                    Appointment ID
                                </p>

                                <p className="mt-1 text-2xl font-bold text-teal-700">
                                    #{appointmentId}
                                </p>
                            </div>
                        )}

                        <div className="mt-8 space-y-2 text-sm text-slate-600">
                            <p>
                                <strong>Date:</strong>{" "}
                                {selectedDate}
                            </p>

                            <p>
                                <strong>Time:</strong>{" "}
                                {selectedTime}
                            </p>
                        </div>

                        <Link
                            to="/"
                            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white transition hover:bg-teal-700"
                        >
                            <ArrowLeft size={18} />
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8faf9]">
            {/* Header */}
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <Link
                        to="/"
                        className="flex items-center gap-2 font-semibold text-teal-700"
                    >
                        <ArrowLeft size={20} />
                        Back to Home
                    </Link>

                    <div className="text-right">
                        <p className="text-lg font-bold text-slate-800">
                            SHIVVAY
                        </p>

                        <p className="text-xs text-slate-500">
                            Mother and Child Health Clinic
                        </p>
                    </div>
                </div>
            </header>

            {/* Main */}
            <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8 text-center">
                    <p className="font-semibold uppercase tracking-wider text-teal-600">
                        Appointment
                    </p>

                    <h1 className="mt-2 text-3xl font-bold text-slate-800 sm:text-4xl">
                        Book Your Appointment
                    </h1>

                    <p className="mx-auto mt-3 max-w-2xl text-slate-600">
                        Choose an available date and time and
                        provide the required patient information.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="rounded-3xl bg-white p-5 shadow-lg sm:p-8"
                >
                    {/* Error */}
                    {error && (
                        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    {/* Date and Time */}
                    <section className="mt-10 border-t border-slate-200 pt-8">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                                <CalendarDays
                                    size={20}
                                    className="text-emerald-700"
                                />
                            </div>

                            <div>
                                <h2 className="font-bold text-slate-800">
                                    Date & Time
                                </h2>

                                <p className="text-sm text-slate-500">
                                    Clinic appointment hours: 10:00 AM
                                    to 8:00 PM.
                                </p>
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="appointment-date"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Appointment Date
                            </label>

                            <input
                                id="appointment-date"
                                type="date"
                                min={today}
                                value={selectedDate}
                                onChange={(event) => {
                                    setSelectedDate(
                                        event.target.value
                                    );
                                    setSelectedTime("");
                                    setError("");
                                }}
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 sm:max-w-xs"
                            />
                        </div>

                        <div className="mt-6">
                            <div className="mb-3 flex items-center gap-2">
                                <Clock3
                                    size={18}
                                    className="text-teal-600"
                                />

                                <p className="text-sm font-semibold text-slate-700">
                                    Appointment Time
                                </p>
                            </div>

                            {selectedDate === "" ? (
                                <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
                                    Please select an appointment
                                    date first.
                                </div>
                            ) : (
                                <div>
                                    <input
                                        id="appointment-time"
                                        type="time"
                                        min="10:00"
                                        max="20:00"
                                        step="300"
                                        value={selectedTime}
                                        onChange={(event) => {
                                            setSelectedTime(
                                                event.target.value
                                            );
                                            setError("");
                                        }}
                                        required
                                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 sm:max-w-xs"
                                    />

                                    <p className="mt-2 text-xs text-slate-500">
                                        Clinic hours: 10:00 AM – 8:00 PM
                                    </p>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Patient Information */}
                    <section className="mt-10 border-t border-slate-200 pt-8">
                        <div className="mb-6">
                            <h2 className="font-bold text-slate-800">
                                Patient Information
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Please enter the patient's basic
                                information.
                            </p>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            {/* Full Name */}
                            <div>
                                <label
                                    htmlFor="patient-name"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    Full Name
                                </label>

                                <input
                                    id="patient-name"
                                    type="text"
                                    value={patientName}
                                    onChange={(event) =>
                                        setPatientName(
                                            event.target.value
                                        )
                                    }
                                    placeholder="Enter patient name"
                                    maxLength={150}
                                    required
                                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                                />
                            </div>

                            {/* Mobile */}
                            <div>
                                <label
                                    htmlFor="mobile"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    Mobile Number
                                </label>

                                <div className="relative">
                                    <Phone
                                        size={18}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        id="mobile"
                                        type="tel"
                                        value={phone}
                                        onChange={(event) =>
                                            setPhone(
                                                event.target.value
                                            )
                                        }
                                        placeholder="Enter mobile number"
                                        maxLength={20}
                                        required
                                        className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                                    />
                                </div>
                            </div>

                            {/* DOB */}
                            <div>
                                <label
                                    htmlFor="date-of-birth"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    Date of Birth
                                </label>

                                <input
                                    id="date-of-birth"
                                    type="date"
                                    max={today}
                                    value={dateOfBirth}
                                    onChange={(event) =>
                                        setDateOfBirth(
                                            event.target.value
                                        )
                                    }
                                    required
                                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                                />
                            </div>

                            {/* Gender */}
                            <div>
                                <label
                                    htmlFor="gender"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    Gender
                                </label>

                                <select
                                    id="gender"
                                    value={gender}
                                    onChange={(event) =>
                                        setGender(
                                            event.target.value
                                        )
                                    }
                                    required
                                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                                >
                                    <option value="">
                                        Select gender
                                    </option>

                                    <option value="Female">
                                        Female
                                    </option>

                                    <option value="Male">
                                        Male
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>
                                </select>
                            </div>
                        </div>

                        {/* Reason */}
                        <div className="mt-5">
                            <label
                                htmlFor="reason"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Reason for Visit
                            </label>

                            <textarea
                                id="reason"
                                value={reason}
                                onChange={(event) =>
                                    setReason(event.target.value)
                                }
                                placeholder="Briefly describe the reason for consultation"
                                rows={4}
                                maxLength={1000}
                                className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                            />
                        </div>
                    </section>

                    {/* Clinic Information */}
                    <div className="mt-8 rounded-2xl bg-teal-50 p-5">
                        <h3 className="font-semibold text-teal-800">
                            Appointment Information
                        </h3>

                        <ul className="mt-2 space-y-1 text-sm text-teal-700">
                            <li>
                                • Appointment duration: 5 to 10 minutes
                            </li>

                            <li>
                                • Clinic hours: 10:00 AM – 8:00 PM
                            </li>

                            <li>
                                • Please arrive a few minutes before
                                your appointment.
                            </li>
                        </ul>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={submitting}
                        className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-4 font-bold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {submitting ? (
                            "Booking Appointment..."
                        ) : (
                            <>
                                <CalendarDays size={20} />
                                Book Appointment
                            </>
                        )}
                    </button>
                </form>
            </main>
        </div>
    );
}