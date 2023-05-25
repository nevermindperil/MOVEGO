from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Question, UserAnswer
from .utils import get_option_ids, get_recommended_movies
from .serializers import UserAnswerSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated




# 2. 서버에 사용자 응답 저장하는 함수

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_answer(request):
    # Vue.js에서 전송한 데이터 받기
    question_id = request.data.get('question_id')
    chosen_option = request.data.get('chosen_option')
    print('=================================================')
    # Question 객체와 선택한 옵션에 해당하는 genre_id, movie_id, actor_id 가져오기
    try:
        question = Question.objects.get(id=question_id)
        print('question========================', question)       
        print('chosen_option========================', chosen_option)
    except Question.DoesNotExist:
        return Response({'message': 'Question not found.'}, status=400)
    
    # 사용자 인증 여부 확인

    if request.user.is_authenticated:
        user = request.user
    else: 
        return Response({'message': 'Authentication required.'}, status=status.HTTP_401_UNAUTHORIZED)

    print(request.user.is_authenticated)
    data = {
        'question': question.id,
        'user': user.id,
    }
    
    print('>>>>>', user)
    for idx, val in enumerate(chosen_option):
        UserAnswer.objects.create(question_id=idx+1, chosen_option=val, user=user)

    return Response({'resonpose': 'ok'})