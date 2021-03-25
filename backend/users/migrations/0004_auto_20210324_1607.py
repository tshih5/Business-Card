# Generated by Django 3.1.7 on 2021-03-24 23:07

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('users', '0003_auto_20210324_1555'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='User',
            new_name='BusinessCards',
        ),
        migrations.DeleteModel(
            name='Account',
        ),
        migrations.AlterField(
            model_name='businesscards',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
