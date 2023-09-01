package com.example.demo.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class TestEntity {

	@Id
	private String id;
	
	//@Temporal(TemporalType.TIMESTAMP)
	//@CreationTimestamp
	
	private Date timestamp;
}
