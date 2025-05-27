from django.urls import path
from . import views

urlpatterns = [
    path('submit/', views.submit_score),
    path('leaderboard/', views.leaderboard),
]
