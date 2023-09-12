package com.example.demo.controller;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Maxblock;
import com.example.demo.entity.dto.ContainerStatus;
import com.example.demo.repository.ContainerWorkRepository;
import com.example.demo.repository.MaxblockRepository;
import com.example.demo.service.ContainerStatusService;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Builder
class CurrentContainer	{
	private String block;
	private String container;
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
	
	@Autowired
	private ContainerStatusService service;
	
	@Autowired
	private MaxblockRepository maxblockrepository;
	
	//각 컨테이너의 마지막 위치를 보내주는 쿼리
	@GetMapping("/current")
	public Map<String, CurrentContainer> workAll()	{
//		List<Object[]> list = repository.findWorkAll();
//		List<Object> result = new ArrayList<>();
//		
//		for (Object[] objs : list)	{
//			CurrentContainer temp = new CurrentContainer();
//			
//			temp.setContainer((String)objs[0]);
//			temp.setTimeEnd((String)objs[1]);
//			temp.setBay(Integer.parseInt(((String)objs[2]).substring(1)));
//			temp.setRow(Integer.parseInt(((String)objs[3]).substring(1)));
//			temp.setTier(Integer.parseInt(((String)objs[4]).substring(1)));
//			
//			result.add(temp);
//		}
//		
//		return result;
		
		List<Object[]> list = repository.findWorkAll();
		Map<String, CurrentContainer> map = new HashMap<>();
		
		//container, timeEnd, block2, bay2, row2, tier2, crane
		
		
		// 현재 컨테이너 정보
		for (Object[] objs : list)	{
			CurrentContainer temp = CurrentContainer.builder()
							.container((String)objs[0])
							.timeEnd((Timestamp)objs[1])
							.block((String)objs[2])
							.bay((Integer)objs[3])
							.row((Integer)objs[4])
							.tier((Integer)objs[5])
							.build();
							
			
			map.put(String.format("%s,%d,%d,%d",temp.getBlock(),temp.getBay(),temp.getRow(),temp.getTier()),temp);
			
		}
		
		//block 정보를 읽어온다
		List<Maxblock> maxblocklist = maxblockrepository.findAll();
		for (Maxblock maxblock : maxblocklist)	{
			for (int bay = 1 ; bay <= maxblock.getMaxbay(); bay++)	{
				for (int row = 1; row <= maxblock.getMaxrow(); row++)	{
					for (int tier = 1; tier <= maxblock.getMaxtier(); tier++)	{
						String key = String.format("%s,%d,%d,%d",maxblock.getBlock(), bay, row,tier);
						CurrentContainer container = map.get(key);
						if (container != null) 	{
							for (int tier1 = 1; tier1 < tier; tier1++)	{
								String key1 = String.format("%s,%d,%d,%d",maxblock.getBlock(), bay, row,tier1);
								map.put(key1, CurrentContainer.builder()
										.block(maxblock.getBlock())
										.container(null)
										.timeEnd(null)
										.bay(bay)
										.row(row)
										.tier(tier1).build());
										
							}
							
						}
					}
				}
			}
		}
		
		// 블럭 순서대로 정렬 
		
		
		return map;
	}
	
	@GetMapping("/dummydata")
	public List<ContainerStatus> dummyData()	{
		
		List<ContainerStatus> result = new ArrayList<>();
		String [] blockname = {"7A", "7B", "7C", "7D", "8A", "8B", "8C", "8D"};
		
		for (String block : blockname)	{
			result.addAll(service.yourMethod(block));
		}
		
		return result;
	}

}
