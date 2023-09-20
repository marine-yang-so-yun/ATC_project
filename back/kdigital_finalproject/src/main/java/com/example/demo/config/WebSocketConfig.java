package com.example.demo.config;

import java.io.IOException;
import java.sql.Timestamp;
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
class SendData {
	private String block1;
	private int bay1;
	private int row1;
	private int tier1;

	private String block2;
	private int bay2;
	private int row2;
	private int tier2;

	private String crane;
	private String workCode;

}

@Getter
@Setter
@ToString
class SendData2 {
	private String container;
	
	private String block1;
	private int bay1;
	private int row1;
	private int tier1;
	
	private String block2;
	private int bay2;
	private int row2;
	private int tier2;
	
	private Timestamp timeEnd;
	private String crane;
	private String workCode;
}


@Getter
@Setter
@ToString
class beforeWorklist	{
	private String container;
}

@Getter
@Setter
@ToString
class SendData3	{
	private String container;
	private String workCode;
	private String ship;
	private int voyage;
	private String block1;
	private int bay1;
	private int row1;
	private int tier1;
	
	private Timestamp timeEnd;
}

@Slf4j
@Component
class WebSocketHandler1 extends TextWebSocketHandler {

	private Map<String, WebSocketSession> map = new HashMap<>();

	@Autowired
	ContainerWorkRepository containerworkrepository;

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

	public void sendData(String sendMessage) {
		Set<String> keys = map.keySet();
		if (keys.size() <= 0) {
			return;
		}
		// System.out.println(String.format("==>%s[%d]", sendMessage, keys.size()));
		synchronized (map) { // 블럭안에 코드를 수행하는 동안 map 객체에 대한 다른 스레드의 접근을 방지한다.
			for (String key : keys) {
				WebSocketSession ws = map.get(key);
				try {
					ws.sendMessage(new TextMessage(sendMessage));
				} catch (IOException e) {
				}
			}
		}
	}

	public int getSize() {
		Set<String> keys = map.keySet();
		return keys.size();
	}

	// 설정한 주기에 따라 자동으로 실행되어야 하는 경우 설정

	@Scheduled(fixedDelay = 1000)
	public void fixedDelayTask() {

		if (getSize() == 0) {
			return;
		}

		int sendFlag = 0;
		List<SendData> sdList = new ArrayList<>();

		List<ContainerWork> worklist = containerworkrepository.findWorkingStart();

		if (!worklist.isEmpty()) {

			sendFlag = 1;


			for (ContainerWork work : worklist) {

				SendData sendData = new SendData();

				sendData.setBlock1(work.getBlock1());
				sendData.setBay1(work.getBay1());
				sendData.setRow1(work.getRow1());
				sendData.setTier1(work.getTier1());

				sendData.setBlock2(work.getBlock2());
				sendData.setBay2(work.getBay2());
				sendData.setRow2(work.getRow2());
				sendData.setTier2(work.getTier2());

				sendData.setCrane(work.getCrane());
				sendData.setWorkCode(work.getWorkCode());
				sdList.add(sendData);
			}
		}

		try {
			ObjectMapper objectMapper = new ObjectMapper();

			if (sendFlag == 1) {
				sendData(objectMapper.writeValueAsString(sdList));
				sendFlag = 0;
			}

		} catch (JsonProcessingException e) {
			System.out.println("Error:" + e.getMessage());
		}
	}
}

@Slf4j
@Component
class WebSocketHandler2 extends TextWebSocketHandler {

	private Map<String, WebSocketSession> map = new HashMap<>();

