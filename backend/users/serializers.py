from rest_framework import serializers
from users.models import User

class UserSignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["email", "full_name", "password"]

class UserSignInSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["email", "username", "password"]