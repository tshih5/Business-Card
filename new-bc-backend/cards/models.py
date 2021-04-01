from django.db import models
from django.contrib.auth.models import User
from datetime import date

class BusinessCard(models.Model):
    user_id = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    first_name = models.CharField(max_length=40,blank=True)
    last_name = models.CharField(max_length=40,blank=True)
    age = models.PositiveSmallIntegerField(default=0)
    birth_date = models.DateField(default=date.today)
    job_title = models.CharField(max_length=40,blank=True)
    employer = models.CharField(max_length=40,blank=True)
    location = models.CharField(max_length=40,blank=True)
    email = models.CharField(max_length=40,blank=True)
    phone_number = models.CharField(max_length=40,blank=True)
    profile_picture = models.ImageField(upload_to="MEDIA/",blank=True, null=True)

    def __unicode__(self):
        return u'%s %s' % (self.first_name, self.last_name)