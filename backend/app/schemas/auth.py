from pydantic import BaseModel, EmailStr, Field


class DoctorRegisterRequest(BaseModel):
    full_name: str = Field(min_length=2, max_length=150)
    email: EmailStr
    phone: str = Field(min_length=10, max_length=20)
    department: str
    password: str = Field(min_length=8, max_length=128)


class DoctorLoginRequest(BaseModel):
    email: EmailStr
    password: str


class DoctorResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    phone: str
    department: str
    is_active: bool

    model_config = {
        "from_attributes": True,
    }


class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    doctor: DoctorResponse