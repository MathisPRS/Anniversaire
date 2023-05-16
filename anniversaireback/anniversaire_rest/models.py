from django.db import models
from django.contrib.auth.models import User

class FriendBirthday(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    last_name = models.CharField(max_length=100)
    first_name = models.CharField(max_length=100)
    birthday_date = models.DateField()

    def __str__(self):
        return f"{self.last_name} {self.first_name}"