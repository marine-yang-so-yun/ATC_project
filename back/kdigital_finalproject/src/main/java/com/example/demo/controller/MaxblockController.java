package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Maxblock;
import com.example.demo.repository.MaxblockRepository;

@RestController
@RequestMapping("/maxblock")
public class MaxblockController {

    private final MaxblockRepository repository;

    public MaxblockController(MaxblockRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/findall")
    public List<Maxblock> findAll() {
        return repository.findAllBlock();
    }
}
