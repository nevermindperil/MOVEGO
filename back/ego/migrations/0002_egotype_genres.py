# Generated by Django 3.2.18 on 2023-05-21 10:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tmdb', '0002_auto_20230520_1628'),
        ('ego', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='egotype',
            name='genres',
            field=models.ManyToManyField(to='tmdb.Genre'),
        ),
    ]
