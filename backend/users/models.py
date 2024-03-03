from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

# this is the model for each user
# Attributes:
# username
# full_name
# email
# password
# is_staff
# is_active
# verified
# last_submission
# last_login
# date_joined
class User(AbstractUser):
    full_name = models.CharField(max_length=80, default=None)
    verified = models.BooleanField(default=False)
    last_submission = models.DateTimeField(default=None, null=True)

    # get rid of unnecessary fields
    first_name = None
    last_name = None
    groups = None
    user_permissions = None
    
    def __str__(self):
        return self.full_name

# verification code for when user signs up
class VerificationCode(models.Model):
    code = models.CharField(max_length=6, default=None)
    user = models.ForeignKey(
        "User",
        on_delete=models.CASCADE
    )
    time_created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.code

