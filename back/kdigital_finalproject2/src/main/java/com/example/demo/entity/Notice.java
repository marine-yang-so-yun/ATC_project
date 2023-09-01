package com.example.demo.entity;


import java.util.Date;

import jakarta.persistence.Column;
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
	
	@Column(columnDefinition = "timestamp default current_timestamp()")
	@Builder.Default
	private Date noticedate = new Date();
	private boolean noticeurgency;
	private String noticedetail;
}
