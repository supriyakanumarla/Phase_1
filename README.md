# Ticket Management System (Backend)

## Overview

The Ticket Management System is a backend service that allows organizations to create, assign, and manage support tickets.

This project is part of a microservice architecture where:

- **RBAC Service** manages authentication, users, roles, and permissions.
- **Ticket Management Service** manages tickets, interactions, and attachments.

Both services share the same PostgreSQL database while maintaining independent migration histories.

---

# Project Objective

The objective of this service is to:

- Create support tickets
- Assign tickets to staff
- Track ticket interactions
- Store ticket attachments
- Integrate with the RBAC service using shared models

---

# Project Structure

```
backend/
│
├── alembic/                 # Database migrations
│   ├── versions/
│   └── env.py
│
├── app/
│   ├── api/                 # API routes
│   ├── core/                # Configuration
│   ├── database/            # Database connection
│   ├── models/              # SQLAlchemy models
│   ├── repositories/        # Database operations
│   ├── schemas/             # Pydantic schemas
│   ├── services/            # Business logic
│   └── main.py              # FastAPI entry point
│
├── .env
├── alembic.ini
└── requirements.txt
```

---

# Technologies Used

- Python 3.12+
- FastAPI
- SQLAlchemy 2.0
- Alembic
- PostgreSQL (Neon)
- Pydantic

---

# Clone Repository

```bash
git clone <repository-url>
```

Example

```bash
git clone https://github.com/supriyakanumarla/Phase-1.git
```

Move into the project

```bash
cd ticket-management
```

---

# Create Virtual Environment

Windows

```bash
python -m venv .venv
```

Activate

```bash
.venv\Scripts\activate
```

Linux / macOS

```bash
python3 -m venv .venv

source .venv/bin/activate
```

---

# Install Dependencies

```bash
pip install -r requirements.txt
```

---

# Configure Environment Variables

Create a `.env` file inside the backend folder.

Example

```env
APP_NAME=Ticket Management System
APP_ENV=development
DEBUG=True

DATABASE_URL=<your_async_database_url>

ALEMBIC_DATABASE_URL=<your_psycopg2_database_url>

LOG_LEVEL=INFO
```

---

# Run Database Migrations

Move to backend

```bash
cd backend
```

Run

```bash
alembic upgrade head
```

---

# Run the Project

```bash
uvicorn app.main:app --reload
```

Server runs at

```
http://127.0.0.1:8000
```

Swagger UI

```
http://127.0.0.1:8000/docs
```

ReDoc

```
http://127.0.0.1:8000/redoc
```

---

# Database

This service uses a shared PostgreSQL database.

Ticket Management owns the following tables:

- tickets
- interactions
- attachments

User-related tables are managed by the RBAC service through shared models.

---

# Migrations

Initial migration is created manually.

Future schema changes should use:

```bash
alembic revision --autogenerate -m "migration_message"

alembic upgrade head
```

---

# Shared Models

This project imports shared models from the `shared_models` package.

Shared models include:

- User
- Role
- Base
- TimestampMixin

These models are maintained by the RBAC team.

---

# Phase 1 Features

- Ticket creation
- Ticket assignment
- Ticket interactions
- Ticket attachments
- Shared RBAC integration
- PostgreSQL database integration
- Alembic migrations

---

# Team Architecture

```
                Shared PostgreSQL (Neon)

               ┌─────────────────────┐
               │     RBAC Service    │
               │---------------------│
               │ Users               │
               │ Roles               │
               │ Permissions         │
               └──────────┬──────────┘
                          │
                Shared Models Package
                          │
               ┌──────────┴──────────┐
               │ Ticket Management   │
               │---------------------│
               │ Tickets             │
               │ Interactions        │
               │ Attachments         │
               └─────────────────────┘
```

---

# Author

Ticket Management Team