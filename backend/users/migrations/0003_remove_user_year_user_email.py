# Generated by Django 5.0.1 on 2024-01-20 01:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_remove_user_email_user_year'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='year',
        ),
        migrations.AddField(
            model_name='user',
            name='email',
            field=models.EmailField(default=None, max_length=254),
        ),
    ]
