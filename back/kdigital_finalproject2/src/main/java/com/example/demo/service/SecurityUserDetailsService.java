package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.example.demo.entity.Member;
import com.example.demo.repository.MemberRepository;

public class SecurityUserDetailsService implements UserDetailsService{

	
	@Autowired
	private MemberRepository memRepo;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException	{
		Member member = memRepo.findById(username).orElseThrow(() ->
		new UsernameNotFoundException("Not Found!"));
		
		return new User(member.getUsername(), member.getPassword(), member.getAuthorities());
	}
}
