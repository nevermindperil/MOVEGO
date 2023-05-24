from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Question, UserAnswer
from ego.models import EgoType
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_answer(request):
    # Vue.js에서 전송한 데이터 받기
    question_id = request.data.get('question_id')
    chosen_option = request.data.get('chosen_option')
    
    try:
        question = Question.objects.get(id=question_id)
    except Question.DoesNotExist:
        return Response({'message': 'Question not found.'}, status=400)
    
    # 사용자 인증 여부 확인
    if not request.user.is_authenticated:
        return Response({'message': 'Authentication required.'}, status=status.HTTP_401_UNAUTHORIZED)
    
    user = request.user
    
    # 사용자 응답 정보 저장
    for idx, val in enumerate(chosen_option):
        UserAnswer.objects.create(question=question, chosen_option=val, user=user)
    
    # 설문조사 결과 처리
    genre_answer = []
    
    # UserAnswer 테이블에서 해당 question_id에 대한 응답 정보 가져오기
    user_answers = UserAnswer.objects.filter(question_id=question_id)
    
    # 응답 정보의 option_genre_id 값을 genre_answer에 추가
    for answer in user_answers:
        if val := getattr(answer.question, f"option{answer.chosen_option}_genre_id"):
            genre_answer.append(val)
    
    # genre_answer에서 최빈값 찾기
    most_common_genre = max(set(genre_answer), key=genre_answer.count)
    
    # egotype_genre 테이블에서 genre_id 값과 일치하는 egotype_id 찾기
    egotype_id = EgoType.objects.filter(genres=most_common_genre).values('id').annotate(count=Count('id')).order_by('-count').first()
    
    if egotype_id:
        egotype_id = egotype_id['id']
    else:
        # 최빈값이 없는 경우에 대한 처리
        return Response({'message': 'No egotype found.'}, status=400)
    
    # egotype 테이블에서 egotype_id에 해당하는 egotype_name 찾기
    user_egotype = EgoType.objects.filter(id=egotype_id).values('egotype_name').first()
    
    if user_egotype:
        user_egotype = user_egotype['egotype_name']
    else:
        # egotype_name이 없는 경우에 대한 처리
        return Response({'message': 'No egotype name found.'}, status=400)
    
    # 응답 정보 반환
    return Response({'egotype_name': user_egotype})


# 10개 질문의 답변이