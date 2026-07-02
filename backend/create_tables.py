from app.database.connection import engine, Base

from app.models.user import User
from app.models.resume import Resume

Base.metadata.create_all(bind=engine)

print("Tables Created Successfully")