from datetime import date, datetime, time, timedelta
from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.appointment import Appointment
from app.models.doctor import Doctor
from app.models.patient import Patient
from app.schemas.appointment import (
    AppointmentCreateRequest,
    AppointmentResponse,
    AvailableSlotResponse,
)
from app.schemas.patient import PatientResponse
from app.utils.auth import get_current_doctor


router = APIRouter(
    prefix="/api/appointments",
    tags=["Appointments"],
)


def generate_time_slots():
    slots = []

    current = datetime.combine(
        date.today(),
        time(10, 0),
    )

    end = datetime.combine(
        date.today(),
        time(20, 0),
    )

    while current <= end:
        slots.append(
            current.strftime("%I:%M %p")
        )
        current += timedelta(minutes=5)

    return slots


ALLOWED_SLOTS = generate_time_slots()


# ---------------------------------------------------------
# PUBLIC: AVAILABLE SLOTS
# ---------------------------------------------------------

@router.get(
    "/available-slots",
    response_model=List[AvailableSlotResponse],
)
def get_available_slots(
    appointment_date: date,
    db: Session = Depends(get_db),
):
    appointments = db.scalars(
        select(Appointment).where(
            Appointment.appointment_date == appointment_date,
        )
    ).all()

    booked_slots = {
        appointment.appointment_time
        for appointment in appointments
    }

    return [
        AvailableSlotResponse(
            time=slot,
            available=slot not in booked_slots,
        )
        for slot in ALLOWED_SLOTS
    ]


# ---------------------------------------------------------
# PUBLIC: CREATE APPOINTMENT
# ---------------------------------------------------------

@router.post(
    "",
    response_model=AppointmentResponse,
    status_code=201,
)
def create_appointment(
    data: AppointmentCreateRequest,
    db: Session = Depends(get_db),
):
    try:
        appointment_time = datetime.strptime(
            data.appointment_time,
            "%H:%M",
        ).time()

    except ValueError:
        raise HTTPException(
            status_code=400,
            detail="Invalid appointment time",
        )

    if (
        appointment_time < time(10, 0)
        or appointment_time > time(20, 0)
    ):
        raise HTTPException(
            status_code=400,
            detail="Appointment time must be between 10:00 AM and 8:00 PM",
        )

    today = datetime.now().date()

    if data.appointment_date < today:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Appointment date cannot be in the past",
        )

    # Find existing patient by mobile + date of birth.
    existing_patient = db.scalar(
        select(Patient).where(
            Patient.mobile == data.mobile,
            Patient.date_of_birth == data.date_of_birth,
        )
    )

    if existing_patient:
        patient = existing_patient

        patient.full_name = data.patient_name
        patient.gender = data.gender
        patient.reason_for_visit = data.reason_for_visit

    else:
        patient = Patient(
            doctor_id=None,
            full_name=data.patient_name,
            mobile=data.mobile,
            date_of_birth=data.date_of_birth,
            gender=data.gender,
            reason_for_visit=data.reason_for_visit,
        )

        db.add(patient)
        db.flush()

    appointment = Appointment(
        doctor_id=None,
        patient_id=patient.id,
        appointment_date=data.appointment_date,
        appointment_time=data.appointment_time,
        reason=data.reason_for_visit,
        status="Not Visited",
    )

    db.add(appointment)

    try:
        db.commit()
        db.refresh(appointment)

    except IntegrityError:
        db.rollback()

        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="This appointment could not be booked",
        )

    return appointment
# ---------------------------------------------------------
# DOCTOR: ALL CLINIC APPOINTMENTS
# ---------------------------------------------------------

@router.get(
    "/doctor",
    response_model=List[AppointmentResponse],
)
def get_doctor_appointments(
    current_doctor: Doctor = Depends(get_current_doctor),
    db: Session = Depends(get_db),
):
    # Authentication is still required.
    # Data is intentionally NOT filtered by current_doctor.id.

    appointments = db.scalars(
        select(Appointment)
        .order_by(
            Appointment.appointment_date,
            Appointment.appointment_time,
        )
    ).all()

    return appointments


# ---------------------------------------------------------
# DOCTOR: ALL CLINIC PATIENTS
# ---------------------------------------------------------

@router.get(
    "/doctor/patients",
    response_model=List[PatientResponse],
)
def get_doctor_patients(
    current_doctor: Doctor = Depends(get_current_doctor),
    db: Session = Depends(get_db),
):
    # All authenticated doctors can see all clinic patients.

    patients = db.scalars(
        select(Patient)
        .order_by(Patient.full_name)
    ).all()

    return patients


# ---------------------------------------------------------
# DOCTOR: PATIENT DETAILS
# ---------------------------------------------------------

@router.get(
    "/doctor/patients/{patient_id}",
    response_model=PatientResponse,
)
def get_patient_details(
    patient_id: int,
    current_doctor: Doctor = Depends(get_current_doctor),
    db: Session = Depends(get_db),
):
    # Do not restrict patient by doctor_id.
    # Any authenticated clinic doctor can view the patient.

    patient = db.scalar(
        select(Patient).where(
            Patient.id == patient_id
        )
    )

    if patient is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found",
        )

    return patient


# ---------------------------------------------------------
# DOCTOR: MARK ANY CLINIC APPOINTMENT AS VISITED
# ---------------------------------------------------------

@router.patch(
    "/{appointment_id}/visited",
    response_model=AppointmentResponse,
)
def mark_appointment_visited(
    appointment_id: int,
    current_doctor: Doctor = Depends(get_current_doctor),
    db: Session = Depends(get_db),
):
    # Any authenticated clinic doctor can mark
    # a clinic appointment as visited.

    appointment = db.scalar(
        select(Appointment).where(
            Appointment.id == appointment_id
        )
    )

    if appointment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Appointment not found",
        )

    appointment.status = "Visited"

    db.commit()
    db.refresh(appointment)

    return appointment