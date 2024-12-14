from sqlmodel import SQLModel, create_engine, Session

# Database connection URL
DATABASE_URL = "postgresql://seed_db_owner:pigyYKLOv68W@ep-blue-poetry-a54e86fb.us-east-2.aws.neon.tech/seed_db?sslmode=require"

# Create the database engine
engine = create_engine(DATABASE_URL, echo=True)

# Dependency for database session
def get_session():
    with Session(engine) as session:
        yield session
