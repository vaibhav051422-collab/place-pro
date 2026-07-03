from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
import os

from app.routes.placement import router as placement_router
from app.routes.auth import router as auth_router
from app.routes.resume import router as resume_router
from app.routes.job import router as job_router

# Create uploads folder automatically
os.makedirs("uploads", exist_ok=True)

app = FastAPI(
    title="PlacePro AI API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Authentication
app.include_router(
    auth_router,
    prefix="/api/auth",
    tags=["Authentication"]
)

# Resume
app.include_router(
    resume_router,
    prefix="/api/resume",
    tags=["Resume"]
)

# Job Matching
app.include_router(
    job_router,
    prefix="/api/job",
    tags=["Job Matching"]
)

app.include_router(
    placement_router,
    prefix="/api/placement",
    tags=["Placement"]
)

@app.get("/")
def root():
    return {
        "message": "PlacePro AI Backend Running"
    }