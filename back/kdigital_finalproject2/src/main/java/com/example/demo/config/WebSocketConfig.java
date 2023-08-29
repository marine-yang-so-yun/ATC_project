package com.example.demo.config;


import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;

@Getter
@Setter
@ToString
class SendData {
	private int id;
	private String value;
	private Date date;
}

@Slf4j
@Component
class WebSocketHandler extends TextWebSocketHandler {

	private static Map<String, WebSocketSession> map = new HashMap<>();
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		log.info("user is conntected![" + session.getId() + "]");
		map.put(session.getId(), session);
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		log.info("user is disconntected![" + session.getId() + "]");
		map.remove(session.getId());
	}
	
	public static void sendData(String sendMessage) {
		Set<String> keys = map.keySet();
		System.out.println(String.format("==>%s[%d]", sendMessage, keys.size()));		
		synchronized (map) {	// 블럭안에 코드를 수행하는 동안 map 객체에 대한 다른 스레드의 접근을 방지한다.
			for (String key : keys) {
				WebSocketSession ws = map.get(key);
				try {
					ws.sendMessage(new TextMessage(sendMessage));
				} catch (IOException e) {}
			}
		}
	}
}

// 설정한 주기에 따라 자동으로 실행되어야 하는 경우 설정
@Component
class Scheduler {

	static int id = 1;
	
	@Scheduled(fixedDelay = 5000)			// scheduler 끝나는 시간 기준으로 1000 간격으로 실행
//    @Scheduled(fixedRate = 1000)			// scheduler 시작하는 시간 기준으로 1000 간격으로 실행
	public void fixedDelayTask() {
		
		SendData sd = new SendData();
		sd.setId(id++);
		sd.setValue("Value" + id);
		sd.setDate(new Date());

        try {
        	// Create ObjectMapper instance
        	ObjectMapper objectMapper = new ObjectMapper();
			WebSocketHandler.sendData(objectMapper.writeValueAsString(sd));
		} catch (JsonProcessingException e) {
			System.out.println("Error:" + e.getMessage());
		}
	}
}

// 클라이언트에서 연결할 웹소켓 설정 : ws://localhost:8080/pushservice
@RequiredArgsConstructor
@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
    private final WebSocketHandler webSocketHandler;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(webSocketHandler, "pushservice").setAllowedOrigins("*");
    }
}