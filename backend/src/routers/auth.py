from datetime import datetime, timedelta, timezone
from typing import Annotated

from fastapi import Depends, APIRouter, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session

from database import get_session
from models import User, Token
from controllers import authenticate_user, create_access_token, get_current_user


router = APIRouter(tags=["auth"])

@router.post("/token")
def route_login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Annotated[Session, Depends(get_session)],
) -> Token:
    user = authenticate_user(db, form_data.username, form_data.password)
    access_token = create_access_token(data={"sub": user.email})
    return Token(access_token=access_token, token_type="bearer")
