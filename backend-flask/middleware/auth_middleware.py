from functools import wraps
from flask import request, abort
from flask import current_app
from lib.cognito_verification import CognitoVerification
import os

cognito_verification = CognitoVerification(
  user_pool_id= os.getenv("AWS_COGNITO_USER_POOL_ID"),
  user_pool_client_id= os.getenv("AWS_COGNITO_USER_POOL_CLIENT_ID"),
  region= os.getenv("AWS_DEFAULT_REGION")
)

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if "Authorization" in request.headers:
            token = request.headers["Authorization"].split(" ")[1]
        if not token:
            return {
                "message": "Authentication Token is missing!",
                "data": None,
                "error": "Unauthorized"
            }, 401
        try:
            claims = cognito_verification.verify(token)
        except Exception as e:
            return {
                "message": "Something went wrong",
                "data": None,
                "error": str(e)
            }, 500

        return f(claims, *args, **kwargs)

    return decorated