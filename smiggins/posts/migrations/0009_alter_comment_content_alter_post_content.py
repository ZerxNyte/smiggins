# Generated by Django 5.0.2 on 2024-02-25 20:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0008_rename_comments_comment_rename_posts_post_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='content',
            field=models.TextField(max_length=65536),
        ),
        migrations.AlterField(
            model_name='post',
            name='content',
            field=models.TextField(max_length=65536),
        ),
    ]
