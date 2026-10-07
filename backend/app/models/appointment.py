from datetime import date, datetime

from sqlalchemy import (
    Date,
    DateTime,
    ForeignKey,
    String,
    Text,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.database import Base


class Appointment(Base):
    __tablename__ = "appointments"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    doctor_id: Mapped[int | None] = mapped_column(
        ForeignKey("doctors.id"),
        nullable=True,
        index=True,
    )

    patient_id: Mapped[int] = mapped_column(
        ForeignKey("patients.id"),
        nullable=False,
        index=True,
    )

    appointment_date: Mapped[date] = mapped_column(
        Date,
        nullable=False,
        index=True,
    )

    appointment_time: Mapped[str] = mapped_column(
        String(10),
        nullable=False,
    )

    reason: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    status: Mapped[str] = mapped_column(
        String(30),
        default="Not Visited",
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    doctor = relationship(
        "Doctor",
        back_populates="appointments",
    )

    patient = relationship(
        "Patient",
        back_populates="appointments",
    )