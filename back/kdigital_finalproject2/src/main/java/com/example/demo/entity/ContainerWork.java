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
    private String workCode;
    private String workingCode;
    private String state;
    private String shipVoyage;
    private String ship;
    private Integer year;
    private Integer voyage;
    private String block1;
    private String bay1;
    private String row1;
    private String tier1;
    private String bayRowTier1;
    private String block2;
    private String bay2;
    private String row2;
    private String tier2;
    private String bayRowTier2;
    private String truckNum;
    private String fullOrEmpty;
    private String containerSize;
    private String crainNum;
    private String workingStart;
    private String timeStart;
    private String workingEnd;
    private String timeEnd;
    private String timeTaken;
    private String blockCrainNum;
}