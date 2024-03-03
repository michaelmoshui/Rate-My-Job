from django.db import models
from users.models import User

# abstract class for CoopReview and ResearchReview
class Review(models.Model):
    # user info
    time_updated = models.DateField(auto_now=True)
    user = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True
    )
    
    # background info
    job_title = models.CharField(max_length=80, default=None)
    termTime = models.CharField(max_length=20)
    termYear = models.IntegerField(default=0)
    location = models.CharField(max_length=100)
    duration = models.IntegerField()
    num_prev_workterms = models.IntegerField(default=0)
    
    # opinions
    rating = models.DecimalField(max_digits=2, decimal_places=1)
    interview_difficulty = models.DecimalField(max_digits=2, decimal_places=1)
    skill_building = models.DecimalField(max_digits=2, decimal_places=1)
    culture = models.DecimalField(max_digits=2, decimal_places=1)
    mentorship = models.DecimalField(max_digits=2, decimal_places=1)
    comments = models.CharField(max_length=1000)
    
    def __str__(self):
        return self.job_title
    
    class Meta:
        abstract = True