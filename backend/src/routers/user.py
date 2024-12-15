from datetime import datetime, timedelta
from typing import Annotated

from src.controllers import get_current_user
from src.cruds import (create_user, get_user, get_user_by_email,
                   is_subscription_paid)
from src.database import get_session
from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from src.models import User, UserCreate, UserPublic
from sqlmodel import Session, select

router = APIRouter(tags=["user"])


@router.get("/users/me", response_model=UserPublic)
def route_read_users_me(
    current_user: Annotated[User, Depends(get_current_user)],
) -> UserPublic:
    user_dic = current_user.dict()
    user_dic["is_active"] = is_subscription_paid(current_user)
    return UserPublic(**user_dic)


@router.get("/users/{id}", response_model=UserPublic)
def route_read_user(
    db: Annotated[Session, Depends(get_session)],
    id: str,
) -> UserPublic:

    user = get_user(db, id)
    user_dic = user.dict()
    user_dic["is_active"] = is_subscription_paid(user)
    return UserPublic(**user_dic)


@router.post("/users", response_model=UserPublic)
def route_create_user(
    db: Annotated[Session, Depends(get_session)],
    user: UserCreate,
) -> UserPublic:

    user = create_user(db, user)
    user_dic = user.dict()
    user_dic["is_active"] = False
    return UserPublic(**user_dic)
