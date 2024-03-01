from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.authentication import SessionAuthentication
from rest_framework import status
from reviews.serializers import ReviewSubmitSerializer
from reviews.helpers import term_check, get_term
from users.models import User
from django.core import serializers
from django.utils.decorators import method_decorator
from middlewares.userAuth import UserAuthMiddleware

# submit review function
class SubmitReview(APIView):
    permission_classes=(permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    @method_decorator(UserAuthMiddleware)
    def post(self, request):
        try:
            data = request.data
            
            # put this in a middleware in the near future!!!!!!!!!!
            user = User.objects.get(username=data['username'])
            if user != request.user:
                return JsonResponse({"message": "You are not authorized to submit a review."}, status=status.HTTP_401_UNAUTHORIZED)
            
            if term_check([data["termTime"], data["termYear"]]):
                data['termTime'] = get_term(data['termTime'])
            else:
                return JsonResponse({"message": "Please input valid start date"}, status=status.HTTP_400_BAD_REQUEST)
            
            serializer = ReviewSubmitSerializer(data=data)
            
            if serializer.is_valid():
                res = serializer.save_review(data['reviewType'], data)

                if res[0]:
                    return JsonResponse({"res": serializers.serialize('json', res[0]), "message": res[1]}, status=status.HTTP_200_OK)
                else:
                    return JsonResponse({"res": res[0],"message": res[1]}, status=status.HTTP_400_BAD_REQUEST)
            
            else:
                return JsonResponse(serializer.error_messages, status=status.HTTP_400_BAD_REQUEST)
        except:
            return JsonResponse({"message": "Internal server error encountered."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)