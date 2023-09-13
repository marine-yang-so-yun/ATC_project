package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.ContainerWork;

public interface ContainerWorkRepository extends JpaRepository<ContainerWork, Integer> {

	
	@Query(value = "SELECT c FROM ContainerWork c WHERE TIME(timeEnd) = TIME(NOW())")
	List<ContainerWork> findWorkingStart();

	
	@Query(value = "SELECT container, timeEnd, block2, bay2, row2, tier2, crane "
			+ "FROM ContainerWork "
			+ "WHERE (container, timeEnd) IN ( "
			+ "  SELECT container, MAX(timeEnd) "
			+ "  FROM ContainerWork "
			+ "  WHERE TIME(timeEnd) <= TIME(NOW()) "
			+ "  GROUP BY container"
			+ ")")
	List<Object[]> findWorkAll();
	
	
	
	// 블록별로 마지막으로 일한 timeEnd, block2, bay2, row2, tier2 를 출력하는 쿼리
	
	@Query(value = "SELECT c.block2, c.max_time_end, cw.bay2, cw.row2, cw.tier2, cw.crane " +
		       "FROM ( " +
		       "    SELECT block2, MAX(time_end) AS max_time_end " +
		       "    FROM container_work " +
		       "    WHERE TIME(time_end) <= TIME(NOW()) " +
		       "    GROUP BY block2 " +
		       ") AS c " +
		       "JOIN container_work AS cw " +
		       "ON c.block2 = cw.block2 AND c.max_time_end = cw.time_end", nativeQuery=true)
	
		List<Object[]> findLastTimeWorkByBlock();


	
	// 해당 블록에서 일하는 ATC 번호를 찾는 코드
	
	@Query(value = "SELECT crane from ContainerWork WHERE block2 = :keyword GROUP BY crane ORDER BY crane ASC")
	List<String> findWorkingCrane(@Param("keyword") String paramValue);
	
	// 해당 블록에서 일어나는 일을 ATC 번호로 오름차순 정렬해서 조회하는 코드
	
	@Query(value = "SELECT c from ContainerWork c WHERE block2 = :keyword ORDER BY crane ASC")
	List<Object[]> findWorkListOrderByCrane(@Param("keyword") String paramValue);
	
	
	// ATC 번호로 현재 시점부터 할 작업을 조회하는 쿼리
	@Query(value = "SELECT c FROM ContainerWork c WHERE crane=:keyword AND TIME(NOW())<=TIME(timeEnd) ORDER BY timeEnd ASC")
	List<ContainerWork> findWorkListByATC(@Param("keyword") String paramValue);
	
	@Query(value = "select container, ship, block1, bay1, row1, tier1, crane, time_end from container_work where time(now()) <= time(time_end)", nativeQuery=true)
	List<ContainerWork> findWorkList();
}
