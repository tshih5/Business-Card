# Generated by Django 3.1.7 on 2021-03-26 21:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cards', '0003_auto_20210326_1452'),
    ]

    operations = [
        migrations.AlterField(
            model_name='businesscard',
            name='profile_picture',
            field=models.ImageField(blank=True, upload_to='MEDIA/'),
        ),
    ]
