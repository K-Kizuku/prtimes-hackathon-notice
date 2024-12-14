from fastapi import FastAPI, Depends

from datetime import datetime
from typing import Annotated
from sqlmodel import SQLModel
from database import engine
from models import Item, ItemCreate, ItemUpdate, ItemPublic, Topic, TopicCreate, TopicUpdate, TopicPublic, User, Match, MatchCreate, MatchUpdate, MatchPublic
from fastapi import FastAPI, HTTPException, Depends
from sqlmodel import Session, select
from database import engine, get_session
from models import SQLModel
from controllers import get_current_user

from database import get_session
from routers import user, auth
import uuid

app = FastAPI()

# https://qiita.com/siruku6/items/0bba21cb1def018e2e77

@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)

app = FastAPI()

# Initialize database tables
@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)

# Create Item
@app.post("/items/", response_model=ItemPublic)
def create_item(
    item: ItemCreate,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_session),
    ):

    id = uuid.uuid4()
    user_id = current_user.id

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

# Read All Items
@app.get("/items/", response_model=list[ItemPublic])
def read_items(session: Session = Depends(get_session)):
    statement = select(Item)
    results = session.exec(statement).all()
    return results

# Read Single Item by ID
@app.get("/items/{item_id}", response_model=ItemPublic)
def read_item(item_id: str, session: Session = Depends(get_session)):
    item = session.get(Item, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

# Update Item
@app.put("/items/{item_id}", response_model=ItemPublic)
def update_item(
        item_id: str,
        updated_item: ItemUpdate,
        current_user: Annotated[User, Depends(get_current_user)],
        session: Session = Depends(get_session)
    ):
    item = session.get(Item, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    for key, value in updated_item.dict(exclude_unset=True).items():
        setattr(item, key, value)
    session.add(item)
    session.commit()
    session.refresh(item)
    return item

# Delete Item
@app.delete("/items/{item_id}", response_model=dict)
def delete_item(
        item_id: str,
        current_user: Annotated[User, Depends(get_current_user)],
        session: Session = Depends(get_session)
    ):
    item = session.get(Item, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    session.delete(item)
    session.commit()
    return {"message": f"Item with ID {item_id} deleted successfully"}

# Create Topic
@app.post("/topics/", response_model=TopicPublic)
def create_topic(
    topic: TopicCreate,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_session),
    ):

    id = uuid.uuid4()
    user_id = current_user.id

    db_topic = Topic(
        title=topic.title,
        description=topic.description,
        image=topic.image,
        expires_at=topic.expires_at,
        user_id=user_id,
        id=id,
    )

    db.add(db_topic)
    db.commit()
    db.refresh(db_topic)
    return db_topic

# Read All Topics
@app.get("/topics/", response_model=list[TopicPublic])
def read_topics(session: Session = Depends(get_session)):
    statement = select(Topic).where(Topic.expires_at > datetime.utcnow())
    results = session.exec(statement).all()
    return results

# Read Single Topic by ID
@app.get("/topics/{topic_id}", response_model=TopicPublic)
def read_topic(topic_id: str, session: Session = Depends(get_session)):
    topic = session.get(Topic, topic_id)
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")
    return topic

# Update Topic
@app.put("/topics/{topic_id}", response_model=TopicPublic)
def update_topic(
        topic_id: str,
        updated_topic: TopicUpdate,
        current_user: Annotated[User, Depends(get_current_user)],
        session: Session = Depends(get_session)
    ):
    topic = session.get(Topic, topic_id)
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")
    for key, value in updated_topic.dict(exclude_unset=True).items():
        setattr(topic, key, value)
    session.add(topic)
    session.commit()
    session.refresh(topic)
    return topic

# Delete Topic
@app.delete("/topics/{topic_id}", response_model=dict)
def delete_topic(
        topic_id: str,
        current_user: Annotated[User, Depends(get_current_user)],
        session: Session = Depends(get_session)
    ):
    topic = session.get(Topic, topic_id)
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")
    session.delete(topic)
    session.commit()
    return {"message": f"Topic with ID {topic_id} deleted successfully"}


# Create Match
@app.post("/matchs/", response_model=MatchPublic)
def create_match(
    match: MatchCreate,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_session),
    ):

    id = uuid.uuid4()
    user_id = current_user.id

    db_match = Match(
        topic_id=match.topic_id,
        item_id=match.item_id,
        user_id=user_id,
        id=id,
    )

    db.add(db_match)
    db.commit()
    db.refresh(db_match)
    return db_match

# Read All Matchs
@app.get("/matchs/", response_model=list[MatchPublic])
def read_matchs(session: Session = Depends(get_session)):
    statement = select(Match)
    results = session.exec(statement).all()
    return results

# Read Single Match by ID
@app.get("/matchs/{match_id}", response_model=MatchPublic)
def read_match(match_id: str, session: Session = Depends(get_session)):
    match = session.get(Match, match_id)
    if not match:
        raise HTTPException(status_code=404, detail="Match not found")
    return match

# Update Match
@app.put("/matchs/{match_id}", response_model=MatchPublic)
def update_match(
        match_id: str,
        updated_match: MatchUpdate,
        current_user: Annotated[User, Depends(get_current_user)],
        session: Session = Depends(get_session)
    ):
    match = session.get(Match, match_id)
    if not match:
        raise HTTPException(status_code=404, detail="Match not found")
    for key, value in updated_match.dict(exclude_unset=True).items():
        setattr(match, key, value)
    session.add(match)
    session.commit()
    session.refresh(match)
    return match

# Delete Match
@app.delete("/matchs/{match_id}", response_model=dict)
def delete_match(
        match_id: str,
        current_user: Annotated[User, Depends(get_current_user)],
        session: Session = Depends(get_session)
    ):
    match = session.get(Match, match_id)
    if not match:
        raise HTTPException(status_code=404, detail="Match not found")
    session.delete(match)
    session.commit()
    return {"message": f"Match with ID {match_id} deleted successfully"}


app.include_router(user.router)
app.include_router(auth.router)
