from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework import permissions
from rest_framework import response, decorators, permissions, status
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserCreateSerializer
from cards.models import BusinessCard

User = get_user_model()

@decorators.api_view(["POST"])
@decorators.permission_classes([permissions.AllowAny])
def registration(request):
    serializer = UserCreateSerializer(data=request.data)
    print(request)
    if not serializer.is_valid():
        return response.Response(serializer.errors, status.HTTP_400_BAD_REQUEST)        
    user = serializer.save()
    refresh = RefreshToken.for_user(user)
    print(user)
    res = {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }
    BusinessCard.objects.create(user_id=user)
    return response.Response(res, status.HTTP_201_CREATED)
# Create your views here.
