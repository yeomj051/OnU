import json

from django.shortcuts import render, get_object_or_404, get_list_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from django.db import connection
from django.views import View

from .models import Nutrient, Nutrient_type
from .serializers import NutrientAllSerializer


# Create your views here.
# 전체 영양제 제공
@api_view(['GET'])
def nutrients_all(request):
    nutrients = Nutrient.objects.all()
    serializers = NutrientAllSerializer(nutrients, many=True)
    return Response(serializers.data)
