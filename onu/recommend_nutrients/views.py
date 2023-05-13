import json

import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics.pairwise import cosine_similarity
from django.shortcuts import render, get_object_or_404, get_list_or_404
from pandas import DataFrame
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from django.db import connection
from django.views import View

from .models import Nutrient, Nutrient_type, User, Taking_Nutrient
from .serializers import NutrientAllSerializer, UserAllSerializer, TakingNutrientAllSerializer

# Create your views here.
# 전체 영양제 제공
@api_view(['GET'])
def nutrients_all(request):
    # 사용자와 복용영양제 테이블을 조인
    taking = Taking_Nutrient.objects.select_related('user')

    # 사용자와 복용한 영양제 정보를 가져온다
    userlist = list(taking.values('user_id'))
    takinglist = list(taking.values('nutrient_id'))
    serializers = TakingNutrientAllSerializer(taking, many=True)

    values = [1] * len(userlist)

    # 사용자 아이디만을 가져와서 배열로 변환
    users = []
    for user in userlist:
        users.append(user["user_id"])

    # 복용 영양제 아이디만을 가져와서 배열로 변환
    takings = []
    for takingNutrient in takinglist:
        takings.append(takingNutrient["nutrient_id"])

    # 사용자 리스트와 복용영양제 리스트를 딕셔너리로 변환
    result = {'user_id': users, 'nutrient_id': takings, 'value': values}

    # 딕셔너리를 테이블로 변환
    table = DataFrame(result)

    rating_metrix = table.pivot(index='user_id', columns='nutrient_id', values='value')

    print(rating_metrix)
    matrix_dummy = rating_metrix.copy().fillna(0)
    user_similarity = cosine_similarity(matrix_dummy, matrix_dummy)
    user_similarity = pd.DataFrame(user_similarity,
                                   index=rating_metrix.index,
                                   columns=rating_metrix.index)
    print(user_similarity)

    def CF_knn(user_id, taking_nutrient_id, neighbor_size=0):
        if taking_nutrient_id in rating_metrix.columns:
            sim_scores = user_similarity[user_id].copy()
            nutrient_value = rating_metrix[taking_nutrient_id].copy()
            print('###')
            none_value_idx = nutrient_value[nutrient_value.isnull()].index
            print('%%%')
            nutrient_value = nutrient_value.dropna()

            sim_scores = sim_scores.drop(none_value_idx)

            print(sim_scores)
            if neighbor_size == 0:
                mean_rating = np.dot(sim_scores, nutrient_value) / sim_scores.sum()
            else:
                if len(sim_scores) > 1:
                    neighbor_size = min(neighbor_size, len(sim_scores))
                    nutrient_value = np.array(nutrient_value)
                    user_idx = np.argsort(sim_scores)
                    sim_scores = sim_scores[user_idx][-neighbor_size:]
                    nutrient_value = nutrient_value[user_idx][-neighbor_size:]
                    mean_rating = np.dot(sim_scores, nutrient_value) / sim_scores.sum()
                else:
                    mean_rating = 0.5
        else:
            mean_rating = 0.5
        return mean_rating

    def recom_nutrient(user_id, n_items, neighbor_size=30):
        user_taking = rating_metrix.loc[user_id].copy()

        for t in rating_metrix.columns:
            if pd.notnull(user_taking.loc[t]):
                user_taking.loc[t] = 0

            else:
                user_taking.loc[t] = CF_knn(user_id, t, neighbor_size)

        print('!!!')
        print(user_taking)

        nutrient_sort = user_taking.sort_values(ascending=False)[:n_items]
        return list(nutrient_sort.index)

    print(recom_nutrient(user_id=1, n_items=1, neighbor_size=1))

    return Response(serializers.data)
