from rest_framework import serializers
from datetime import datetime
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from .models import FriendBirthday

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    password = serializers.CharField(write_only=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
   
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password', 'password2']

      
class UpdateUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=False)

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
        }

    def validate_email(self, value):
        user = self.instance
        if User.objects.exclude(pk=user.pk).filter(email=value).exists():
            raise serializers.ValidationError({"email": "This email is already in use."})
        return value

    def validate_username(self, value):
        user = self.instance
        if User.objects.exclude(pk=user.pk).filter(username=value).exists():
            raise serializers.ValidationError({"username": "This username is already in use."})
        return value

    def update(self, instance, validated_data):
        
        instance.first_name = validated_data['first_name']
        instance.last_name = validated_data['last_name']
        instance.email = validated_data['email']
        instance.username = validated_data['username']
        instance.save()

        return instance
    
class BirthdaySerializer(serializers.ModelSerializer):
    birthday_date = serializers.DateField()

    class Meta:
        model = FriendBirthday
        fields = '__all__'

    def validate(self, attrs):
        attrs = super().validate(attrs)
        user_id = attrs.get('user_id')
        last_name = attrs.get('last_name')
        first_name = attrs.get('first_name')
        
        if FriendBirthday.objects.filter(user_id=user_id, last_name=last_name, first_name=first_name).exists():
            raise serializers.ValidationError("Ce nom d'ami existe déjà pour cet utilisateur.")

        # Vérifier le format de la date
        birthday_date = attrs.get('birthday_date')
        try:
            birthday_date_str = birthday_date.strftime('%Y-%m-%d')
        except AttributeError:
            raise serializers.ValidationError("Le format de la date d'anniversaire est incorrect.")
        attrs['birthday_date'] = birthday_date_str

        return attrs

    def create(self, validated_data):
        user_id = validated_data.get('user_id').pk
        user = User.objects.get(pk=user_id)

        friend = FriendBirthday(
            user_id=user,
            last_name=validated_data['last_name'],
            first_name=validated_data['first_name'],
            birthday_date=validated_data['birthday_date']
        )

        friend.save()
        return friend