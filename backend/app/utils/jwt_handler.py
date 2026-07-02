from datetime import datetime, timedelta
import os

from dotenv import load_dotenv
from jose import jwt

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(
    os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 60)
)

print("\n========== JWT CONFIG ==========")
print("SECRET_KEY:", SECRET_KEY)
print("ALGORITHM:", ALGORITHM)
print("================================\n")


def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({"exp": expire})

    token = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    print("\n========== TOKEN CREATED ==========")
    print(token)
    print("===================================\n")

    return token


def verify_access_token(token: str):
    print("\n========== VERIFY TOKEN ==========")
    print("Received Token:")
    print(token)

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        print("\n✅ TOKEN VERIFIED")
        print("Payload:", payload)
        print("=================================\n")

        return payload

    except Exception as e:
        print("\n❌ TOKEN VERIFICATION FAILED")
        print("Exception Type:", type(e).__name__)
        print("Exception:", str(e))
        print("SECRET_KEY:", SECRET_KEY)
        print("ALGORITHM:", ALGORITHM)
        print("=================================\n")

        return None