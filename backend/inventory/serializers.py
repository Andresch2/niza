
from rest_framework import serializers
from .models import Product, Batch, Movement, Alert, Suggestion

class ProductSerializer(serializers.ModelSerializer):
    stock_current = serializers.IntegerField(read_only=True)
    class Meta:
        model = Product
        fields = ["id","code","name","dose","category","unit_price","stock_current"]

class BatchSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name", read_only=True)
    class Meta:
        model = Batch
        fields = ["id","product","product_name","batch_code","expiry_date","quantity"]

class MovementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movement
        fields = ["id","product","type","quantity","note","timestamp"]

class AlertSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name", read_only=True)
    class Meta:
        model = Alert
        fields = ["id","type","product","product_name","batch","message","created_at","is_read"]

class SuggestionSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name", read_only=True)
    class Meta:
        model = Suggestion
        fields = ["id","product","product_name","suggested_qty","reason","status","created_at"]
