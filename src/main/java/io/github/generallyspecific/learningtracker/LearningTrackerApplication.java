package io.github.generallyspecific.learningtracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class LearningTrackerApplication {

    public static void main(String[] args) {
        SpringApplication.run(LearningTrackerApplication.class, args);
    }

}
