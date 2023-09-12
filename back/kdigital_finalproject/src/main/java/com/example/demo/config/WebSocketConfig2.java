package com.example.demo.config;



import java.io.IOException;
import java.sql.Timestamp;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.example.demo.entity.ContainerWork;
import com.example.demo.repository.ContainerWorkRepository;
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
class SendData2	{
	private String container;
	private int bay;
	private int row;
	private int tier;
	private Timestamp timeEnd;
}

@Slf4j
@Component
class WebSocketHandler2 extends TextWebSocketHandler {

	private static Map<String, WebSocketSession> map = new HashMap<>();
	public static String receivedMessage;
	public static int sendFlag = 0;

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
	
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        log.info("Received message from user [" + session.getId() + "]: " + message.getPayload());
        receivedMessage = message.getPayload();
        sendFlag = 1;
    }
	
	public static void sendData(String sendMessage) {
		Set<String> keys = map.keySet();
		if (keys.size() <= 0)	{
			return;
		}
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
	
	public int getSize()	{
		Set<String> keys = map.keySet();
		return keys.size();
	}
}

// 설정한 주기에 따라 자동으로 실행되어야 하는 경우 설정

@Slf4j
@Component
class Scheduler2 {

	@Autowired
	ContainerWorkRepository containerworkrepository;
	
	@Autowired
	WebSocketHandler2 websockethandler;
	
	@Scheduled(fixedDelay = 1000)			// scheduler 끝나는 시간 기준으로 1000 간격으로 실행
	public void fixedDelayTask() {
		
		if (websockethandler.getSize() == 0)	{
			return;
		}
		
		LocalTime now = LocalTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HHmmss");
		String formatedNow = now.format(formatter);
		log.info(formatedNow);
		List<SendData2> sdList = new ArrayList<>();
		
		
		List<ContainerWork> worklist = containerworkrepository.findWorkListByATC(WebSocketHandler2.receivedMessage);
		
	
		if (!worklist.isEmpty())	{
			
			System.out.println("*********Send findWorkListByATC*********");
			for (ContainerWork work : worklist)	{
				SendData2 sendData = new SendData2();
				sendData.setContainer(work.getContainer());
				sendData.setBay(work.getBay1());
				sendData.setRow(work.getRow1());
				sendData.setTier(work.getTier1());
				sendData.setTimeEnd(work.getTimeEnd());
				
			}

			
			
		}
		
        try {
        	// Create ObjectMapper instance
        	ObjectMapper objectMapper = new ObjectMapper();
        	
        	if (WebSocketHandler2.sendFlag == 1)	{
        		WebSocketHandler2.sendData(objectMapper.writeValueAsString(sdList));
        		WebSocketHandler2.sendFlag = 0;
        	}
			
		} catch (JsonProcessingException e) {
			System.out.println("Error:" + e.getMessage());
		}
		
	}
}

// 클라이언트에서 연결할 웹소켓 설정 : ws://localhost:8080/findWorkListByATC
@RequiredArgsConstructor
@Configuration
@EnableWebSocket
public class WebSocketConfig2 implements WebSocketConfigurer {
    private final WebSocketHandler2 webSocketHandler;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(webSocketHandler, "findWorkListByATC").setAllowedOrigins("*");
    }
}