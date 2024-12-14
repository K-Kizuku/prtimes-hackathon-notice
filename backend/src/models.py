from sqlmodel import SQLModel, Field
from typing import Optional
import uuid
import datetime


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

class ItemBase(SQLModel):
    title: str
    description: str
    image: str


class Item(ItemBase, table=True):
    id: uuid.UUID = Field(primary_key=True)
    user_id: uuid.UUID

class ItemCreate(ItemBase):
    pass

class ItemUpdate(ItemBase):
    pass

class ItemPublic(ItemBase):
    id: uuid.UUID
    user_id: uuid.UUID


class UserBase(SQLModel):
    email: str
    name: str
    image: str
    is_company: bool

class User(UserBase, table=True):
    id: uuid.UUID = Field(primary_key=True)
    hashed_password: str

class UserCreate(UserBase):
    password: str


class UserPublic(UserBase):
    id: uuid.UUID


class Token(SQLModel):
    access_token: str
    token_type: str


class TokenData(SQLModel):
    email: str | None = None
