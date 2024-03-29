# Generated by Django 5.0.1 on 2024-03-02 19:57

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=80)),
            ],
        ),
        migrations.CreateModel(
            name='ResearchGroup',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=80)),
                ('professor', models.CharField(max_length=80)),
            ],
        ),
        migrations.CreateModel(
            name='CoopReview',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time_updated', models.DateField(auto_now=True)),
                ('job_title', models.CharField(default=None, max_length=80)),
                ('termTime', models.CharField(max_length=20)),
                ('termYear', models.IntegerField(default=0)),
                ('location', models.CharField(max_length=100)),
                ('duration', models.IntegerField()),
                ('num_prev_workterms', models.IntegerField(default=0)),
                ('rating', models.DecimalField(decimal_places=1, max_digits=2)),
                ('interview_difficulty', models.DecimalField(decimal_places=1, max_digits=2)),
                ('skill_building', models.DecimalField(decimal_places=1, max_digits=2)),
                ('culture', models.DecimalField(decimal_places=1, max_digits=2)),
                ('mentorship', models.DecimalField(decimal_places=1, max_digits=2)),
                ('comments', models.CharField(max_length=1000)),
                ('salary', models.DecimalField(decimal_places=2, max_digits=12)),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='reviews.company')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ResearchReview',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time_updated', models.DateField(auto_now=True)),
                ('job_title', models.CharField(default=None, max_length=80)),
                ('termTime', models.CharField(max_length=20)),
                ('termYear', models.IntegerField(default=0)),
                ('location', models.CharField(max_length=100)),
                ('duration', models.IntegerField()),
                ('num_prev_workterms', models.IntegerField(default=0)),
                ('rating', models.DecimalField(decimal_places=1, max_digits=2)),
                ('interview_difficulty', models.DecimalField(decimal_places=1, max_digits=2)),
                ('skill_building', models.DecimalField(decimal_places=1, max_digits=2)),
                ('culture', models.DecimalField(decimal_places=1, max_digits=2)),
                ('mentorship', models.DecimalField(decimal_places=1, max_digits=2)),
                ('comments', models.CharField(max_length=1000)),
                ('funding', models.DecimalField(decimal_places=2, max_digits=12)),
                ('research_group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='reviews.researchgroup')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
