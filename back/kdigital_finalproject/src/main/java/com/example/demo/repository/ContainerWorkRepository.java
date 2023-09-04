package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entity.ContainerWork;

public interface ContainerWorkRepository extends JpaRepository<ContainerWork, Integer> {

	
	@Query(value = "SELECT c FROM ContainerWork c WHERE TIME(timeEnd) = TIME(NOW())")
	List<ContainerWork> findWorkingStart();

	
	@Query(value = "SELECT container, timeEnd, block2, bay2, row2, tier2 "
			+ "FROM ContainerWork "
			+ "WHERE (container, timeEnd) IN ( "
			+ "  SELECT container, MAX(timeEnd) "
			+ "  FROM ContainerWork "
			+ "  WHERE TIME(timeEnd) <= TIME(NOW()) "
			+ "  GROUP BY container"
			+ ")")
	List<Object[]> findWorkAll();
}
