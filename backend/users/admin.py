from django.contrib import admin
from users.models import BusinessCard
# Register your models here.
class BusinessCardAdmin(admin.ModelAdmin):
    pass

admin.site.register(BusinessCard, BusinessCardAdmin)

