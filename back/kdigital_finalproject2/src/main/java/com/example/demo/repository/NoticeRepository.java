package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entity.Notice;

public interface NoticeRepository extends JpaRepository <Notice, Integer>{
	
	@Query(value = "SELECT n FROM Notice n")
	List<Object[]> dataAll();
	
}
