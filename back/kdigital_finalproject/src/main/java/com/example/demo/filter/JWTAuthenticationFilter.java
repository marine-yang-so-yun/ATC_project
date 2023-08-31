package com.example.demo.filter;

import java.io.IOException;
import java.util.Date;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.demo.entity.Member;
import com.example.demo.repository.MemberRepository;
import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@RequiredArgsConstructor

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

	private final AuthenticationManager authenticationManager;
	private final MemberRepository memRepo;

	@Override 
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		ObjectMapper om = new ObjectMapper();
		try {
			Member member = om.readValue(request.getInputStream(), Member.class);
			Authentication authToken = new UsernamePasswordAuthenticationToken(member.getUsername(), member.getPassword());
			Authentication auth = authenticationManager.authenticate(authToken);
			
			log.info("Authenticated:[" + member.getUsername() + "]");
			return auth;
		} catch (IOException e) {
			log.info("Not Authenticated : " + e.getMessage());
		}
		return null;
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {
		User user = (User) authResult.getPrincipal();
		log.info("successfulAuthentication:" + user.toString());

		String jwtToken = JWT.create().withClaim("username", user.getUsername())
				.withExpiresAt(new Date(System.currentTimeMillis() + 1000 * 60 * 30))
				.sign(Algorithm.HMAC256("edu.pnu.jwtkey"));
		
		response.addHeader("Authorization", "Bearer " + jwtToken);
		
		
	}
}
