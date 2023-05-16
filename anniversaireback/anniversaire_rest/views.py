from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import UserSerializer, UpdateUserSerializer
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from rest_framework.views import APIView
from .models import FriendBirthday
from .serializers import BirthdaySerializer

class UserView:
    @csrf_exempt
    @api_view(['POST'])
    def login_view(request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({'error': 'Please provide both username and password'}, status=400)

        user = authenticate(username=username, password=password)

        if not user:
            return Response({'error': 'Invalid credentials'}, status=401)

        try:
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
        except Exception as e:
            return Response({'error': str(e)}, status=500)

        data_user = UserSerializer(user).data
        return Response({'access': access_token, 'data_user': data_user})


    @api_view(['POST'])
    def user_create_view(request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'status': 'success'})
        else:
            return Response({'status': 'error', 'errors': serializer.errors})


    @api_view(['PUT'])
    def update_user_view(request, pk):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response({'status': 'error', 'message': 'User does not exist.'}, status=404)
        
        serializer = UpdateUserSerializer(user, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response({'status': 'success'})
        else:
            return Response({'status': 'error', 'errors': serializer.errors})
    
class BirthdayView():
    @api_view(['POST'])
    def add_friend_view(request, pk):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response({'status': 'error', 'message': 'User does not exist.'}, status=404)
        
        serializer = BirthdaySerializer(user, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({'status': 'success'})
        else:
            return Response({'status': 'error', 'errors': serializer.errors})