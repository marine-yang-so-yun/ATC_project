package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entity.ContainerWork;

public interface ContainerWorkRepository extends JpaRepository<ContainerWork, Integer> {

	
	@Query(value = "SELECT c FROM ContainerWork c where timeStart = date_format(now(), '%H:%i:%s')")
	List<ContainerWork> findWorkingStart();

	
	@Query(value = "SELECT container, timeEnd, bay2, row2, tier2"
			+ "FROM ContainerWork "
			+ "WHERE (container, timeEnd) IN ( "
			+ "  SELECT container, MAX(timeEnd) "
			+ "  FROM ContainerWork "
			+ "  WHERE timeEnd <= DATE_FORMAT(NOW(), '%H:%i:%s') "
			+ "  GROUP BY container"
			+ ")")
	List<Object[]> findWorkAll();
}
