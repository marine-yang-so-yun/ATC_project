package com.example.demo.dataInitializer;

import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.demo.entity.Member;
import com.example.demo.repository.MemberRepository;


@Component
public class DataInitializer implements CommandLineRunner {
   

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    

    @Override
    public void run(String... args) throws Exception {
        initializeAdminUser();

    }

    private void initializeAdminUser() {
        String adminUsername = "admin";
        String adminPassword = "admin"; 
        String adminRole = "ROLE_ADMIN";

        if (!memberRepository.existsByUsername(adminUsername)) {
            Member adminMember = Member.builder()
                    .username(adminUsername)
                    .password(passwordEncoder.encode(adminPassword)) 
                    .role(adminRole)
                    .enabled(true)
                    .build();

            memberRepository.save(adminMember);
        }
    }
    
}
