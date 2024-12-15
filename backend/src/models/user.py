
import datetime
import uuid

from pydantic import BaseModel, EmailStr, HttpUrl
from sqlmodel import Field, SQLModel


class UserBase(SQLModel):
    email: EmailStr
    name: str
    image: str
    is_company: bool


class User(UserBase, table=True):
    id: uuid.UUID = Field(primary_key=True)
    stripe_id: str
    hashed_password: str


class UserCreate(UserBase):
    password: str


class UserPublic(UserBase):
    id: uuid.UUID
    stripe_id: str
    is_active: bool
