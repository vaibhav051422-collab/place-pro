from app.database.connection import engine, Base

from app.models.user import User
from app.models.resume import Resume


def init_db():
	Base.metadata.create_all(bind=engine)


if __name__ == "__main__":
	init_db()
	print("Tables Created Successfully")