	public static String receivedMessage = "";
	public static ContainerWork beforeWorklist = new ContainerWork();

	
	
	
	@Autowired
	ContainerWorkRepository containerworkrepository;

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
		//sendFlag = 1;


	}

	public void sendData(String sendMessage) {
		Set<String> keys = map.keySet();
		if (keys.size() <= 0) {
			return;
		}
		// System.out.println(String.format("==>%s[%d]", sendMessage, keys.size()));
		synchronized (map) { // 블럭안에 코드를 수행하는 동안 map 객체에 대한 다른 스레드의 접근을 방지한다.
			for (String key : keys) {
				WebSocketSession ws = map.get(key);
				try {
					ws.sendMessage(new TextMessage(sendMessage));
				} catch (IOException e) {
				}
			}
		}
	}

	public int getSize() {
		Set<String> keys = map.keySet();
		return keys.size();
	}

	@Scheduled(fixedDelay = 1000) // scheduler 끝나는 시간 기준으로 1000 간격으로 실행
	public void fixedDelayTask() {
		
		List<SendData2> sdList = new ArrayList<>();
		int sendFlag = 0;
		
		
		if (getSize() == 0) {
			return;
		}

		

		if (WebSocketHandler2.receivedMessage == "") {
			return;
		}


		String temp = WebSocketHandler2.receivedMessage.replaceAll("\"", "");
		temp = temp.replaceAll("\\[", "");
		temp = temp.replaceAll("\\]", "");
		
		
		List<ContainerWork> worklist = null;
		if (temp.length() >= 4)	{
			
			String temp1 = temp.substring(0,3);
			String temp2 = temp.substring(4,7);
			
			worklist = containerworkrepository.findWorkListByATC2(temp1, temp2);

		}
		else	{
			
			worklist = containerworkrepository.findWorkListByATC(temp);
		}
		


		if (!worklist.isEmpty() && !worklist.get(0).getContainer().equals(beforeWorklist.getContainer())) {
			
			sendFlag = 1;
			

			for (ContainerWork work : worklist) {
				SendData2 sendData = new SendData2();
				sendData.setContainer(work.getContainer());
				sendData.setBlock1(work.getBlock1());
				sendData.setBay1(work.getBay1());
				sendData.setRow1(work.getRow1());
				sendData.setTier1(work.getTier1());
				
				sendData.setBlock2(work.getBlock2());
				sendData.setBay2(work.getBay2());
				sendData.setRow2(work.getRow2());
				sendData.setTier2(work.getTier2());
				
				sendData.setTimeEnd(work.getTimeEnd());
				sendData.setCrane(work.getCrane());
				sendData.setWorkCode(work.getWorkCode());
				sdList.add(sendData);

			}

		}

		try {
			// Create ObjectMapper instance
			ObjectMapper objectMapper = new ObjectMapper();

			if (sendFlag == 1) {
				System.out.println("*********Send findWorkListByATC*********");
				sendData(objectMapper.writeValueAsString(sdList));
				sendFlag = 0;
				beforeWorklist = worklist.get(0);
			}

		} catch (JsonProcessingException e) {
			System.out.println("Error:" + e.getMessage());
		}

	}
}


@Slf4j
@Component
class WebSocketHandler3 extends TextWebSocketHandler {

	private Map<String, WebSocketSession> map = new HashMap<>();

	public static String receivedMessage = "";
	public static ContainerWork beforeWorklist = new ContainerWork();

	@Autowired
	ContainerWorkRepository containerworkrepository;

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


	public void sendData(String sendMessage) {
		Set<String> keys = map.keySet();
		if (keys.size() <= 0) {
			return;
		}

		synchronized (map) { // 블럭안에 코드를 수행하는 동안 map 객체에 대한 다른 스레드의 접근을 방지한다.
			for (String key : keys) {
				WebSocketSession ws = map.get(key);
				try {
					ws.sendMessage(new TextMessage(sendMessage));
				} catch (IOException e) {
				}
			}
		}
	}

	public int getSize() {
		Set<String> keys = map.keySet();
		return keys.size();
	}

	@Scheduled(fixedDelay = 1000) // scheduler 끝나는 시간 기준으로 1000 간격으로 실행
	public void fixedDelayTask() {
		
		List<SendData3> sdList = new ArrayList<>();
		List<ContainerWork> worklist = new ArrayList<>();
		int sendFlag = 0;
		
		
		if (getSize() == 0) {
			return;
		}
		
		worklist = containerworkrepository.findWorkList();


		if (!worklist.isEmpty() && !worklist.get(0).getContainer().equals(beforeWorklist.getContainer())) {
			sendFlag = 1;
			for (ContainerWork work : worklist) {
				SendData3 sendData = new SendData3();
				sendData.setContainer(work.getContainer());
				sendData.setShip(work.getShip());
				sendData.setVoyage(work.getVoyage());
				sendData.setBlock1(work.getBlock1());
				sendData.setBay1(work.getBay1());
				sendData.setRow1(work.getRow1());
				sendData.setTier1(work.getTier1());
				sendData.setTimeEnd(work.getTimeEnd());
				
				sdList.add(sendData);
			}

		}

		try {
			// Create ObjectMapper instance
			ObjectMapper objectMapper = new ObjectMapper();

			if (sendFlag == 1) {
				System.out.println("*********Send findWorkList*********");
				sendData(objectMapper.writeValueAsString(sdList));
				sendFlag = 0;
				beforeWorklist = worklist.get(0);
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
	private final WebSocketHandler1 webSocketHandler;
	private final WebSocketHandler2 webSocketHandler2;
	private final WebSocketHandler3 webSocketHandler3;

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(webSocketHandler, "pushservice").setAllowedOrigins("*")
				.addHandler(webSocketHandler2, "findWorkListByATC").setAllowedOrigins("*")
				.addHandler(webSocketHandler3, "findWorkList").setAllowedOrigins("*");

	}
}