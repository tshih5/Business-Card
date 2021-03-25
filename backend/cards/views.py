from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from .serializers import BusinessCardSerializer
from .models import BusinessCard

# Create your views here.
class BusinessCardView(viewsets.ModelViewSet):
    serializer_class = BusinessCardSerializer
    queryset = BusinessCard.objects.all()

def index(request):
    return HttpResponse("Hello, you are at users index")