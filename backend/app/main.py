from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.agent import router as agent_router
from app.api.email import router as email_router
from app.core.config import get_settings

from app.api.ticket import router as ticket_router

settings = get_settings()

app = FastAPI(
    title=settings.app_name,
    version="1.0.0",
)

# ---------------------------------------------------------
# CORS
#
# Allows the React demo frontend (running on a different
# origin/port during development) to call this API. Without
# this, browsers block every cross-origin request after a
# failed OPTIONS preflight (405), even though the same
# request works fine from Swagger UI or curl.
# ---------------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------
# Routers
# ---------------------------------------------------------



app.include_router(email_router)

app.include_router(agent_router)

app.include_router(ticket_router)

# ---------------------------------------------------------
# Health Check
# ---------------------------------------------------------

@app.get("/")
async def root():
    return {
        "message": "Ticket Management Backend Running"
    }


@app.get("/health")
async def health():
    return {
        "status": "healthy"
    }