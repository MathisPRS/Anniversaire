from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import UserSerializer
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import Group, User
import traceback


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

    return Response({'access': access_token})


@api_view(['POST'])
def user_create_view(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'status': 'success'})
    else:
        return Response({'status': 'error', 'errors': serializer.errors})
    
@login_required
def user_profile(request):
    user = request.user
    profile = {
        'username': user.username,
        'email': user.email,
    }
    return JsonResponse(profile)
    

@api_view(['GET'])
def get_all_users(request):
    users = User.objects.all().values()
    return JsonResponse({'users': list(users)})
