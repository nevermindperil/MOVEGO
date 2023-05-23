from django.db import models
from django.conf import settings
from tmdb.models import Genre


class EgoType(models.Model):
    egotype_name = models.CharField(max_length=100)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    genres = models.ManyToManyField(Genre)

def __str__(self):
    return self.egotype_name



class EgoTypeCompatibility(models.Model):
    ego_type_a = models.ForeignKey(EgoType, related_name='compatibilities_a', on_delete=models.CASCADE)
    ego_type_b = models.ForeignKey(EgoType, related_name='compatibilities_b', on_delete=models.CASCADE)
    compatibility = models.TextField()


