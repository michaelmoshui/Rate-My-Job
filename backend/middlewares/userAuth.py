from users.models import User
from django.http import JsonResponse

class UserAuthMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.

    def __call__(self, request):
        # Code to be executed for each request before
        # the view (and later middleware) are called.
        # data = request.data
        # user = User.objects.get(username=data['username'])
        # if user != request.user:
        #     return JsonResponse({"message": "You are not authorized to submit a review."}, status=status.HTTP_401_UNAUTHORIZED)

        print(request)
        response = self.get_response(request)
        
        return response