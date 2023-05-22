from django.db import models
from django.conf import settings

class Genre(models.Model):
    name = models.CharField(max_length=50)
    like_users = models.ManyToManyField(settings.AUTH_USER_MODEL)

class Actor(models.Model):
    name = models.CharField(max_length=50)
    like_users = models.ManyToManyField(settings.AUTH_USER_MODEL)

class Movie(models.Model):
    title = models.CharField(max_length=100)
    release_date = models.DateField(blank=True)
    popularity = models.FloatField()
    vote_count = models.IntegerField()
    vote_average = models.FloatField()
    overview = models.TextField()
    poster_path = models.CharField(max_length=200)
    youtube_key = models.CharField(max_length=100)
    genres = models.ManyToManyField(Genre)
    like_users = models.ManyToManyField(settings.AUTH_USER_MODEL)
    actors = models.ManyToManyField(Actor)