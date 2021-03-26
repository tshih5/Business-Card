from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'cards', views.BusinessCardView)

urlpatterns = [
    path('', include(router.urls)),
    path('current_card/', views.current_card),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]