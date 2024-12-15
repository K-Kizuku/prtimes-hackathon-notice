import datetime
import uuid

from pydantic import BaseModel, EmailStr, HttpUrl
from sqlmodel import Field, SQLModel


class MatchBase(SQLModel):
    topic_id: uuid.UUID
    item_id: uuid.UUID


class Match(MatchBase, table=True):
    id: uuid.UUID = Field(primary_key=True)
    user_id: uuid.UUID


class MatchCreate(MatchBase):
    pass


class MatchUpdate(MatchBase):
    pass


class MatchPublic(MatchBase):
    id: uuid.UUID
    user_id: uuid.UUID
