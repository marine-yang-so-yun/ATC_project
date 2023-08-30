package com.example.demo.controller;


import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
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

	
	private final NoticeRepository repository;
	private final NoticeService service;
	
	public NoticeController (NoticeRepository repository, NoticeService service)	{
		this.repository = repository;
		this.service = service;
	}
	
	
	
	@GetMapping
	public List<Notice> noticeAll()	{
		return repository.findAll();	
	}
	
	
	@PostMapping("/createNotice")
	public Notice createNotice (@RequestBody Notice notice) throws IOException	{
		
		return service.insertNotice(notice);
	}
	
	
}
