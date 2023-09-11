package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entity.dto.ContainerStatus;

@Service
public class ContainerStatusService {
    private final JdbcTemplate jdbcTemplate;

   
    @Autowired
    public ContainerStatusService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Transactional
    public List<ContainerStatus> yourMethod(String blockname) {
    	
    	
        // SQL 쿼리를 실행하고 결과를 ContainerStatus 객체의 List로 변환
        String sql = "DECLARE i INT DEFAULT 1; " +
                     "DECLARE j INT DEFAULT 1; " +
                     "DECLARE k INT DEFAULT 1; " +
                     "WHILE i <= (SELECT maxbay FROM maxblock WHERE block = ?) DO " +
                     "SET j = 1; " +
                     "WHILE j <= (SELECT maxrow FROM maxblock WHERE block = ?) DO " +
                     "IF (SELECT COUNT(*) FROM container_work2 WHERE block2 = ? AND bay2 = i AND row2 = j) != 0 THEN " +
                     "SET k = 1; " +
                     "WHILE k < (SELECT MIN(tier2) FROM container_work2 WHERE block2 = ? AND bay2 = i AND row2 = j) DO " +
                     "INSERT INTO container_work2 (block2, bay2, row2, tier2) VALUES (?, i, j, k); " +
                     "SET k = k + 1; " +
                     "END WHILE; " +
                     "END IF; " +
                     "SET j = j + 1; " +
                     "END WHILE; " +
                     "SET i = i + 1; " +
                     "END WHILE;";

        jdbcTemplate.update(sql, blockname, blockname, blockname, blockname, blockname, blockname);

        // 실행된 SQL 쿼리 결과를 가져오고 ContainerStatus 객체로 변환
        String selectQuery = "SELECT * FROM container_work2 WHERE block2 = ?";
        @SuppressWarnings("deprecation")
		List<ContainerStatus> containerStatusList = jdbcTemplate.query(selectQuery, new Object[]{blockname},
                new BeanPropertyRowMapper<>(ContainerStatus.class));

        return containerStatusList;
    	
    }
}
