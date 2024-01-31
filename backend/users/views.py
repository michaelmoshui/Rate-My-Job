import json
from django.http import HttpResponse, JsonResponse
# for development purpose exempt csrf protection
from django.views.decorators.csrf import csrf_exempt, csrf_protect, ensure_csrf_cookie
from users.models import User
from users.helpers import generateRandomName
from django.contrib.auth import authenticate, login, logout
from django.middleware.csrf import get_token
from rest_framework.parsers import JSONParser
from users.serializers import UserSignInSerializer, UserSignUpSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

# login function
def signin(request):
    try:
        data = json.loads(request.body)
        id, password = data.get("id"), data.get("password")

        # try authenticating through both username and email
        username_auth = authenticate(username=id, password=password)
        email_auth = authenticate(email=id, password=password)

        # check authentication
        if username_auth:
            login(request, username_auth)
            return HttpResponse(get_token(request), status=200)
        if email_auth:
            
            login(request, email_auth)
            print(get_token(request))
            print(get_token(request))
            print(get_token(request))
            return HttpResponse(get_token(request), status=200)
        if not username_auth and not email_auth:
            return HttpResponse({"message": "User does not exist", "user": None}, status=401)        
    except:
        return HttpResponse({"message": "Login error"}, status=500)
    
# sign up function
@csrf_exempt
@api_view(['POST'])
def signup(request):
    data = JSONParser().parse(request)
    serializer = UserSignUpSerializer(data=data)

    if serializer.is_valid():
        full_name, email, password = serializer["full_name"], serializer["email"], serializer["password"]

        if len(User.objects.filter(email__contains=email)) != 0:
            return JsonResponse({"message": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            # validate email ends with @utoronto.ca
            domain = email.split("@")[-1]
            if domain not in ['mail.utoronto.ca', 'utoronto.ca']:
                return JsonResponse({"message": "Please enter a UofT email"}, status=status.HTTP_400_BAD_REQUEST)
            
            # create new username
            new_username = generateRandomName(full_name)
            while len(User.objects.filter(username__contains=new_username)) != 0:
                new_username = generateRandomName(full_name)
            
            # save user
            User.objects.create_user(full_name=full_name, email=email, username=new_username, password=password)
            return JsonResponse({"message": "Please enter the verification code sent to your email.", "full_name": full_name}, status=status.HTTP_200_OK)
    else:
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# reset password function

# logout function
def logout(request):
    logout(request)
    return HttpResponse({"message": "Logout success."}, status=200)

# get profile function
    
# edit profile function