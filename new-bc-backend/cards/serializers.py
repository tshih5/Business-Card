from rest_framework import serializers
from .models import BusinessCard

class BusinessCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessCard
        fields = ("user_id", "first_name", "last_name", "age", "birth_date", "job_title", "employer", "location", "email", "phone_number", "profile_picture")
