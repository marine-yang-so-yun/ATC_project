package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Maxblock;
import com.example.demo.repository.MaxblockRepository;
import com.example.demo.service.MaxblockService;
@RestController
@RequestMapping("/maxblock")
public class MaxblockController {

    @Autowired
    private final MaxblockRepository repository;

    @Autowired
    private MaxblockService service;

    public MaxblockController(MaxblockRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/findall")
    public List<Maxblock> findAll() {
        return service.getAllBlock();
    }
}
