package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Maxblock;
import com.example.demo.repository.ContainerWorkRepository;
import com.example.demo.repository.MaxblockRepository;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
class CurrentContainer	{
	private String container;
	private String timeEnd;
	private int bay;
	private int row;
	private int tier;
	
	private int block2;
}


@RestController
@RequestMapping("/containerwork")
public class ContainerWorkController {

	
	@Autowired
	private ContainerWorkRepository repository;
	
	
	//각 컨테이너의 마지막 위치를 보내주는 쿼리
	@GetMapping("/current")
	public List<Object> workAll()	{
		List<Object[]> list = repository.findWorkAll();
		List<Object> result = new ArrayList<>();
		
		for (Object[] objs : list)	{
			CurrentContainer temp = new CurrentContainer();
			temp.setContainer((String)objs[0]);
			temp.setTimeEnd((String)objs[1]);
			temp.setBay(Integer.parseInt(((String)objs[2]).substring(1)));
			temp.setRow(Integer.parseInt(((String)objs[3]).substring(1)));
			temp.setTier(Integer.parseInt(((String)objs[4]).substring(1)));
			result.add(temp);
		}
		
		return result;
	}
	
}
