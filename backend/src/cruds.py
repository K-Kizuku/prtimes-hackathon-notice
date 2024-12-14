from sqlmodel import Session, select
from fastapi import Depends, APIRouter, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from typing import Annotated
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta, timezone
import uuid

from models import User, UserCreate
from utils import hash_password


def get_user(db: Session, id: str) -> User:
    return db.get(User, id)

def get_user_by_email(db: Session, email: str) -> User:
    statement = select(User).where(User.email == email)
    results = db.exec(statement)
    return results.first()


def create_user(db: Session, user: UserCreate) -> User:
    hashed_password = hash_password(user.password)
    id = uuid.uuid4()

    db_user = User(
        email=user.email,
        name=user.name,
        is_company=user.is_company,
        image=user.image,
        id=id,
        hashed_password=hashed_password,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
