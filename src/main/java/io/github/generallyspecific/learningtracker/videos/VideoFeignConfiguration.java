package io.github.generallyspecific.learningtracker.videos;

import feign.RequestInterceptor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class VideoFeignConfiguration {

    @Value("${youtube.api.key}")
    private String apiKey;

    @Bean
    public RequestInterceptor requestInterceptor() {
        return requestTemplate -> {
            requestTemplate.query("part", "snippet, contentDetails, statistics");
            requestTemplate.query("key", apiKey);
        };
    }

}
