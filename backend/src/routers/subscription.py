from datetime import datetime, timedelta
from typing import Annotated

import stripe
from src.controllers import get_current_user
from src.cruds import (create_subscription, create_user, delete_subscription,
                   get_user, get_user_by_email)
from src.database import get_session
from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from src.models import (SubscriptionCreate, SubscriptionPublic, User, UserCreate,
                    UserPublic)
from pydantic import BaseModel, HttpUrl
from sqlmodel import Session, select

router = APIRouter(tags=["subscription"])


@router.post("/subscription", response_model=SubscriptionPublic)
def route_create_subscription(
    current_user: Annotated[User, Depends(get_current_user)],
    sub: SubscriptionCreate,
) -> dict:
    res = create_subscription(current_user, sub)
    return res


@router.delete("/subscription")
def route_delete_subscription(
    current_user: Annotated[User, Depends(get_current_user)],
) -> dict:

    delete_subscription(current_user)
    return {"message": "subscription  deleted successfully"}
