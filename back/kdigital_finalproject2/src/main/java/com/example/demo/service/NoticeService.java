package com.example.demo.service;

import java.io.IOException;
import java.sql.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Notice;
import com.example.demo.repository.NoticeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NoticeService {

	
	@Autowired
	NoticeRepository noticeRepository;
	
	public NoticeService(NoticeRepository noticeRepository)	{
		this.noticeRepository = noticeRepository;
	}
	
	public List<Notice> getAllNotice()	{
		return noticeRepository.findAll();
	}
	
	public Notice insertNotice(Notice notice)	throws IOException{
		return noticeRepository.save(notice);
	}
	
	public Notice updateNotice(Notice notice) throws IOException	{
		int seq = notice.getNoticeseq();
		Notice noticetemp = noticeRepository.findById(seq).orElse(null);
		
		if (noticetemp != null)	{
			if(noticetemp.getNoticewriter().equals(notice.getNoticewriter()))	{
				noticetemp.setNoticetitle(notice.getNoticetitle());
				noticetemp.setNoticedate(notice.getNoticedate());
				noticetemp.setNoticedetail(notice.getNoticedetail());
			}
		}
		
		return noticeRepository.save(noticetemp);
		
	}

}
