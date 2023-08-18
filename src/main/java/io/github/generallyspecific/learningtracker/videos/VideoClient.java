package io.github.generallyspecific.learningtracker.videos;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name="youtube-service", url="${youtube.api.url}", configuration = VideoFeignConfiguration.class)
public interface VideoClient {
    @GetMapping("/videos")
    VideoResponse getVideo(@RequestParam("id") String id);
}
