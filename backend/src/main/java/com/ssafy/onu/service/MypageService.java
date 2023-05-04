package com.ssafy.onu.service;

import com.ssafy.onu.dto.request.ReqUserInfoDto;
import com.ssafy.onu.dto.response.ResponseTakingDateDto;
import com.ssafy.onu.dto.response.ResponseUserInfoDto;
import com.ssafy.onu.entity.*;
import com.ssafy.onu.repository.TakingDateRepository;
import com.ssafy.onu.repository.UserRepository;
import lombok.*;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MypageService {

    private final UserRepository userRepository;

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
    public List<String> getCheckedDate(int userId, String date) {
        List<String> checkedDate = takingDateRepository.findByUserId_UserIdAndTakingDateDateContains(userId, date).stream()
                .map(d -> d.getTakingDateDate()).collect(Collectors.toList());
        return checkedDate;
    }
}
