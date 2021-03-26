from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from .serializers import BusinessCardSerializer
from .models import BusinessCard

from rest_framework_simplejwt import authentication
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def current_card(request):
    # Determine current user by token and return data
    authentication_classes = [authentication.JWTAuthentication]
    serializer = BusinessCardSerializer
    return Response(serializer.data)

# Create your views here.
class BusinessCardView(viewsets.ModelViewSet):
    serializer_class = BusinessCardSerializer
    queryset = BusinessCard.objects.all()
