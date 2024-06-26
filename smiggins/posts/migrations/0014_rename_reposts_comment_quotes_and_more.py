# Generated by Django 5.0.2 on 2024-04-19 20:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0013_post_quote_is_comment'),
    ]

    operations = [
        migrations.RenameField(
            model_name='comment',
            old_name='reposts',
            new_name='quotes',
        ),
        migrations.RenameField(
            model_name='post',
            old_name='reposts',
            new_name='quotes',
        ),
        migrations.AddField(
            model_name='user',
            name='bio',
            field=models.CharField(max_length=65536, null=True),
        ),
    ]
