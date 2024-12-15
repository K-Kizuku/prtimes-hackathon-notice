import uuid
from datetime import datetime, timedelta, timezone
from typing import Annotated

import stripe
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from src.models import SubscriptionCreate, SubscriptionPublic, User, UserCreate
from passlib.context import CryptContext
from sqlmodel import Session, select
from src.utils import hash_password
from src.cruds.subscription import create_stripe_customer


def get_user(db: Session, id: str) -> User:
    return db.get(User, id)


def get_user_by_email(db: Session, email: str) -> User:
    statement = select(User).where(User.email == email)
    results = db.exec(statement)
    return results.first()


def create_user(db: Session, user: UserCreate) -> User:
    hashed_password = hash_password(user.password)
    id = uuid.uuid4()

    res = create_stripe_customer(user)

    db_user = User(
        email=user.email,
        name=user.name,
        is_company=user.is_company,
        image=user.image,
        id=id,
        stripe_id=res.id,
        hashed_password=hashed_password,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
