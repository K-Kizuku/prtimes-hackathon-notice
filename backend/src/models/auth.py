import datetime
import uuid

from pydantic import BaseModel, EmailStr, HttpUrl
from sqlmodel import Field, SQLModel


class Token(SQLModel):
    access_token: str
    token_type: str


class TokenData(SQLModel):
    email: str | None = None


