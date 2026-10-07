from datetime import date, timedelta
from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.doctor import Doctor
from app.models.patient import Patient
from app.models.vaccination import Vaccination
from app.schemas.vaccination import (
    VaccinationCreateRequest,
    VaccinationResponse,
)
from app.utils.auth import get_current_doctor


router = APIRouter(
    prefix="/api/vaccinations",
    tags=["Vaccinations"],
)


# ---------------------------------------------------------
# DOCTOR: CREATE VACCINATION
# ---------------------------------------------------------

@router.post(
    "",
    response_model=VaccinationResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_vaccination(
    data: VaccinationCreateRequest,
    current_doctor: Doctor = Depends(get_current_doctor),
    db: Session = Depends(get_db),
):
    # Any authenticated clinic doctor can manage vaccinations.

    patient = db.scalar(
        select(Patient).where(
            Patient.id == data.patient_id
        )
    )

    if patient is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found",
        )

    if data.vaccination_date < date.today():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Vaccination date cannot be in the past",
        )

    reminder_date = (
        data.vaccination_date - timedelta(days=1)
    )

    vaccination = Vaccination(
        patient_id=patient.id,
        vaccine=data.vaccine,
        vaccination_date=data.vaccination_date,
        reminder_date=reminder_date,
        reminder_enabled=data.reminder_enabled,
    )

    db.add(vaccination)

    db.commit()
    db.refresh(vaccination)

    return vaccination


# ---------------------------------------------------------
# DOCTOR: ALL VACCINATION RECORDS
# ---------------------------------------------------------

@router.get(
    "",
    response_model=List[VaccinationResponse],
)
def get_vaccinations(
    current_doctor: Doctor = Depends(get_current_doctor),
    db: Session = Depends(get_db),
):
    # Any authenticated clinic doctor can view
    # all vaccination records.

    vaccinations = db.scalars(
        select(Vaccination)
        .order_by(
            Vaccination.vaccination_date
        )
    ).all()

    return vaccinations