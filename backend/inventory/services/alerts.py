
from datetime import date, timedelta
from ..models import Product, Batch, Alert



EXPIRY_WINDOW_DAYS = 60

def recalc_low_stock_alerts():
    for p in Product.objects.all():
        stock = sum(b.quantity for b in p.batches.all())
        if stock <= 0:
            Alert.objects.get_or_create(
                type='LOW_STOCK', product=p,
                defaults={'message': f'{p.name}: stock {stock} bajo'}
            )

def recalc_expiry_alerts():
    limit = date.today() + timedelta(days=EXPIRY_WINDOW_DAYS)
    for b in Batch.objects.filter(expiry_date__lte=limit):
        Alert.objects.get_or_create(
            type='EXPIRY', batch=b, product=b.product,
            defaults={'message': f'{b.product.name} lote {b.batch_code} vence {b.expiry_date}'}
        )

def recalc_all_alerts():
    Alert.objects.all().delete()
    recalc_low_stock_alerts()
    recalc_expiry_alerts()
