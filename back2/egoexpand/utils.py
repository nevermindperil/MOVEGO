from .models import Question
from tmdb.models import Movie

def get_option_ids(question, chosen_option):
    genre_id = None
    
    
    # 선택한 옵션에 따라 해당하는 필드의 값을 추출하여 반환
    if chosen_option == 'option1':
        genre_id = question.option1_genre_id
       
    elif chosen_option == 'option2':
        genre_id = question.option2_genre_id
       
    elif chosen_option == 'option3':
        genre_id = question.option3_genre_id
        
    elif chosen_option == 'option4':
        genre_id = question.option4_genre_id

    
    return genre_id


def get_recommended_movies(question, chosen_option):
    if chosen_option == 'option1':
        # Option 1에 대한 처리 로직 추가
        if question.option1_genre_id:
            movies = Movie.objects.filter(genre_id=question.option1_genre_id)
        else:
            movies = Movie.objects.none()
    elif chosen_option == 'option2':
        # Option 2에 대한 처리 로직 추가
        if question.option2_genre_id:
            movies = Movie.objects.filter(genre_id=question.option2_genre_id)
        
        else:
            movies = Movie.objects.none()
    elif chosen_option == 'option3':
        # Option 3에 대한 처리 로직 추가
        if question.option3_genre_id:
            movies = Movie.objects.filter(genre_id=question.option3_genre_id)
        else:
            movies = Movie.objects.none()
    elif chosen_option == 'option4':
        # Option 4에 대한 처리 로직 추가
        if question.option4_genre_id:
            movies = Movie.objects.filter(genre_id=question.option4_genre_id)
       
        else:
            movies = Movie.objects.none()
    else:
        movies = Movie.objects.none()
    
    movies = movies.order_by('-popularity')
    recommended_movies = movies[:3]
    
    return recommended_movies

