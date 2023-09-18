package com.example.demo.entity;

import java.sql.Timestamp;
import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
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
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Notice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer noticeseq;
    private String noticetitle;
    private String noticewriter;
    private Boolean noticeurgency;
    private String noticedetail;

    @Column(columnDefinition = "timestamp default current_timestamp()")
    private Timestamp noticedate;



    @PrePersist
    public void prePersist() {
        if (noticedate == null) {
            noticedate = Timestamp.from(Instant.now());
        }
    }
}
