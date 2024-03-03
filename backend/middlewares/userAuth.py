from users.models import User
from django.http import JsonResponse
import json
from rest_framework import status

class UserAuthMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.

    def __call__(self, request):
        # Code to be executed for each request before
        if request.user.is_authenticated:
            body = json.loads(request.body)
            
            try:
                user = User.objects.get(email=body['username'])
                if user != request.user:
                    return JsonResponse({"message": "You are not authorized to complete this action."}, status=status.HTTP_401_UNAUTHORIZED)
            except:
                return JsonResponse({"message": "You are not authorized to complete this action."}, status=status.HTTP_401_UNAUTHORIZED)
        
        response = self.get_response(request)
        return response