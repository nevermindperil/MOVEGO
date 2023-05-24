from django.urls import path
from egoexpand.views import user_answer

urlpatterns = [
    # 다른 URL 패턴들...
    path('api/user-answer/', user_answer),
    # path('api/process-answers', process_answers),
]
