import datetime
import uuid

from pydantic import BaseModel, EmailStr, HttpUrl
from sqlmodel import Field, SQLModel


class SubscriptionCreate(BaseModel):
    success_url: HttpUrl


class SubscriptionPublic(BaseModel):
    url: HttpUrl
