package com.ssafy.onu.service;

import com.ssafy.onu.dto.request.ReqCombinationDto;
import com.ssafy.onu.dto.request.ReqReviewCreateFormDto;
import com.ssafy.onu.dto.request.ReqUserInfoDto;
import com.ssafy.onu.dto.response.*;
import com.ssafy.onu.entity.*;
import com.ssafy.onu.repository.*;
import lombok.*;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MypageService {

    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;
    private final NutrientIngredientRepository nutrientIngredientRepository;
    private final NutrientRepository nutrientRepository;
    private final ContinuousRepository continuousRepository;
    private final CombinationRepository combinationRepository;
    private final RedisUtil redisUtil;
    private final InterestNutrientRepository interestNutrientRepository;
    private static final String COMMA = ",";
    private static final String NUTRIENT_ID = "nutrientId:";
    private static final String DATE_FORMAT = "yyyy-MM-dd";
    private static final int ONE = 1;
    private static final int ZERO = 0;

    // 회원 정보 조회
    public ResponseUserInfoDto getUser(int userId) {
        Optional<User> userData = userRepository.findByUserId(userId);
        return new ResponseUserInfoDto(userData.get());
    }

    // 회원 정보 수정
    @Transactional
    public ResponseUserInfoDto updateUserInfo(int userId, ReqUserInfoDto reqUserInfoDto) {
        Optional<User> userData = userRepository.findByUserId(userId);

        if (userData.isPresent()) {
            userData.get().updateUserInfo(reqUserInfoDto);
            userRepository.save(userData.get());
            return getUser(userId);
        } else {
            return null;
        }
    }

    private final TakingDateRepository takingDateRepository;

    // 복용 날짜 조회
    public ResponseTakingDateDto getCheckedDate(int userId, String date) {

        List<String> checkedDate = takingDateRepository.findByUserId_UserIdAndTakingDateDateContains(userId, date).stream()
                .map(d -> d.getTakingDateDate()).collect(Collectors.toList());

        Optional<Continuous> continuous = continuousRepository.findByContinuousUserId_UserId(userId);

        if (continuous.isPresent()) {
            DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern(DATE_FORMAT);
            String lastTakingDate = dateTimeFormatter.format(LocalDateTime.now());

            int betweenDays = (int) Duration.between(LocalDate.parse(continuous.get().getContinuousLastDate(), dateTimeFormatter).atStartOfDay()
                    , LocalDate.parse(lastTakingDate, dateTimeFormatter).atStartOfDay()).toDays();
            if (betweenDays <= ONE) {
                return new ResponseTakingDateDto(checkedDate, continuous.get().getContinuousCount());
            }
        }
        return new ResponseTakingDateDto(checkedDate, ZERO);
    }

    public ResponseReviewDto editReview(ReqReviewCreateFormDto reqReviewCreateFormDto, int reviewId) {
        Optional<Review> review = reviewRepository.findByReviewId(reviewId);
        if(!review.isPresent()) return null;
        review.get().editReview(reqReviewCreateFormDto);
        return new ResponseReviewDto(reviewRepository.save(review.get()));
    }

    public boolean deleteReview(int reviewId) {
        Optional<Review> review = reviewRepository.findByReviewId(reviewId);
        if(!review.isPresent()) return Boolean.FALSE;
        reviewRepository.delete(review.get());
        return Boolean.TRUE;
    }

    @Transactional
    public int checkDate(int userId){
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern(DATE_FORMAT);
        String lastTakingDate =  dateTimeFormatter.format(LocalDateTime.now());

        Optional<User> user = userRepository.findByUserId(userId);
        if(!user.isPresent()) return -1;

        takingDateRepository.save(new TakingDate(lastTakingDate, user.get()));
        Optional<Continuous> continuous = continuousRepository.findByContinuousUserId(user.get());
        if (!continuous.isPresent()){
            return continuousRepository.save(new Continuous(user.get(), ONE, lastTakingDate)).getContinuousCount();
        }
        else{
            int betweenDays = (int) Duration.between(LocalDate.parse(continuous.get().getContinuousLastDate(),dateTimeFormatter).atStartOfDay()
                    , LocalDate.parse(lastTakingDate, dateTimeFormatter).atStartOfDay()).toDays();
            int continuousCount = ONE;
            if(betweenDays == ONE) {
                continuousCount = continuous.get().getContinuousCount() + ONE;
            }
            continuous.get().changeContinuous(continuousCount, lastTakingDate);
            return continuousRepository.save(continuous.get()).getContinuousCount();
        }
    }

    public boolean createCombination(int userId, ReqCombinationDto reqCombinationDto) {
        String combinationList = reqCombinationDto.getCombinationList().stream()
                .map(String::valueOf)
                .collect(Collectors.joining(COMMA));
        if(combinationList.split(COMMA).length == 0) return false;
        combinationRepository.save(new Combination(userId, combinationList));
        return true;
    }

    public boolean deleteCombination(int userId, int combinationId) {
        Optional<Combination> combination = combinationRepository.findByCombinationUserIdAndCombinationId(userId, combinationId);
        if(!combination.isPresent()) return false;
        combinationRepository.delete(combination.get());
        return true;
    }

    public List<ResponseCombinationInfoDto> getCombination(int userId) {
        List<Combination> combinationList = combinationRepository.findCombinationsByCombinationUserId(userId);
        List<ResponseCombinationInfoDto> result = new LinkedList<>();
        combinationList.stream().forEach(combination -> {
            List<Long> nutrients = Arrays.asList(combination.getCombinationNutrientList().split(COMMA))
                    .stream().map(Long::parseLong).collect(Collectors.toList());
            result.add(new ResponseCombinationInfoDto(combination, nutrientRepository.findNutrientsByNutrientIdIn(nutrients).stream()
                    .map(nutrient -> new ResponseCombinationNutrientInfoDto(nutrient)).collect(Collectors.toList())));
        });
        return result;
    }

    public HashMap<String, Object> getCombinationIngredient(ReqCombinationDto reqCombinationDto) {
        HashMap<String, Object> result = new HashMap<>();
        List<ResponseNutrientIngredientDto> nutrientIngredientList = new LinkedList<>();

        reqCombinationDto.getCombinationList().stream().forEach(nutrientId -> {
            nutrientIngredientList.add(getNutrientIngredientInfo(nutrientId));
        });
        if(reqCombinationDto.getInterestNutrient() != null){
            result.put("interestNutrientIngredient", getNutrientIngredientInfo(reqCombinationDto.getInterestNutrient()));
        }

        result.put("nutrientIngredientList", nutrientIngredientList);

        return result;
    }
    
    public ResponseNutrientIngredientDto getNutrientIngredientInfo(Long nutrientId){
        List<ResponseNutrientIngredientInfoDto> nutrientIngredientInfoList = new LinkedList<>();
        String nID = NUTRIENT_ID + nutrientId;
        //캐싱되어 있다면
        if(redisUtil.hasNutrient(nID, nID)) {
            for(Object key : redisUtil.getKeys(nID)){
                if(!key.toString().equals(nID)) {
                    nutrientIngredientInfoList.add(new ResponseNutrientIngredientInfoDto(key.toString(), redisUtil.getNutrientInfo(nID, key.toString())));
                }
            }
        } else {
            Map<String, Object> map = new HashMap<>();
            map.put(nID, nID);
            nutrientIngredientRepository.findNutrientIngredientsByNutrient_NutrientId(nutrientId)
                    .stream()
                    .forEach(nutrientIngredient -> {
                        map.put(nutrientIngredient.getIngredient().getIngredientName(), nutrientIngredient.getIngredientAmount());
                        nutrientIngredientInfoList.add(new ResponseNutrientIngredientInfoDto(nutrientIngredient));
                    });
            redisUtil.cacheNutrient(nID, map);
        }
        return new ResponseNutrientIngredientDto(nutrientId,nutrientIngredientInfoList);
    }

    public boolean deleteInterestNutrient(int userId, Long nutrientId) {
        Optional<InterestNutrient> interestNutrient = interestNutrientRepository.findByNutrient_NutrientIdAndUser_UserId(nutrientId, userId);
        if(!interestNutrient.isPresent()) return false;
        interestNutrientRepository.delete(interestNutrient.get());
        return true;
    }
}
