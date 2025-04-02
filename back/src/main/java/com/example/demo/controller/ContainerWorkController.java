package com.example.demo.controller;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.ContainerWork;
import com.example.demo.entity.Maxblock;
import com.example.demo.repository.ContainerWorkRepository;
import com.example.demo.repository.MaxblockRepository;


import com.example.demo.service.ContainerWorkService;



@RestController
@RequestMapping("/containerwork")
public class ContainerWorkController {

	@Autowired
	private ContainerWorkRepository repository;

	@Autowired
	private ContainerWorkService service;

	// 각 컨테이너의 마지막 위치를 보내주는 쿼리
	@GetMapping("/current")
	public List<Object> workAll() {
		return service.getWorkAll();
	}

	// 해당 블록에서 일하는 ATC 번호를 찾는 쿼리
	@GetMapping("/findWorkingCrane/{blockname}")
	public List<Object> findWorkingCrane(@PathVariable String blockname) {
		return service.getFindWorkingCrane(blockname);

	}

	// 블록별로 마지막으로 일한 crane, timeEnd, block2, bay2, row2, tier2 를 출력하는 쿼리
	@GetMapping("/findLastTimeWorkByCrane")
	public List<Object> findLastTimeWorkByBlock() {
		return service.getFindLastTimeWorkByBlock();

	}

	@GetMapping("/allWorkList")
	public List<Object> allWorkList() {
		return service.getAllWorkList();
	}
	
	@GetMapping("/allWorkList/{atcname}")
	public List<Object> allWorkList(@PathVariable String atcname) {
		return service.getAllWorkList(atcname);
	}

}
