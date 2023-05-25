from django.urls import path
from tmdb.views import movie_list, movie_detail, create_comment, comment_list

app_name = 'tmdb'

urlpatterns = [
    path('movies/', movie_list, name='movie-list'),
    path('movies/<int:movie_pk>/', movie_detail, name='movie-detail'),
    path('movies/<int:movie_pk>/comments/create/', create_comment, name='create-comment'),
    path('movies/<int:movie_pk>/comments/', comment_list, name='comment-list'),
]
