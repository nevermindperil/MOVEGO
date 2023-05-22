from django.db import models
from tmdb.models import Movie, Genre, Actor
from django.conf import settings

class Question(models.Model):
    question = models.CharField(max_length=255)
    category = models.CharField(max_length=50, null=True)
    option1 = models.CharField(max_length=100)
    option2 = models.CharField(max_length=100)
    option3 = models.CharField(max_length=100)
    option4 = models.CharField(max_length=100)
    option1_movie = models.ForeignKey(Movie, on_delete=models.CASCADE, null=True, blank=True, related_name='option1_questions')
    option1_actor = models.ForeignKey(Actor, on_delete=models.CASCADE, null=True, blank=True, related_name='option1_questions')
    option1_genre = models.ForeignKey(Genre, on_delete=models.CASCADE, null=True, blank=True, related_name='option1_questions')
    option2_movie = models.ForeignKey(Movie, on_delete=models.CASCADE, null=True, blank=True, related_name='option2_questions')
    option2_actor = models.ForeignKey(Actor, on_delete=models.CASCADE, null=True, blank=True, related_name='option2_questions')
    option2_genre = models.ForeignKey(Genre, on_delete=models.CASCADE, null=True, blank=True, related_name='option2_questions')
    option3_movie = models.ForeignKey(Movie, on_delete=models.CASCADE, null=True, blank=True, related_name='option3_questions')
    option3_actor = models.ForeignKey(Actor, on_delete=models.CASCADE, null=True, blank=True, related_name='option3_questions')
    option3_genre = models.ForeignKey(Genre, on_delete=models.CASCADE, null=True, blank=True, related_name='option3_questions')
    option4_movie = models.ForeignKey(Movie, on_delete=models.CASCADE, null=True, blank=True, related_name='option4_questions')
    option4_actor = models.ForeignKey(Actor, on_delete=models.CASCADE, null=True, blank=True, related_name='option4_questions')
    option4_genre = models.ForeignKey(Genre, on_delete=models.CASCADE, null=True, blank=True, related_name='option4_questions')



class UserAnswer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    chosen_option = models.CharField(max_length=100)