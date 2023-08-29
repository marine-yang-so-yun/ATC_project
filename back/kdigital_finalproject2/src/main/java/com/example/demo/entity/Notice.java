package com.example.demo.entity;

import java.sql.Date;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Notice {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer noticeseq;
	private String noticetitle;
	private String noticewriter;
	@CreationTimestamp
	private Date noticedate;
	private boolean noticeurgency;
	private String noticedetail;
}
