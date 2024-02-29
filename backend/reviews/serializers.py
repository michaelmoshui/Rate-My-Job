from rest_framework import serializers
from reviews.models import CoopReview, ResearchReview, Company, ResearchGroup
from users.models import User

class ReviewSubmitSerializer(serializers.Serializer):

    location = serializers.CharField(max_length=100)
    company = serializers.CharField(max_length=100)
    jobTitle = serializers.CharField(max_length=100)
    overall = serializers.DecimalField(max_digits=2, decimal_places=1, max_value=5, min_value=0)
    salary = serializers.DecimalField(max_digits=12, decimal_places=2, min_value=0)
    skill = serializers.DecimalField(max_digits=2, decimal_places=1, max_value=5, min_value=0)
    interview = serializers.DecimalField(max_digits=2, decimal_places=1, max_value=5, min_value=0)
    culture = serializers.DecimalField(max_digits=2, decimal_places=1, max_value=5, min_value=0)
    mentorship = serializers.DecimalField(max_digits=2, decimal_places=1, max_value=5, min_value=0)
    additional = serializers.CharField(max_length=1000)
    termTime = serializers.ChoiceField(["spring", "summer", "winter"])
    termYear = serializers.IntegerField(min_value=0)
    workNum = serializers.IntegerField(min_value=0)
    duration = serializers.IntegerField(min_value=4)
    reviewType = serializers.ChoiceField(["job", "research"])
    
    def save_review(self, reviewType, data):
        try:
            # get user
            user = User.objects.get(username=data['username'])
            if reviewType == "job":
                try:
                    company = Company.objects.get(name=data['company'])
                except:
                    company = Company(name=data['company'])
                    company.save()
                finally:
                    new_coop = CoopReview(
                        location = data['location'],
                        company = company,
                        job_title = data['jobTitle'],
                        termTime = data['termTime'],
                        termYear = data['termYear'],
                        num_prev_workterms = data['workNum'],
                        duration = data['duration'],
                        rating = data['overall'],
                        interview_difficulty = data['interview'],
                        skill_building = data['skill'],
                        culture = data['culture'],
                        mentorship = data['mentorship'],
                        comments = data['additional'],
                        salary = data['salary'],
                        user = user
                    )
                    new_coop.save()
                    return [new_coop, "Job review successfully saved!"]
            elif reviewType == "research":
                try:
                    group = ResearchGroup.objects.get(name=data['company'])
                except:
                    group = ResearchGroup(name=data['company'])
                    group.save()
                finally:
                    new_research = ResearchReview(
                        location = data['location'],
                        research_group = group,
                        job_title = data['jobTitle'],
                        termTime = data['termTime'],
                        termYear = data['termYear'],
                        num_prev_workterms = data['workNum'],
                        duration = data['duration'],
                        rating = data['overall'],
                        interview_difficulty = data['interview'],
                        skill_building = data['skill'],
                        culture = data['culture'],
                        mentorship = data['mentorship'],
                        comments = data['additional'],
                        funding = data['salary'],
                        user = user
                    )
                    new_research.save()
                    return [new_research, "Research review successfully saved!"]
        except:
            return [None, "Review was not saved properly. Please try again."]