package com.example.demo.controller;




import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	private String crane;
}

@Getter
@Setter
@ToString
class WorkingCrane	{
	private int craneseq;
	private String crane;
}

@Getter
@Setter
@ToString
class LastTimeWork	{
	private String block;
	private Timestamp timeEnd;
	private int bay;
	private int row;
	private int tier;
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
      
      SimpleDateFormat sf = new SimpleDateFormat("yy-MM-dd HH:mm:ss");
      
      
      for (Object[] objs : list)   {
    	  
         CurrentContainer temp = new CurrentContainer();
         temp.setContainer((String)objs[0]);
         temp.setTimeEnd((Timestamp)objs[1]);
         temp.setBlock((String)objs[2]);
         temp.setBay((int)objs[3]);
         temp.setRow((int)objs[4]);
         temp.setTier((int)objs[5]);
         temp.setCrane((String)objs[6]);
         result.add(temp);
         
         
      }
      
      return result;
   }
   
   
   // 해당 블록에서 일하는 ATC 번호를 찾는 쿼리
   @GetMapping("/findworkingcrane/{blockname}")
   public List<Object> findWorkingCrane(@PathVariable String blockname)	{
	   List<String> list = repository.findWorkingCrane(blockname);
	   List<Object> result = new ArrayList<>();
	   int i = 1;
	   for (String objs:list)	{
		   
		   WorkingCrane workingcrane = new WorkingCrane();
		   workingcrane.setCraneseq(i);
		   workingcrane.setCrane((String)objs);
		   result.add(workingcrane);
	   }
	   
	   return result;
	   
   }
   
   // 블록별로 마지막으로 일한 timeEnd, block2, bay2, row2, tier2 를 출력하는 쿼리
   @GetMapping("/findLastTimeWorkByBlock")
   public List<Object> findLastTimeWorkByBlock()	{
	   List<Object[]> list = repository.findLastTimeWorkByBlock();
	   List<Object> result = new ArrayList<>();
	   
	   
	   for (Object[] objs : list)	{
		   LastTimeWork temp = new LastTimeWork();
		   temp.setBlock((String) objs[0]);
		   temp.setTimeEnd((Timestamp) objs[1]);
		   temp.setBay((int) objs[2]);
		   temp.setRow((int) objs[3]);
		   temp.setTier((int) objs[4]);
		   
		   result.add(temp);
		   
	   }
	   return result;
   
   }
   
}
