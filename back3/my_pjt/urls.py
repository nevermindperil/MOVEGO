
from django.contrib import admin
from django.urls import path, include
from tmdb import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('tmdb/', include('tmdb.urls')),
    path('accounts/', include('dj_rest_auth.urls')),
    path('accounts/signup/', include('dj_rest_auth.registration.urls')),
    path('egoexpand/', include('egoexpand.urls')),
]
