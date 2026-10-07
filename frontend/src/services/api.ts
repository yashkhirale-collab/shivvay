const API_BASE_URL = "http://127.0.0.1:8000";

export interface Doctor {
    id: number;
    full_name: string;
    department: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface LoginDoctor {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    department: string;
    is_active: boolean;
}

export interface LoginResponse {
    access_token: string;
    token_type: string;
    doctor: LoginDoctor;
}

export async function loginDoctor(
    data: LoginData
): Promise<LoginResponse> {
    const response = await fetch(
        `${API_BASE_URL}/api/auth/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.detail || "Invalid email or password"
        );
    }

    // Save JWT so it survives page refresh
    localStorage.setItem(
        "doctor_token",
        result.access_token
    );

    // Save doctor information if needed later
    localStorage.setItem(
        "doctor",
        JSON.stringify(result.doctor)
    );

    return result;
}

export interface RegisterDoctorData {
    full_name: string;
    email: string;
    phone: string;
    department: string;
    password: string;
}

export async function registerDoctor(
    data: RegisterDoctorData
): Promise<Doctor> {
    const response = await fetch(
        `${API_BASE_URL}/api/auth/register`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                full_name: data.full_name.trim(),
                email: data.email.trim().toLowerCase(),
                phone: data.phone.trim(),
                department: data.department,
                password: data.password,
            }),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.detail || "Doctor registration failed"
        );
    }

    return result;
}


export interface CreateAppointmentData {
    appointment_date: string;
    appointment_time: string;
    patient_name: string;
    mobile: string;
    date_of_birth: string;
    gender: string;
    reason_for_visit: string;
}

export interface AppointmentResponse {
    id: number;
    doctor_id: number | null;
    patient_id: number;
    appointment_date: string;
    appointment_time: string;
    reason: string;
    status: string;
}

export interface AvailableSlot {
    time: string;
    available: boolean;
}

export async function getAvailableSlots(
    appointmentDate: string
): Promise<AvailableSlot[]> {
    const response = await fetch(
        `${API_BASE_URL}/api/appointments/available-slots?appointment_date=${appointmentDate}`
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.detail ||
                "Unable to load available slots"
        );
    }

    return result;
}

export async function createAppointment(
    data: CreateAppointmentData
): Promise<AppointmentResponse> {
    const response = await fetch(
        `${API_BASE_URL}/api/appointments`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.detail ||
                "Unable to book appointment"
        );
    }

    return result;
}

export interface DoctorAppointmentResponse {
    id: number;
    doctor_id: number | null;
    patient_id: number;
    appointment_date: string;
    appointment_time: string;
    reason: string;
    status: string;
}

export async function getDoctorAppointments(): Promise<
    DoctorAppointmentResponse[]
> {
    const token = localStorage.getItem("doctor_token");

    if (!token) {
        throw new Error(
            "Doctor authentication token not found"
        );
    }

    const response = await fetch(
        `${API_BASE_URL}/api/appointments/doctor`,

        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.detail ||
            "Unable to load doctor appointments"
        );
    }

    return result;
}

export interface DoctorPatientResponse {
    id: number;
    full_name: string;
    mobile: string;
    date_of_birth: string;
    gender: string;
    reason_for_visit: string;
}

export async function getDoctorPatients(): Promise<
    DoctorPatientResponse[]
> {
    const token =
        localStorage.getItem("doctor_token");

    if (!token) {
        throw new Error(
            "Doctor authentication token not found"
        );
    }

    const response = await fetch(
        `${API_BASE_URL}/api/appointments/doctor/patients`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.detail ||
            "Unable to load doctor patients"
        );
    }

    return result;
}

export async function getDoctorPatient(
    patientId: number
): Promise<DoctorPatientResponse> {
    const token = localStorage.getItem("doctor_token");

    if (!token) {
        throw new Error(
            "Doctor authentication token not found"
        );
    }

    const response = await fetch(
        `${API_BASE_URL}/api/appointments/doctor/patients/${patientId}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.detail ||
                "Unable to load patient details"
        );
    }

    return result;
}


export async function markAppointmentVisited(
    appointmentId: number
): Promise<AppointmentResponse> {
    const token = localStorage.getItem("doctor_token");

    if (!token) {
        throw new Error("Doctor authentication token not found");
    }

    const response = await fetch(
        `${API_BASE_URL}/api/appointments/${appointmentId}/visited`,
        {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.detail ||
            "Unable to mark appointment as visited"
        );
    }

    return result;
}

export interface CreateVaccinationData {
    patient_id: number;
    vaccine: string;
    vaccination_date: string;
    reminder_enabled: boolean;
}

export interface VaccinationResponse {
    id: number;
    patient_id: number;
    vaccine: string;
    vaccination_date: string;
    reminder_date: string;
    reminder_enabled: boolean;
}

export async function createVaccination(
    data: CreateVaccinationData
): Promise<VaccinationResponse> {
    const token = localStorage.getItem("doctor_token");

    if (!token) {
        throw new Error(
            "Doctor authentication token not found"
        );
    }

    const response = await fetch(
        `${API_BASE_URL}/api/vaccinations`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.detail ||
                "Unable to register vaccination"
        );
    }

    return result;
}

export async function getVaccinations(): Promise<
    VaccinationResponse[]
> {
    const token = localStorage.getItem("doctor_token");

    if (!token) {
        throw new Error(
            "Doctor authentication token not found"
        );
    }

    const response = await fetch(
        `${API_BASE_URL}/api/vaccinations`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.detail ||
                "Unable to load vaccination records"
        );
    }

    return result;
}