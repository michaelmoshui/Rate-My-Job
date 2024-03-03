from rest_framework import serializers
from users.models import User
from rest_framework import status
from users.helpers import generateRandomName
from django.contrib.auth import authenticate

class UserSignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["email", "full_name", "password"]

    def create_user(self, data):

        email, full_name, password = data['email'], data['full_name'], data['password']

        existing_user = User.objects.filter(email__exact=email)
        print(existing_user)
        if len(existing_user) != 0:
            return {"message": "Email already exists", "user": None, "exist": True}
        else:
            # validate email ends with @utoronto.ca
            # domain = email.split("@")[-1]
            # if domain not in ['mail.utoronto.ca', 'utoronto.ca']:
            #     return {"message": "Please enter a UofT email"}, status.HTTP_400_BAD_REQUEST
            
            # create new username
            new_username = generateRandomName(full_name)
            while len(User.objects.filter(username__contains=new_username)) != 0:
                new_username = generateRandomName(full_name)
            
            # save user
            user = User.objects.create_user(full_name=full_name, email=email, username=new_username, password=password)
            return {"message": "Please enter the verification code sent to your email.", "user": user, "exist": False}

class UserSignInSerializer(serializers.Serializer):

    id = serializers.CharField(max_length=80)
    password = serializers.CharField(max_length=200)

    def signin(self, data):
        id, password = data['id'], data['password']
        # try authenticating through both username and email
        username_auth = authenticate(username=id, password=password)
        email_auth = authenticate(email=id, password=password)

        # check authentication
        if username_auth:
            return username_auth
        if email_auth:
            return email_auth      
        if not username_auth and not email_auth:
            return None
        
class GetProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'full_name']