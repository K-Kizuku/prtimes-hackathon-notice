from fastapi import APIRouter, Depends
from typing import Annotated
from sqlmodel import select
from sqlmodel import Session
from fastapi.security import OAuth2PasswordRequestForm
from datetime import datetime, timedelta

from database import get_session
from models import User, UserCreate, UserPublic
from cruds import get_user, create_user, get_user_by_email
from controllers import get_current_user

router = APIRouter(tags=["user"])

@router.get("/users/me", response_model=UserPublic)
def route_read_users_me(
    current_user: Annotated[User, Depends(get_current_user)],
) -> User:
    return current_user

@router.get("/users/{id}", response_model=UserPublic)
def route_read_user(
    db: Annotated[Session, Depends(get_session)],
    id: str,
) -> User:
    return get_user(db, id)


@router.post("/users", response_model=UserPublic)
def route_create_user(
    db: Annotated[Session, Depends(get_session)],
    user: UserCreate,
) -> User:
    return create_user(db, user)

