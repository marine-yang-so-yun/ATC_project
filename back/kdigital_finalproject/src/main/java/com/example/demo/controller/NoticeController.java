package com.example.demo.controller;


import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Notice;
import com.example.demo.repository.NoticeRepository;
import com.example.demo.service.NoticeService;

@RestController
@RequestMapping("/notice")
public class NoticeController {

	
	@Autowired
	private NoticeRepository repository;
	
	@Autowired
	private NoticeService service;
	
	@GetMapping
	public List<Object[]> noticeAll()	{
		List<Object[]> data = repository.dataAll();
		List<Map<String, Object>> detail = new ArrayList<>();
		
		
//		for (Object[] row : data)	{
//			Map<String, Object> detail1 = new HashMap<>();
//			detail1.put("noticeseq", row[0]);
//			detail1.put("noticetitle", row[1]);
//			detail1.put("noticewriter", row[2]);
//			detail1.put("noticedate", row[3]);
//			detail1.put("noticeurgency", row[4]);
//			detail1.put("noticedetail", row[5]);
//			
//			detail.add(detail1);
//		}
		
		return data;
	}
	
	
	@PostMapping("/createNotice")
	public Notice createNotice (@RequestBody Notice notice) throws IOException	{
		
		return service.insertNotice(notice);
	}
	
	@PutMapping("/updateNotice/{seq}")
	public Notice updateNotice(@RequestBody Notice notice) throws IOException	{
		
		return service.updateNotice(notice); 
	}
	
	
}
