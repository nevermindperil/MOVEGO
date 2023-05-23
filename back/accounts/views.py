from django.shortcuts import render

from rest_framework.decorators import api_view

@api_view(['DELETE',])
def delete(request):
    request.user.delete()