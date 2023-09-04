package com.example.demo.controller;


import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
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
	public List<Notice> noticeAll()	{
		List<Notice> data = repository.findAll();
		
		return data;
	}
	
	
	@PostMapping("/createNotice")
	public Notice createNotice (@RequestBody Notice notice) throws IOException	{
		
		return service.insertNotice(notice);
	}
	
	
	@PutMapping("/updateNotice")
	public Notice updateNotice (@RequestBody Notice notice) throws IOException	{
		
		return service.updateNotice(notice);
	}
	
	@DeleteMapping("/deleteNotice")
	public boolean deleteNotice(@RequestBody Notice notice) throws IOException	{
		return service.deleteNotice(notice);
	}
	
	
	
	
	
}
