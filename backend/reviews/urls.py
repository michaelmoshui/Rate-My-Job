from django.urls import path
import reviews.views as ReviewViews

urlpatterns = [
    path('submitreview', ReviewViews.SubmitReview.as_view(), name="submitreview"),
]