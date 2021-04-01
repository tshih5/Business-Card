from django.shortcuts import render
from rest_framework import viewsets, permissions
from .serializers import BusinessCardSerializer
from .models import BusinessCard
from rest_framework.exceptions import PermissionDenied, ParseError
from rest_framework.parsers import MultiPartParser, FormParser

# Create your views here.
class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user_id == request.user

class BusinessCardViewSet(viewsets.ModelViewSet):
    serializer_class = BusinessCardSerializer
    # only the user can edit their own items
    permission_classes = (IsOwner,)
    parser_classes = (MultiPartParser, FormParser, )

    # only return results relevant to the user.
    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            # return results by the user
            return BusinessCard.objects.filter(user_id=user)
        raise PermissionDenied()
    
    # def perform_create(self, serializer):
    #     serializer.save(user_id=self.request.user)

    # def perform_update(self, serializer):
    #     instance = serializer.save()
    #     send_email_confirmation(user=self.request.user, modified=instance)

