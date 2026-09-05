from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
import os

from create_tables import init_db
from app.routes.roadmap import router as roadmap_router
from app.routes.ml import router as ml_router
from app.routes.company_match import router as company_match_router
from app.routes.improve import router as improve_router
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


@app.on_event("startup")
def create_tables_on_startup():
    init_db()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_origin_regex=r"https?://(localhost|127\.0\.0\.1)(:\d+)?",
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

app.include_router(
    improve_router,
    prefix="/api/resume",
    tags=["AI Resume Improvement"]
)

# Job Matching
app.include_router(
    job_router,
    prefix="/api/job",
    tags=["Job Matching"]
)

app.include_router(
    company_match_router,
    prefix="/api/company",
    tags=["Company Compatibility"]
)

app.include_router(
    placement_router,
    prefix="/api/placement",
    tags=["Placement"]
)

app.include_router(
    ml_router,
    prefix="/api/ml",
    tags=["Machine Learning"]
)

app.include_router(
    roadmap_router,
    prefix="/api/roadmap",
    tags=["Career Roadmap"]
)
@app.get("/")
def root():
    return {
        "message": "PlacePro AI Backend Running"
    }