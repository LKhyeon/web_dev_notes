import datetime
from django.db import models
from django.utils import timezone

'''
Three-step guide to making model changes:
    1. Change your models (in models.py).
    2. Run python manage.py makemigrations to create migrations for those changes.
    3. Run python manage.py migrate to apply those changes to the database.
'''

# Create your models here.
class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')

    def __str__(self):
        return f'Question: {self.question_text}, Date Published: {self.pub_date}'

    def was_published_recently(self):
        return self.pub_date >= timezone.now() - datetime.timedelta(days=1)

class Choice(models.Model):
    # ForeignKey specifies that each Choice is related to a single Question.
    # on_delete=models.CASCADE emulates ON DELETE CASCADE, which deletes all of the
    # information associated with the deleted data (question) in other files.

    # In this case, if specific Question is deleted, all of the objects that refer to
    # it (e.g., specific Choice) are going to be deleted.
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)

    def __str__(self):
        return f'Choice: {self.choice_text}, Votes: {self.votes}'
