from django.contrib import admin
from .models import BusinessCard
# Register your models here.

class BusinessCardAdmin(admin.ModelAdmin):
    model = BusinessCard
    list_display = ("user_id", "first_name", "last_name", "age", "birth_date", "job_title", "employer", "location", "email", "phone_number")


admin.site.register(BusinessCard, BusinessCardAdmin)
