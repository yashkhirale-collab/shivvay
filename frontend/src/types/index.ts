export type Department =
    | "Pediatrics"
    | "Obstetrics & Gynaecology";

export type AppointmentStatus =
    | "Not Visited"
    | "Visited";

export interface Doctor {
    id: string;
    name: string;
    qualification: string;
    department: Department;
    experience: string;
    email: string;
}

export interface Appointment {
    id: string;
    patientId: string;
    patientName: string;
    date: string;
    time: string;
    reason: string;
    status: AppointmentStatus;
    doctorId: string;
}

export interface Patient {
    id: string;
    name: string;
    dob: string;
    gender: string;
    mobile: string;
    reason: string;
}

export interface Vaccination {
    id: string;
    patientId: string;
    patientName: string;
    vaccine: string;
    date: string;
    reminderDate: string;
    reminderEnabled: boolean;
}