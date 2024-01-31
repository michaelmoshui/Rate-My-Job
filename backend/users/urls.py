from django.urls import path
import users.views as UserViews

urlpatterns = [
    path('signin', UserViews.signin),
    path('signup', UserViews.signup),
]