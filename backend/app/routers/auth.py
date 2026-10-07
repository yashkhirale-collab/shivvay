from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.core.security import create_access_token, hash_password, verify_password
from app.db.database import get_db
from app.models.doctor import Doctor
from app.schemas.auth import (
    DoctorLoginRequest,
    DoctorRegisterRequest,
    DoctorResponse,
    TokenResponse,
)
from app.utils.auth import get_current_doctor

router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"],
)


@router.post(
    "/register",
    response_model=DoctorResponse,
    status_code=status.HTTP_201_CREATED,
)
def register_doctor(
    data: DoctorRegisterRequest,
    db: Session = Depends(get_db),
):
    email = data.email.strip().lower()

    existing_doctor = (
        db.query(Doctor)
        .filter(func.lower(Doctor.email) == email)
        .first()
    )

    if existing_doctor:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A doctor with this email already exists",
        )

    doctor = Doctor(
        full_name=data.full_name.strip(),
        email=email,
        phone=data.phone.strip(),
        department=data.department,
        password_hash=hash_password(data.password),
        is_active=True,
    )

    db.add(doctor)
    db.commit()
    db.refresh(doctor)

    return doctor


@router.post("/login", response_model=TokenResponse)
def login_doctor(
    data: DoctorLoginRequest,
    db: Session = Depends(get_db),
):
    email = data.email.strip().lower()

    doctor = (
        db.query(Doctor)
        .filter(func.lower(Doctor.email) == email)
        .first()
    )

    if doctor is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    if not doctor.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Doctor account is inactive",
        )

    if not verify_password(
        data.password,
        doctor.password_hash,
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    access_token = create_access_token(doctor.id)

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "doctor": doctor,
    }


@router.get(
    "/me",
    response_model=DoctorResponse,
)
def get_me(
    current_doctor: Doctor = Depends(get_current_doctor),
):
    return current_doctor