from django.db import models
from users.models import User

# abstract class for CoopReview and ResearchReview
class Review(models.Model):
    # user info
    time_updated = models.DateField(auto_now=True)
    user_ID = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )
    
    # background info
    job_title = models.CharField(max_length=80, default=None)
    term = models.CharField(max_length=20)
    location = models.CharField(max_length=100)
    duration = models.IntegerField()
    num_prev_workterms = models.IntegerField()
    
    # opinions
    rating = models.IntegerField()
    interview_difficulty = models.IntegerField()
    skill_building = models.IntegerField()
    culture = models.IntegerField()
    mentorship = models.IntegerField()
    comments = models.CharField(max_length=1000)
    
    def __str__(self):
        return self.job_title
    
    class Meta:
        abstract = True