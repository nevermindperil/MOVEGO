from django.db import models
from django.contrib.auth import get_user_model

class Genre(models.Model):
    name = models.CharField(max_length=50)
    

class Actor(models.Model):
    name = models.CharField(max_length=50)
    

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
    actors = models.ManyToManyField(Actor)

class Comment(models.Model):
    movie = models.ForeignKey(Movie, related_name='comments', on_delete=models.CASCADE)
    content = models.TextField()
    user = models.ForeignKey(get_user_model(), related_name='comments', on_delete=models.CASCADE, null=True)