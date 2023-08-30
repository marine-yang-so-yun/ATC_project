package com.example.demo;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.demo.entity.Member;
import com.example.demo.repository.MemberRepository;


@SpringBootTest
public class MemberInitialize {

	
	@Autowired
	MemberRepository memRepo;
	
	PasswordEncoder encoder = new BCryptPasswordEncoder();
	
	@Test
	public void doWork()	{
		memRepo.save(Member.builder()
				.username("member")
				.password(encoder.encode("abcd"))
				.role("ROLE_MEMBER")
				.enabled(true).build());
		
		memRepo.save(Member.builder()
				.username("manager")
				.password(encoder.encode("abcd"))
				.role("ROLE_MANAGER")
				.enabled(true).build());
		
		
		memRepo.save(Member.builder()
				.username("admin")
				.password(encoder.encode("abcd"))
				.role("ROLE_ADMIN")
				.enabled(true).build());
	}
}
