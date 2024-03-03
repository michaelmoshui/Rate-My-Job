from rest_framework.permissions import BasePermission
from django.http import JsonResponse

class VerificationCodePermission(BasePermission):
    def has_permission(self, request, view):
        # logic for checking if verification code can be sent
        # Return True if permission is granted, False otherwise
        if "new_sign_up" and "temp_user" in request.session:
            return True
        return False
