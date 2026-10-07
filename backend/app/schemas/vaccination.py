from datetime import date

from pydantic import BaseModel, Field


class VaccinationCreateRequest(BaseModel):
    patient_id: int

    vaccine: str = Field(
        min_length=2,
        max_length=100,
    )

    vaccination_date: date

    reminder_enabled: bool = True


class VaccinationResponse(BaseModel):
    id: int
    patient_id: int
    vaccine: str
    vaccination_date: date
    reminder_date: date
    reminder_enabled: bool

    model_config = {
        "from_attributes": True,
    }