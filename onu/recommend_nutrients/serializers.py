from rest_framework import serializers
from .models import Nutrient

# 전체 조회
class NutrientAllSerializer(serializers.ModelSerializer):

    class Meta:
        model = Nutrient
        fields = ('nutrient_id', 'nutrient_name', 'nutrient_image_url', 'nutrient_brand')
