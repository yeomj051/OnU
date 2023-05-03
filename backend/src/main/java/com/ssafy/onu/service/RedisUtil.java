package com.ssafy.onu.service;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class RedisUtil {
    private final RedisTemplate redisTemplate;

    public RedisUtil(RedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void setData(String key, String value, int expiredMinute) {
        redisTemplate.opsForValue().set(key, value, Duration.ofMinutes(expiredMinute));
    }

    public String getData(String key) {
        return (String) redisTemplate.opsForValue().get(key);
    }

    public void deleteDate(String key) {
        redisTemplate.delete(key);
    }
}
