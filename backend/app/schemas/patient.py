from datetime import date

from pydantic import BaseModel


class PatientResponse(BaseModel):
    id: int
    full_name: str
    mobile: str
    date_of_birth: date
    gender: str
    reason_for_visit: str

    model_config = {
        "from_attributes": True,
    }