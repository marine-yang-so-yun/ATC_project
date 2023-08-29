package com.example.demo.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;



@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	@Bean
	public BCryptPasswordEncoder encoder() {
		return new BCryptPasswordEncoder();
	}
	
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity security) throws Exception {
		
		security.csrf(csrf->csrf.disable());
		
		security.formLogin(abcd ->abcd.disable());
		
		security.authorizeHttpRequests(auth->{
			auth.anyRequest().permitAll();
		});
	
		return security.build();
	}
	

}