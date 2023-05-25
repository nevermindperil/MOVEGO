from rest_framework import serializers
from .models import Question, UserAnswer
from accounts.serializers import UserSerializer


class UserAnswerSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = UserAnswer
        fields = '__all__'
        read_only_fields = ('user', 'question')

