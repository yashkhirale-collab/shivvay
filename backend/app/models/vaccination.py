from datetime import date, datetime

from sqlalchemy import (
    Boolean,
    Date,
    DateTime,
    ForeignKey,
    String,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.database import Base


class Vaccination(Base):
    __tablename__ = "vaccinations"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    patient_id: Mapped[int] = mapped_column(
        ForeignKey("patients.id"),
        nullable=False,
        index=True,
    )

    vaccine: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    vaccination_date: Mapped[date] = mapped_column(
        Date,
        nullable=False,
    )

    reminder_date: Mapped[date] = mapped_column(
        Date,
        nullable=False,
    )

    reminder_enabled: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    patient = relationship(
        "Patient",
        back_populates="vaccinations",
    )