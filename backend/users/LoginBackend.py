# custom authentication method that does username and email checking
from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
from django.db.models import Q

class LoginBackend(ModelBackend):
    def authenticate(self, request, email=None, username=None, password=None, **kwargs):
        UserModel = get_user_model()
        try:
            user = UserModel.objects.get(Q(email=email)|Q(username=username))
        except UserModel.DoesNotExist:
            return None
        else:
            if user.check_password(password):
                return user
            
    def get_user(self, user_id):
        UserModel = get_user_model()
        try:
            return UserModel.objects.get(pk=user_id)
        except UserModel.DoesNotExist:
            return None