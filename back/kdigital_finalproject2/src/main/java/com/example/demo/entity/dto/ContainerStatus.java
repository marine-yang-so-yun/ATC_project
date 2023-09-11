package com.example.demo.entity.dto;

import com.example.demo.entity.Member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ContainerStatus {

	
	private String container;
	private String block;
	private int bay;
	private int row;
	private int tier;
}
