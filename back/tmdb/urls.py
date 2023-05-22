from django.urls import path
from .views import MovieListAPIView, MovieDetailAPIView

app_name = 'tmdb'

urlpatterns = [
    path('movies/', MovieListAPIView.as_view(), name='movie-list'),
    path('movies/<int:movie_pk>/', MovieDetailAPIView.as_view(), name='movie-detail'),
]
