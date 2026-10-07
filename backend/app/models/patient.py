from datetime import date, datetime

from sqlalchemy import Date, DateTime, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.database import Base


class Patient(Base):
    __tablename__ = "patients"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    doctor_id: Mapped[int | None] = mapped_column(
        ForeignKey("doctors.id"),
        nullable=True,
        index=True,
)

    full_name: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
    )

    mobile: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
        index=True,
    )

    date_of_birth: Mapped[date] = mapped_column(
        Date,
        nullable=False,
    )

    gender: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
    )

    reason_for_visit: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    doctor = relationship(
        "Doctor",
        back_populates="patients",
    )

    appointments = relationship(
        "Appointment",
        back_populates="patient",
    )

    vaccinations = relationship(
        "Vaccination",
        back_populates="patient",
    )