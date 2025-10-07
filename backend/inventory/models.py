
from django.db import models
from django.utils import timezone

class Product(models.Model):
    code = models.CharField(max_length=64, unique=True)
    name = models.CharField(max_length=200)
    dose = models.CharField(max_length=64, blank=True)
    category = models.CharField(max_length=1, choices=[('A','A'),('B','B'),('C','C')], default='C')
    unit_price = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    def __str__(self): return f"{self.code} - {self.name}"

class Batch(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='batches')
    batch_code = models.CharField(max_length=64)
    expiry_date = models.DateField()
    quantity = models.IntegerField(default=0)
    class Meta: unique_together = ('product','batch_code')
    def __str__(self): return f"{self.product.code} {self.batch_code}"

class Movement(models.Model):
    IN, OUT, ADJ = 'IN','OUT','ADJ'
    TYPES = [(IN,'IN'),(OUT,'OUT'),(ADJ,'ADJ')]
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='movements')
    type = models.CharField(max_length=3, choices=TYPES)
    quantity = models.IntegerField()
    note = models.CharField(max_length=200, blank=True)
    timestamp = models.DateTimeField(default=timezone.now)
    def __str__(self): return f"{self.product.code} {self.type} {self.quantity}"

class Alert(models.Model):
    LOW_STOCK, EXPIRY = 'LOW_STOCK','EXPIRY'
    TYPES = [(LOW_STOCK,'LOW_STOCK'),(EXPIRY,'EXPIRY')]
    type = models.CharField(max_length=16, choices=TYPES)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True, blank=True)
    batch = models.ForeignKey(Batch, on_delete=models.CASCADE, null=True, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
    def __str__(self): return f"{self.type}: {self.message[:40]}"

class Suggestion(models.Model):
    PENDING, APPROVED, REJECTED = 'PENDING','APPROVED','REJECTED'
    STATUSES = [(PENDING,'PENDING'),(APPROVED,'APPROVED'),(REJECTED,'REJECTED')]
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='suggestions')
    suggested_qty = models.IntegerField(default=0)
    reason = models.CharField(max_length=200, blank=True)
    status = models.CharField(max_length=10, choices=STATUSES, default=PENDING)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self): return f"Sug {self.product.code}: {self.suggested_qty}"
