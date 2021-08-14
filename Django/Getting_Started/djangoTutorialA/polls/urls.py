from django.urls import path
from . import views

# Mapping index view to specific url.
urlpatterns = [
    path('', views.index, name='index'),
]
