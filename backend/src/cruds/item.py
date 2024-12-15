import uuid
from datetime import datetime
from typing import Annotated

import stripe
from fastapi import Depends, FastAPI, HTTPException
from sqlmodel import Session, SQLModel, select
from src.controllers import get_current_user
from src.database import engine, get_session
from src.models import (Item, ItemCreate, ItemPublic, ItemUpdate, Match,
                        MatchCreate, MatchPublic, MatchUpdate, Topic,
                        TopicCreate, TopicPublic, TopicUpdate, User)


def create_item(db: Session, item: Item, user: User):
    id = uuid.uuid4()
    user_id = user.id

    db_item = Item(
        title=item.title,
        description=item.description,
        image=item.image,
        user_id=user_id,
        id=id,
    )

    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


def get_items(db: Session):
    statement = select(Item)
    results = db.exec(statement).all()
    return results


def get_item(db: Session, item_id: str):
    return db.get(Item, item_id)


def update_item(db: Session, item: Item, updated_item: ItemUpdate):
    for key, value in updated_item.dict(exclude_unset=True).items():
        setattr(item, key, value)
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


def delete_item(db: Session, item: Item):
    db.delete(item)
    db.commit()
