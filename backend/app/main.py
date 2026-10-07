from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.core.config import settings
from app.db.database import Base, engine
import app.db.base

from app.routers.auth import router as auth_router
from app.routers.appointment import router as appointments_router
from app.routers.vaccination import (
    router as vaccinations_router,
)
from fastapi.middleware.cors import CORSMiddleware


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)

    yield


app = FastAPI(
    title=settings.app_name,
    description="Backend API for SHIVVAY Mother and Child Health Clinic",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PATCH"],
    allow_headers=["Authorization", "Content-Type"],
)


app.include_router(auth_router)
app.include_router(appointments_router)
app.include_router(vaccinations_router)

@app.get("/")
def root():
    return {
        "message": "SHIVVAY backend is running",
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
    }