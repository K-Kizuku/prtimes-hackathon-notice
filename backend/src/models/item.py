import datetime
import uuid

from pydantic import BaseModel, EmailStr, HttpUrl
from sqlmodel import Field, SQLModel


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
