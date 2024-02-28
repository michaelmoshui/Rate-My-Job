from django.db import models
from reviews.ReviewModel import Review

# Create your models here.   
class CoopReview(Review):
    company_ID = models.ForeignKey(
        "Company",
        on_delete=models.CASCADE
    )
    salary = models.DecimalField(max_digits = 12, decimal_places = 2)
    

class ResearchReview(Review):
    research_group_ID = models.ForeignKey(
        "ResearchGroup",
        on_delete=models.CASCADE
    )
    funding = models.DecimalField(max_digits = 12, decimal_places = 2)

# company and research group tables, not much at the moment, but possibly expand in the future

class Company(models.Model):
    name = models.CharField(max_length=80)

    def __str__(self):
        return self.name
    
class ResearchGroup(models.Model):
    name = models.CharField(max_length=80)
    professor = models.CharField(max_length=80)

    def __str__(self):
        return self.name

