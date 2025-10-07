
from django.db.models import Sum, IntegerField
from rest_framework import viewsets
from rest_framework.decorators import action, api_view
from rest_framework.response import Response

from .models import Product, Batch, Movement, Alert, Suggestion
from .serializers import (
    ProductSerializer, BatchSerializer, MovementSerializer,
    AlertSerializer, SuggestionSerializer
)
from .services.alerts import recalc_all_alerts

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().annotate(
        stock_current=Sum('batches__quantity', default=0, output_field=IntegerField())
    )
    serializer_class = ProductSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        q = self.request.query_params.get('search') or ""
        cat = self.request.query_params.get('category') or ""
        if q:
            qs = qs.filter(name__icontains=q) | qs.filter(code__icontains=q)
        if cat:
            qs = qs.filter(category=cat)
        return qs.order_by('name')

class BatchViewSet(viewsets.ModelViewSet):
    queryset = Batch.objects.all().select_related('product')
    serializer_class = BatchSerializer
    def perform_create(self, serializer):
        serializer.save(); recalc_all_alerts()
    def perform_update(self, serializer):
        serializer.save(); recalc_all_alerts()

class MovementViewSet(viewsets.ModelViewSet):
    queryset = Movement.objects.all().select_related('product')
    serializer_class = MovementSerializer
    def perform_create(self, serializer):
        mv = serializer.save()
        qty = mv.quantity if mv.type != 'OUT' else -abs(mv.quantity)
        b = Batch.objects.filter(product=mv.product).order_by('expiry_date').first()
        if b:
            b.quantity = (b.quantity or 0) + qty
            b.save()
        recalc_all_alerts()

class AlertViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Alert.objects.all().select_related('product','batch').order_by('-created_at')
    serializer_class = AlertSerializer

class SuggestionViewSet(viewsets.ModelViewSet):
    queryset = Suggestion.objects.all().select_related('product').order_by('-created_at')
    serializer_class = SuggestionSerializer
    @action(detail=True, methods=['patch'])
    def approve(self, request, pk=None):
        obj = self.get_object(); obj.status = Suggestion.APPROVED; obj.save(update_fields=['status'])
        return Response(self.get_serializer(obj).data)
    @action(detail=True, methods=['patch'])
    def reject(self, request, pk=None):
        obj = self.get_object(); obj.status = Suggestion.REJECTED; obj.save(update_fields=['status'])
        return Response(self.get_serializer(obj).data)

@api_view(['GET'])
def inventory_summary(request):
    prods = Product.objects.all().annotate(stock_current=Sum('batches__quantity', default=0))
    total_value = sum([float(p.unit_price) * (p.stock_current or 0) for p in prods])
    low_stock_count = Alert.objects.filter(type='LOW_STOCK').count()
    expiring_count = Alert.objects.filter(type='EXPIRY').count()
    recent = Movement.objects.order_by('-timestamp')[:3]
    recent_txt = []
    for m in recent:
        action = "Recibí" if m.type == 'IN' else ("Se vendieron" if m.type == 'OUT' else "Modificado")
        qty = abs(m.quantity)
        recent_txt.append(f"{action} {qty} de {m.product.name}.")
    return Response({
        "total_value": total_value,
        "low_stock_count": low_stock_count,
        "expiring_count": expiring_count,
        "recent_transactions": recent_txt
    })
