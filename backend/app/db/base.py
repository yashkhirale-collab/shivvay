from app.db.database import Base

from app.models.doctor import Doctor
from app.models.patient import Patient
from app.models.appointment import Appointment
from app.models.vaccination import Vaccination

__all__ = [
    "Base",
    "Doctor",
    "Patient",
    "Appointment",
    "Vaccination",
]