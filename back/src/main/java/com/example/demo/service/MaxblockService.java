package com.example.demo.service;

import java.io.IOException;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.repository.MaxblockRepository;
import com.example.demo.entity.Maxblock;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MaxblockService {
    
    @Autowired
    MaxblockRepository repository;

    public MaxblockService(MaxblockRepository maxblockrepository) {
        this.repository = maxblockrepository;
    }

    public List<Maxblock> getAllBlock() {
        return repository.findAllBlock();
    }

}
