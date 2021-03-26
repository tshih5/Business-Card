from django.db import models
from django.contrib.auth.models import User

class BusinessCard(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=40)
    last_name = models.CharField(max_length=40)
    age = models.PositiveSmallIntegerField()
    birth_date = models.DateField()
    job_title = models.CharField(max_length=40)
    employer = models.CharField(max_length=40)
    location = models.CharField(max_length=40)
    email = models.CharField(max_length=40)
    phone_number = models.CharField(max_length=40)
    profile_picture = models.ImageField()

    def __unicode__(self):
        return u'%s %s' % (self.first_name, self.last_name)


    
