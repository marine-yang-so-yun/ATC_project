

package com.example.demo.config;



import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.example.demo.filter.JWTAuthenticationFilter;
import com.example.demo.filter.JWTAuthorizationFilter;
import com.example.demo.repository.MemberRepository;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

   
   @Autowired
   private AuthenticationConfiguration authConfig;
   
   @Autowired
   private MemberRepository memberRepo;
   @Bean
   public PasswordEncoder passwordEncoder()   {
      return new BCryptPasswordEncoder();
   }
   
   @Bean 
      public CorsConfigurationSource corsConfigurationSource() {
         CorsConfiguration configuration = new CorsConfiguration(); 
         configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000")); 
         configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
         configuration.setAllowedHeaders(Arrays.asList("*"));
         configuration.setAllowCredentials(true);

         configuration.addExposedHeader("Authorization"); 
         

         UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource(); 
         source.registerCorsConfiguration("/**", configuration);
         return source; 
      }
   
   
   @Bean
   public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception   {
      
      http.csrf(csrf -> csrf.disable());
      
      http.cors(cors -> {
            cors.configurationSource(corsConfigurationSource());
         });
      http.authorizeHttpRequests(security ->{
         
         security
         //.requestMatchers("/notice/createNotice").hasRole("ADMIN")
         //.requestMatchers("/notice/updateNotice").hasRole("ADMIN")
         //.requestMatchers("/notice/deleteNotice").hasRole("ADMIN")
         .anyRequest().permitAll();
      });
      
      http.formLogin(frmLogin -> frmLogin.disable());
      http.sessionManagement(ssmg->ssmg.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
      http.addFilter(new JWTAuthenticationFilter(authConfig.getAuthenticationManager(), memberRepo));
      http.addFilter(new JWTAuthorizationFilter(authConfig.getAuthenticationManager(), memberRepo));
      return http.build();
   }
}
  