
from django.contrib import admin
from django.urls import path
from anniversaire_rest import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/login/', views.login_view),
    path('api/users/create', views.user_create_view),
    path('api/users/update/<int:pk>/', views.update_user_view, name='update_user_view'),
]

