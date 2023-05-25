from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Question, UserAnswer
# from ego.models import EgoType
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
# from django.db.models import Count

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
    
    # 질문에 답을 선택하지 않은 경우
    if not chosen_option:
        return Response({'message': 'Please select an option.'}, status=400)

    try:
        question = Question.objects.get(id=question_id)
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
        UserAnswer.objects.create(question_id=idx+1, chosen_option=val+1, user=user)

    return Response({'resonpose': 'ok'})

    # UserAnswer 테이블에서 q

