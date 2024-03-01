from django.urls import path
import users.views as UserViews

urlpatterns = [
    path('get_csrf', UserViews.GetCsrf.as_view(), name="get_csrf"),
    path('signin', UserViews.UserSignin.as_view(), name="signin"),
    path('signup', UserViews.UserSignUp.as_view(), name="signup"),
    path('signout', UserViews.Signout.as_view(), name="signout"),
    path('send_vc', UserViews.VerificationCode.as_view(), name="send_vc"),
    path('get_profile', UserViews.GetProfile.as_view(), name="get_profile")
]