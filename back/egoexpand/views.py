from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Question, UserAnswer
from .utils import get_option_ids, get_recommended_movies

class UserAnswerAPIView(APIView):
    def post(self, request):
        # Vue.js에서 전송한 데이터 받기
        question_id = request.data.get('question_id')
        chosen_option = request.data.get('chosen_option')
        
        # Question 객체와 선택한 옵션에 해당하는 genre_id, movie_id, actor_id 가져오기
        try:
            question = Question.objects.get(id=question_id)
            genre_id, movie_id, actor_id = get_option_ids(question, chosen_option)
        except Question.DoesNotExist:
            return Response({'message': 'Question not found.'}, status=400)
        
        # UserAnswer 객체 생성 및 저장
        user_answer = UserAnswer(question=question, user=request.user, chosen_option=chosen_option)
        user_answer.save()
        
        # genre에 like_users 필드가 있는 경우, 해당 genre에 현재 유저를 추가
        if genre_id:
            genre = question.option1_genre_id if chosen_option == 'option1' else \
                    question.option2_genre_id if chosen_option == 'option2' else \
                    question.option3_genre_id if chosen_option == 'option3' else \
                    question.option4_genre_id if chosen_option == 'option4' else None
            if genre:
                genre.like_users.add(request.user)
        
        # actor에 like_users 필드가 있는 경우, 해당 actor에 현재 유저를 추가
        if actor_id:
            actor = question.option1_actor_id if chosen_option == 'option1' else \
                    question.option2_actor_id if chosen_option == 'option2' else \
                    question.option3_actor_id if chosen_option == 'option3' else \
                    question.option4_actor_id if chosen_option == 'option4' else None
            if actor:
                actor.like_users.add(request.user)
        
        # movie에 like_users 필드가 있는 경우, 해당 movie에 현재 유저를 추가
        if movie_id:
            movie = question.option1_movie_id if chosen_option == 'option1' else \
                    question.option2_movie_id if chosen_option == 'option2' else \
                    question.option3_movie_id if chosen_option == 'option3' else \
                    question.option4_movie_id if chosen_option == 'option4' else None
            if movie:
                movie.like_users.add(request.user)
        
        # 영화 추천 알고리즘을 통해 추천 영화 가져오기
        recommended_movies = get_recommended_movies(question, chosen_option)
        
        return Response({'message': 'Answer submitted successfully.', 'recommended_movies': recommended_movies}, status=200)
