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

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Builder
class CurrentContainer {
	private String container;
	private Timestamp timeEnd;
	private int bay2;
	private int row2;
	private int tier2;
	private String block2;
}

@Getter
@Setter
@ToString
class WorkingCrane {
	private int craneseq;
	private String crane;
}

@Getter
@Setter
@ToString
class LastTimeWork {
	private String block2;
	private Timestamp timeEnd;
	private int bay2;
	private int row2;
	private int tier2;
	private String crane;
}


@RestController
@RequestMapping("/containerwork")
public class ContainerWorkController {

	@Autowired
	private ContainerWorkRepository repository;

	@Autowired
	private MaxblockRepository maxblockrepository;

	// 각 컨테이너의 마지막 위치를 보내주는 쿼리
	@GetMapping("/current")
	public List<Object> workAll() {
		List<Object[]> list = repository.findCurrentWorkAll();
		Map<String, CurrentContainer> map = new HashMap<>();

		// container, timeEnd, block2, bay2, row2, tier2, crane
		// 현재 컨테이너 정보
		for (Object[] objs : list) {
			CurrentContainer temp = CurrentContainer.builder().container((String) objs[0]).timeEnd((Timestamp) objs[1])
					.block2((String) objs[2]).bay2((Integer) objs[3]).row2((Integer) objs[4]).tier2((Integer) objs[5])
					.build();

			map.put(String.format("%s,%d,%d,%d", temp.getBlock2(), temp.getBay2(), temp.getRow2(), temp.getTier2()), temp);

		}

		// block 정보를 읽어온다
		List<Maxblock> maxblocklist = maxblockrepository.findAll();
		for (Maxblock maxblock : maxblocklist) {
			for (int bay = 1; bay <= maxblock.getMaxbay(); bay++) {
				for (int row = 1; row <= maxblock.getMaxrow(); row++) {
					for (int tier = 1; tier <= maxblock.getMaxtier(); tier++) {
						String key = String.format("%s,%d,%d,%d", maxblock.getBlock(), bay, row, tier);
						CurrentContainer container = map.get(key);
						if (container != null) {
							for (int tier1 = 1; tier1 < tier; tier1++) {
								String key1 = String.format("%s,%d,%d,%d", maxblock.getBlock(), bay, row, tier1);
								map.put(key1, CurrentContainer.builder().block2(maxblock.getBlock()).container(null)
										.timeEnd(null).bay2(bay).row2(row).tier2(tier1).build());
							}
						}
					}
				}
			}
		}

		List<Object> result = new ArrayList(map.values());

		return result;
	}

	// 해당 블록에서 일하는 ATC 번호를 찾는 쿼리
	@GetMapping("/findWorkingCrane/{blockname}")
	public List<Object> findWorkingCrane(@PathVariable String blockname) {
		List<String> list = repository.findWorkingCrane(blockname);
		List<Object> result = new ArrayList<>();
		int i = 1;
		for (String objs : list) {
			WorkingCrane workingcrane = new WorkingCrane();
			workingcrane.setCraneseq(i);
			workingcrane.setCrane((String) objs);
			result.add(workingcrane);
			i++;
		}

		return result;

	}

	// 블록별로 마지막으로 일한 crane, timeEnd, block2, bay2, row2, tier2 를 출력하는 쿼리
	@GetMapping("/findLastTimeWorkByCrane")
	public List<Object> findLastTimeWorkByBlock() {
		List<Object[]> list = repository.findLastTimeWorkByCrane();
		List<Object> result = new ArrayList<>();

		for (Object[] objs : list) {
			LastTimeWork temp = new LastTimeWork();
			temp.setCrane((String) objs[0]);
			temp.setTimeEnd((Timestamp) objs[1]);
			temp.setBlock2((String) objs[2]);
			temp.setBay2((int) objs[3]);
			temp.setRow2((int) objs[4]);
			temp.setTier2((int) objs[5]);
			result.add(temp);

		}
		return result;

	}

	@GetMapping("/allWorkList")
	public List<Object> allWorkList() {
		List<ContainerWork> list = repository.findAllByOrderByTimeEndAsc();
		List<Object> result = new ArrayList<>();

		for (ContainerWork containerwork : list) {
			result.add(containerwork);
		}

		return result;
	}
	
	@GetMapping("/allWorkList/{atcname}")
	public List<Object> allWorkList(@PathVariable String atcname) {
		List<ContainerWork> list = repository.findAllListByATC(atcname);
		List<Object> result = new ArrayList<>();

		for (ContainerWork containerwork : list) {
			result.add(containerwork);
		}

		return result;
	}

}
