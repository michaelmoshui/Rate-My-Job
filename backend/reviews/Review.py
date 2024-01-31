from django.db import models

# abstract class for CoopReview and ResearchReview
class Review(models.Model):
    # user info
    time_updated = models.DateField(auto_now=True)
    user_ID = models.ForeignKey(
        "User",
        on_delete=models.SET_NULL
    )
    
    # background info
    job_title = models.CharField(max_length=80, default=None)
    source = models.CharField(max_length=50)
    location = models.CharField(max_length=100)
    duration = models.IntegerField()
    year_of_study = models.IntegerField()
    
    # opinions
    rating = models.IntegerField()
    interview_difficulty = models.IntegerField()
    skill_development = models.IntegerField()
    comments = models.CharField(max_length=1000)
    
    def __str__(self):
        return self.job_title
    
    class Meta:
        abstract = True