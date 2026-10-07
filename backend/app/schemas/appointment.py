from datetime import date

from pydantic import BaseModel, Field


class AppointmentCreateRequest(BaseModel):
    appointment_date: date

    appointment_time: str = Field(
        min_length=5,
        max_length=5,
    )

    patient_name: str = Field(
        min_length=2,
        max_length=150,
    )

    mobile: str = Field(
        min_length=10,
        max_length=20,
    )

    date_of_birth: date

    gender: str = Field(
        min_length=1,
        max_length=30,
    )

    reason_for_visit: str = Field(
        min_length=2,
        max_length=1000,
    )


class AppointmentResponse(BaseModel):
    id: int
    doctor_id: int | None
    patient_id: int
    appointment_date: date
    appointment_time: str
    reason: str
    status: str

    model_config = {
        "from_attributes": True,
    }


class AvailableSlotResponse(BaseModel):
    time: str
    available: bool