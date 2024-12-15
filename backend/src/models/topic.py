import datetime
import uuid

from pydantic import BaseModel, EmailStr, HttpUrl
from sqlmodel import Field, SQLModel


class TopicBase(SQLModel):
    title: str
    description: str
    image: str
    expires_at: datetime.datetime


class Topic(TopicBase, table=True):
    id: uuid.UUID = Field(primary_key=True)
    user_id: uuid.UUID


class TopicCreate(TopicBase):
    pass


class TopicUpdate(TopicBase):
    pass


class TopicPublic(TopicBase):
    id: uuid.UUID
    user_id: uuid.UUID


