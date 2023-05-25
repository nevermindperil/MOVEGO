from django.urls import path
from tmdb.views import movie_list, movie_detail
from . import views

app_name = 'tmdb'

urlpatterns = [
    path('movies/', movie_list, name='movie-list'),
    path('movies/<int:movie_pk>/', movie_detail, name='movie-detail'),
    path('movies/reviews/<int:movie_id>/', views.review_list),
    path('reviews/<int:review_id>/', views.review_detail),
    path('movies/<int:movie_id>/reviews/', views.review_create),
]
