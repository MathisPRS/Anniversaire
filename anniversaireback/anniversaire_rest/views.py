from django.http import JsonResponse
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed

from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import UserSerializer
from rest_framework.authtoken.models import Token
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import Group, User

@csrf_exempt
@api_view(['POST'])
def login_view (request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'error': 'Please provide both username and password'}, status=400)

    user = authenticate(username=username, password=password)

    if not user:
        return Response({'error': 'Invalid credentials'}, status=401)

    token, _ = Token.objects.get_or_create(user=user)

    return Response({'token': token.key})

@api_view(['POST'])
def user_create_view(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        group_name = request.data.get('group', 'default')
        group, _ = Group.objects.get_or_create(name=group_name)
        group.user_set.add(user)
        return Response({'status': 'success'})
    else:
        return Response({'status': 'error', 'errors': serializer.errors})
    

@api_view(['GET'])
def get_all_users(request):
    users = User.objects.all().values()
    return JsonResponse({'users': list(users)})