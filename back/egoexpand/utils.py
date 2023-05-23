from .models import Question, Movie

def get_option_ids(question, chosen_option):
    genre_id = None
    movie_id = None
    actor_id = None
    
    # 선택한 옵션에 따라 해당하는 필드의 값을 추출하여 반환
    if chosen_option == 'option1':
        genre_id = question.option1_genre_id
        movie_id = question.option1_movie_id
        actor_id = question.option1_actor_id
    elif chosen_option == 'option2':
        genre_id = question.option2_genre_id
        movie_id = question.option2_movie_id
        actor_id = question.option2_actor_id
    elif chosen_option == 'option3':
        genre_id = question.option3_genre_id
        movie_id = question.option3_movie_id
        actor_id = question.option3_actor_id
    elif chosen_option == 'option4':
        genre_id = question.option4_genre_id
        movie_id = question.option4_movie_id
        actor_id = question.option4_actor_id
    
    return genre_id, movie_id, actor_id


def get_recommended_movies(question, chosen_option):
    if chosen_option == 'option1':
        # Option 1에 대한 처리 로직 추가
        if question.option1_genre_id:
            movies = Movie.objects.filter(genre_id=question.option1_genre_id)
        elif question.option1_movie_id:
            movies = Movie.objects.filter(id=question.option1_movie_id)
        elif question.option1_actor_id:
            movies = Movie.objects.filter(actors__id=question.option1_actor_id)
        else:
            movies = Movie.objects.none()
    elif chosen_option == 'option2':
        # Option 2에 대한 처리 로직 추가
        if question.option2_genre_id:
            movies = Movie.objects.filter(genre_id=question.option2_genre_id)
        elif question.option2_movie_id:
            movies = Movie.objects.filter(id=question.option2_movie_id)
        elif question.option2_actor_id:
            movies = Movie.objects.filter(actors__id=question.option2_actor_id)
        else:
            movies = Movie.objects.none()
    elif chosen_option == 'option3':
        # Option 3에 대한 처리 로직 추가
        if question.option3_genre_id:
            movies = Movie.objects.filter(genre_id=question.option3_genre_id)
        elif question.option3_movie_id:
            movies = Movie.objects.filter(id=question.option3_movie_id)
        elif question.option3_actor_id:
            movies = Movie.objects.filter(actors__id=question.option3_actor_id)
        else:
            movies = Movie.objects.none()
    elif chosen_option == 'option4':
        # Option 4에 대한 처리 로직 추가
        if question.option4_genre_id:
            movies = Movie.objects.filter(genre_id=question.option4_genre_id)
        elif question.option4_movie_id:
            movies = Movie.objects.filter(id=question.option4_movie_id)
        elif question.option4_actor_id:
            movies = Movie.objects.filter(actors__id=question.option4_actor_id)
        else:
            movies = Movie.objects.none()
    else:
        movies = Movie.objects.none()
    
    movies = movies.order_by('-popularity')
    recommended_movies = movies[:3]
    
    return recommended_movies

