
from django.contrib import admin
from django.urls import path
from anniversaire_rest import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/login/', views.login_view),
    path('api/users/create', views.user_create_view),
    path('api/users/list', views.get_all_users, name='get_all_users'),
    path('api/users/profile/', views.user_profile, name='user_profile'),
]

