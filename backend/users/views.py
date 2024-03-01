from django.http import JsonResponse
from users.serializers import UserSignInSerializer, UserSignUpSerializer, GetProfileSerializer
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.authentication import SessionAuthentication
from django.contrib.auth import login, logout
from rest_framework import status
from users.models import User
from users.permissions import VerificationCodePermission
from users.helpers import sendEmail, generateVC

# get the csrf token with a get request
class GetCsrf(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        return JsonResponse({'message': 'csrf token sent'}, status=status.HTTP_201_CREATED)


# login function
class UserSignin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        try:
            data = request.data
            serializer = UserSignInSerializer(data=data)

            if serializer.is_valid():
                user = serializer.signin(data)

                if user:
                    login(request, user)
                    return JsonResponse(serializer.data, status=200)
                else:
                    return JsonResponse({"message": "User does not exist"}, status=400)
            else:
                return JsonResponse(serializer.error_messages, status=500)
        except:
            return JsonResponse({"message": "Login error"}, status=500)
    
    
# sign up function not finished
class UserSignUp(APIView):
    permission_classes = (permissions.AllowAny,)
    
    def post(self, request):

        try:
            data = request.data

            serializer = UserSignUpSerializer(data=data)

            if serializer.is_valid():
                res, status = serializer.create_user(data)
                request.session['new_sign_up'] = True
                request.session['temp_user'] = res['user']
                return JsonResponse({'message': res["message"], 'user': res['user']}, status=201)
            else:
                return JsonResponse(serializer.error_messages, status=status.HTTP_400_BAD_REQUEST)
        except:
            return JsonResponse({'message': "internal server error."}, status=500)

# send verification code
class VerificationCode(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        try:
            # # no temp user, not from sign in
            # if 'temp_user' not in request.session:
            #     return JsonResponse({'message': 'You are not authorized to send verification code.'}, status=status.HTTP_403_FORBIDDEN)
            
            data = request.data

            # # request user does not match temp user from sign up
            # if request.session['temp_user'].email != data['email']:
            #     return JsonResponse({'message': 'You are not authorized to send verification code.'}, status=status.HTTP_403_FORBIDDEN)
            
            verification = generateVC()
            # send the email
            send_status = sendEmail(data['email'], data['fullName'], verification)

            if send_status:
                return JsonResponse({"message": "Verification Code sent"}, status=status.HTTP_200_OK)
            else:
                return JsonResponse({'message': "Something went wrong, request verification code again."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except:
            return JsonResponse({'message': "internal server error."}, status=500)

# confirm verification code
class VCCheck(APIView):
    permission_classes = (VerificationCodePermission,)

    def post(self, request):
        login(request, user)
        request.session['new_sign_up'] = False
        request.session['temp_user'] = None
        return JsonResponse({"message": "Successfully sign in!"}, status=status.HTTP_200_OK)
    
# reset password function
        
# logout function
class Signout(APIView):
    permission_classes = (permissions.AllowAny,)
    
    def post(self, request):
        logout(request)
        return JsonResponse({"message": "Successfully logged out"}, status=200)

# get profile function
class GetProfile(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    
    def post(self, request):
        # who is making the request
        request_user = request.user.username

        # who the profile is
        profile_user = request.data['username']

    
        if request_user != profile_user:
            return JsonResponse({"message": "Unauthroized to edit this profile"}, status=status.HTTP_403_FORBIDDEN)
        
        # proceed if they are the same
        try:
            user = User.objects.get(username=profile_user)
            serializer = GetProfileSerializer(user)
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return JsonResponse({"message": "This user does not exist"}, status=status.HTTP_404_NOT_FOUND)
    
            
    