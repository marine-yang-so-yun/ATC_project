package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.Maxblock;

public interface MaxblockRepository extends JpaRepository<Maxblock, String>{

	
	@Query(value = "SELECT m from Maxblock m where block = :keyword")
	Maxblock findBlockInfo(@Param("keyword") String block);

	@Query(value = "select m from Maxblock m where block like '7%' or block like'8%' or block like '9%'")
	List<Maxblock> findAllBlock();
}
