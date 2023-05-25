from django.db import models
from tmdb.models import Genre
from django.contrib.auth import get_user_model

class Question(models.Model):
    question = models.CharField(max_length=255)
    category = models.CharField(max_length=50, null=True)
    option1 = models.CharField(max_length=100)
    option2 = models.CharField(max_length=100)
    option3 = models.CharField(max_length=100)
    option4 = models.CharField(max_length=100)
   
    option1_genre = models.ForeignKey(Genre, on_delete=models.CASCADE, null=True, blank=True, related_name='option1_questions')
    option2_genre = models.ForeignKey(Genre, on_delete=models.CASCADE, null=True, blank=True, related_name='option2_questions')
    option3_genre = models.ForeignKey(Genre, on_delete=models.CASCADE, null=True, blank=True, related_name='option3_questions')  
    option4_genre = models.ForeignKey(Genre, on_delete=models.CASCADE, null=True, blank=True, related_name='option4_questions')

class UserAnswer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    chosen_option = models.CharField(max_length=100)
