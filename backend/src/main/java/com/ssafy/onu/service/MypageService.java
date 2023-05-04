package com.ssafy.onu.service;

import com.ssafy.onu.dto.request.ReqUserInfoDto;
import com.ssafy.onu.dto.response.ResponseUserInfoDto;
import com.ssafy.onu.entity.*;
import com.ssafy.onu.repository.UserRepository;
import lombok.*;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

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
}
