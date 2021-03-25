from django.contrib import admin
from cards.models import BusinessCard
# Register your models here.
class BusinessCardAdmin(admin.ModelAdmin):
    model = BusinessCard
    list_display = ("user_id", "first_name", "last_name", "age", "birth_date", "job_title", "employer", "location", "email", "phone_number")
    pass

admin.site.register(BusinessCard, BusinessCardAdmin)


