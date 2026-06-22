package com.school.management.mapper;

import com.school.management.entity.AppUser;

public class UserMapper {
    public static AppUser toEntity(String username, String password, String role){
        return new AppUser(username, password, role );
    }
}
