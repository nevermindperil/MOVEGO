from django.db import models
from django.contrib.auth.models import AbstractUser
from tmdb.models import Genre

class User(AbstractUser):
    nickname = models.CharField(max_length=20, null=True ) 
    followings = models.ManyToManyField('self', symmetrical=False, related_name='followers')
    like_genres = models.ManyToManyField(Genre, blank=True)

