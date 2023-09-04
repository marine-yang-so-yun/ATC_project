package com.example.demo.controller;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.repository.ContainerWorkRepository;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
class CurrentContainer	{
	private String container;
	private Timestamp timeEnd;
	private int bay;
	private int row;
	private int tier;
	
	private String block;
}

@RestController
@RequestMapping("/containerwork")
public class ContainerWorkController {

   
   @Autowired
   private ContainerWorkRepository repository;
   
   
   //각 컨테이너의 마지막 위치를 보내주는 쿼리
   @GetMapping("/current")
   public List<Object> workAll()   {
      List<Object[]> list = repository.findWorkAll();
      List<Object> result = new ArrayList<>();
      
      for (Object[] objs : list)   {
         CurrentContainer temp = new CurrentContainer();
         temp.setContainer((String)objs[0]);
         temp.setTimeEnd((Timestamp)objs[1]);
         temp.setBlock((String)objs[2]);
         temp.setBay((int)objs[3]);
         temp.setRow((int)objs[4]);
         temp.setTier((int)objs[5]);
         result.add(temp);
      }
      
      return result;
   }
   
}
