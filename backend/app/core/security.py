
from datetime import datetime, timedelta, timezone

from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError
from jose import JWTError, jwt

from app.core.config import settings


# Password hashing
pwd_context = PasswordHasher()


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(
    plain_password: str,
    hashed_password: str,
) -> bool:
    try:
        return pwd_context.verify(
            hashed_password,
            plain_password,
        )
    except VerifyMismatchError:
        return False


# JWT access token
def create_access_token(
    doctor_id: int,
) -> str:
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=settings.access_token_expire_minutes
    )

    payload = {
        "sub": str(doctor_id),
        "exp": expire,
    }

    return jwt.encode(
        payload,
        settings.jwt_secret_key,
        algorithm=settings.jwt_algorithm,
    )


def decode_access_token(token: str) -> int:
    try:
        payload = jwt.decode(
            token,
            settings.jwt_secret_key,
            algorithms=[settings.jwt_algorithm],
        )

        doctor_id = payload.get("sub")

        if doctor_id is None:
            raise ValueError("Invalid token")

        return int(doctor_id)

    except (JWTError, ValueError, TypeError) as exc:
        raise ValueError("Invalid or expired token") from exc

