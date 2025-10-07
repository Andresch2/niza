
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProductViewSet, BatchViewSet, MovementViewSet,
    AlertViewSet, SuggestionViewSet, inventory_summary
)

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='products')
router.register(r'batches', BatchViewSet, basename='batches')
router.register(r'movements', MovementViewSet, basename='movements')
router.register(r'alerts', AlertViewSet, basename='alerts')
router.register(r'suggestions', SuggestionViewSet, basename='suggestions')

urlpatterns = [
    path('', include(router.urls)),
    path('inventory/summary', inventory_summary),
]
