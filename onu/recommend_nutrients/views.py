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

# Create your views here.
# 전체 영양제 제공
@api_view(['POST'])
def nutrients_all(request):
    #전달받은 복용중인 영양제 리스트 추가
    taking_nutrient_from_survey = request.data.get('takingList')

    # 사용자와 복용영양제 테이블을 조인
    taking = Taking_Nutrient.objects

    # 사용자와 복용한 영양제 정보를 가져온다
    taking_by_user = list(taking.filter(user_id=request.data.get('user')))
    user_list = list(taking.values('user_id'))
    taking_list = list(taking.values('nutrient_id'))
    values = [1] * len(user_list)

    # 설문과 사용자가 복용중인 모든 영양제 배열
    except_list = []
    for user in taking_by_user:
        except_list.append(user.nutrient_id)
    for except_taking_nutrient_from_survey in taking_nutrient_from_survey:
        except_list.append(except_taking_nutrient_from_survey)
    except_list = list(set(except_list))

    # 사용자 아이디만을 가져와서 배열로 변환
    users = []
    for user in user_list:
        users.append(user["user_id"])

    # 복용 영양제 아이디만을 가져와서 배열로 변환
    takings = []
    for takingNutrient in taking_list:
        takings.append(takingNutrient["nutrient_id"])

    # 사용자 리스트와 복용영양제 리스트를 딕셔너리로 변환
    result = {'user_id': users, 'nutrient_id': takings, 'value': values}

    # 딕셔너리를 테이블로 변환
    table = DataFrame(result)

    taking_metrix = table.pivot(index='user_id', columns='nutrient_id', values='value')

    matrix_dummy = taking_metrix.copy().fillna(0)
    user_similarity = cosine_similarity(matrix_dummy, matrix_dummy)
    user_similarity = pd.DataFrame(user_similarity,
                                   index=taking_metrix.index,
                                   columns=taking_metrix.index)

    def CF_knn(user_id, taking_nutrient_id, neighbor_size=0):
        if taking_nutrient_id in taking_metrix.columns:
            sim_scores = user_similarity[user_id].copy()
            nutrient_value = taking_metrix[taking_nutrient_id].copy()
            none_value_idx = nutrient_value[nutrient_value.isnull()].index
            nutrient_value = nutrient_value.dropna()
            sim_scores = sim_scores.drop(none_value_idx)

            if neighbor_size == 0:
                mean_rating = np.dot(sim_scores, nutrient_value) / sim_scores.sum()
            else:
                if len(sim_scores) > 1:
                    neighbor_size = min(neighbor_size, len(sim_scores))
                    sim_scores = np.array(sim_scores)
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
        user_taking = taking_metrix.loc[user_id].copy()

        for t in taking_metrix.columns:
            if pd.notnull(user_taking.loc[t]):
                user_taking.loc[t] = 0

            else:
                user_taking.loc[t] = CF_knn(user_id, t, neighbor_size)

        nutrient_sort = user_taking.sort_values(ascending=False)[:n_items]
        return list(nutrient_sort.index)

    s = set(except_list)
    result = [x for x in recom_nutrient(request.data.get('user'), n_items=50, neighbor_size=20) if x not in s]

    return Response(result)
