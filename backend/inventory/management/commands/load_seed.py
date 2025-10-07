
from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta, date
from inventory.models import Product, Batch, Movement, Suggestion

class Command(BaseCommand):
    help = "Carga datos de ejemplo"

    def handle(self, *args, **kwargs):
        if Product.objects.exists():
            self.stdout.write(self.style.WARNING("Ya hay datos, omitiendo seed."))
            return

        p1 = Product.objects.create(code="IBU200", name="Ibuprofeno", dose="200 mg", category="A", unit_price=500)
        p2 = Product.objects.create(code="AMOX250", name="Amoxicilina", dose="250 mg", category="B", unit_price=1200)
        p3 = Product.objects.create(code="ASP100", name="Aspirina", dose="100 mg", category="B", unit_price=400)

        Batch.objects.create(product=p1, batch_code="L1", expiry_date=date.today()+timedelta(days=40), quantity=50)
        Batch.objects.create(product=p2, batch_code="L2", expiry_date=date.today()+timedelta(days=90), quantity=10)
        Batch.objects.create(product=p3, batch_code="L3", expiry_date=date.today()+timedelta(days=15), quantity=2)

        Movement.objects.create(product=p1, type="IN", quantity=50, note="Compra")
        Movement.objects.create(product=p2, type="OUT", quantity=10, note="Venta")
        Movement.objects.create(product=p3, type="ADJ", quantity= -2, note="Ajuste")

        Suggestion.objects.create(product=p1, suggested_qty=200, reason="Demanda prevista basada en el clima")
        Suggestion.objects.create(product=p2, suggested_qty=80, reason="Histórico de ventas")

        self.stdout.write(self.style.SUCCESS("Seed cargado."))
