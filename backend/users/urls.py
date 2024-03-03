from django.urls import path
import users.views as UserViews

urlpatterns = [
    path('signin', UserViews.UserSignin.as_view(), name="signin"),
    path('signup', UserViews.UserSignUp.as_view(), name="signup"),
    path('signout', UserViews.Signout.as_view(), name="signout"),
    path('send_vc', UserViews.SendVC.as_view(), name="send_vc"),
    path('check_vc', UserViews.VCCheck.as_view(), name="check_vc"),
    path('get_profile', UserViews.GetProfile.as_view(), name="get_profile")
]