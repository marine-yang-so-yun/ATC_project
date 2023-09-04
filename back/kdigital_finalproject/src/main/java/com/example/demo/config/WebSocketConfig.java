package com.example.demo.config;



import java.io.IOException;
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
import com.example.demo.entity.Maxblock;
import com.example.demo.repository.ContainerWorkRepository;
import com.example.demo.repository.MaxblockRepository;
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

	private String workStatus;
	private int bay1;
	private int row1;
	private int tier1;
	
	private int bay2;
	private int row2;
	private int tier2;
	
	private String time_taken;
	
	private String block;
	private int maxbay;
	private int maxrow;
	private int maxtier;
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

@Slf4j
@Component
class Scheduler {

	@Autowired
	ContainerWorkRepository containerworkrepository;
	
	
	@Autowired
	MaxblockRepository maxblockrepository;
	
	@Scheduled(fixedDelay = 1000)			// scheduler 끝나는 시간 기준으로 1000 간격으로 실행
	public void fixedDelayTask() {
		
		
		LocalTime now = LocalTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss");
		String formatedNow = now.format(formatter);
		log.info(formatedNow);
		int sendFlag = 0;
		List<SendData> sdList = new ArrayList<>();
		
		
		List<ContainerWork> worklist = containerworkrepository.findWorkingStart();
		
	
		if (!worklist.isEmpty())	{
			
			sendFlag = 1;
			
			System.out.println("******************");
			
			for (ContainerWork work : worklist)	{
				
				SendData sendData = new SendData();
				log.info(work.getBlock1());
				Maxblock blockinfo = maxblockrepository.findBlockInfo(work.getBlock1());
				
				sendData.setWorkStatus("workingstart");
				sendData.setBay1(Integer.parseInt(work.getBay1().substring(1)));
				sendData.setRow1(Integer.parseInt(work.getRow1().substring(1)));
				sendData.setTier1(Integer.parseInt(work.getTier1().substring(1)));
				
				sendData.setTier2(Integer.parseInt(work.getTier2().substring(1)));
				sendData.setBay2(Integer.parseInt(work.getBay2().substring(1)));
				sendData.setRow2(Integer.parseInt(work.getRow2().substring(1)));
				
				sendData.setTime_taken(work.getTimeTaken());
				sendData.setBlock(work.getBlock1());
				
				if (blockinfo != null)	{
					sendData.setMaxbay(blockinfo.getMaxbay());
					sendData.setMaxrow(blockinfo.getMaxrow());
					sendData.setMaxtier(blockinfo.getMaxtier());
				}


				sdList.add(sendData);
			}
			
			
		}
		
        try {
        	// Create ObjectMapper instance
        	ObjectMapper objectMapper = new ObjectMapper();
        	
        	if (sendFlag == 1)	{
        		WebSocketHandler.sendData(objectMapper.writeValueAsString(sdList));
        		sendFlag = 0;
        	}
			
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