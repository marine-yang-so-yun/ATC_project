package com.example.demo.entity;

import java.sql.Timestamp;

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


@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ContainerWork {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String container;
    private String ship;
    private String workCode;
    private String state;
    private Integer year;
    private Integer voyage;
    private String block1;
    private Integer bay1;
    private Integer row1;
    private Integer tier1;
    private String block2;
    private Integer bay2;
    private Integer row2;
    private Integer tier2;
    private String truckNum;
    private String fullOrEmpty;
    private String containerSize;
    private String crane;
    private Timestamp timeEnd;
}