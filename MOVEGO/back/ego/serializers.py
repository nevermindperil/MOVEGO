from rest_framework import serializers
from .models import EgoType, EgoTypeCompatibility

class EgoTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EgoType
        fields = '__all__'

class EgoTypeCompatibilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = EgoTypeCompatibility
        fields = '__all__'
