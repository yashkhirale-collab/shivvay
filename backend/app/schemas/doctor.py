from pydantic import BaseModel


class DoctorPublicResponse(BaseModel):
    id: int
    full_name: str
    department: str

    model_config = {
        "from_attributes": True
    }