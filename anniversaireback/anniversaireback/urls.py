
from django.contrib import admin
from django.urls import path
from anniversaire_rest import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/login/', views.UserView.login_view),
    path('api/users/create', views.UserView.user_create_view),
    path('api/users/update/<int:pk>/', views.UserView.update_user_view, name='update_user_view'),
    path('api/anniversaire/<int:pk>/', views.BirthdayView.add_friend_view, name='add_friend_view'),
]

