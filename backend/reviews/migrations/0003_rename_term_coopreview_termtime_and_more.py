# Generated by Django 5.0.1 on 2024-02-29 01:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reviews', '0002_alter_coopreview_culture_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='coopreview',
            old_name='term',
            new_name='termTime',
        ),
        migrations.RenameField(
            model_name='coopreview',
            old_name='user_ID',
            new_name='user',
        ),
        migrations.RenameField(
            model_name='researchreview',
            old_name='term',
            new_name='termTime',
        ),
        migrations.RenameField(
            model_name='researchreview',
            old_name='user_ID',
            new_name='user',
        ),
        migrations.AddField(
            model_name='coopreview',
            name='termYear',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='researchreview',
            name='termYear',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='coopreview',
            name='num_prev_workterms',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='researchreview',
            name='num_prev_workterms',
            field=models.IntegerField(default=0),
        ),
    ]
