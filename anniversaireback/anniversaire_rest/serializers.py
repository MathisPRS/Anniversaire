from rest_framework import serializers
from django.contrib.auth.models import User
import bcrypt

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create(password, **validated_data)
        return user

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password',]
        