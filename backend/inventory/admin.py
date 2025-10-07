from django.contrib import admin
from .models import Product, Batch, Movement, Alert, Suggestion
admin.site.register(Product)
admin.site.register(Batch)
admin.site.register(Movement)
admin.site.register(Alert)
admin.site.register(Suggestion)
