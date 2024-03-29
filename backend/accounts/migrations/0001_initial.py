# Generated by Django 2.2.4 on 2021-03-08 02:26

import backend.accounts.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import imagekit.models.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nickname', models.CharField(max_length=20, unique=True, verbose_name='별명')),
                ('about', models.CharField(blank=True, max_length=300)),
                ('gender', models.CharField(choices=[('선택안함', '선택안함'), ('여성', '여성'), ('남성', '남성')], default='N', max_length=10, verbose_name='성별(선택사항)')),
                ('picture', imagekit.models.fields.ProcessedImageField(blank=True, upload_to=backend.accounts.models.user_path)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
