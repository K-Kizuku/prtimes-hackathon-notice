from datetime import datetime, timedelta, timezone
from typing import Annotated

from src.controllers import (authenticate_user, create_access_token,
                         get_current_user)
from src.database import get_session
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from src.models import Token, User
from sqlmodel import Session

router = APIRouter(tags=["auth"])


@router.post("/token")
def route_login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Annotated[Session, Depends(get_session)],
) -> Token:
    user = authenticate_user(db, form_data.username, form_data.password)
    access_token = create_access_token(data={"sub": user.email})
    return Token(access_token=access_token, token_type="bearer")
