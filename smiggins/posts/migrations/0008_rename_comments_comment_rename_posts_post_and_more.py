# Generated by Django 5.0.2 on 2024-02-25 16:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0007_alter_posts_comments_alter_posts_likes_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Comments',
            new_name='Comment',
        ),
        migrations.RenameModel(
            old_name='Posts',
            new_name='Post',
        ),
        migrations.RenameModel(
            old_name='Users',
            new_name='User',
        ),
    ]
