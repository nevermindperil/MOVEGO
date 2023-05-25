from django.urls import path
from .views import user_answer

urlpatterns = [
    # 다른 URL 패턴들...
    path('api/user-answer/', user_answer),
   
]
