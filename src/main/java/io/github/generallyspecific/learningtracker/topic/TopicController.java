package io.github.generallyspecific.learningtracker.topic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "${cors.allowed.origins}")
public class TopicController {
    private final TopicService topicService;

    @Autowired
    public TopicController(TopicService topicService) {
        this.topicService = topicService;
    }

    @GetMapping("/topics")
    public List<Topic> getTopics(@RequestParam(required = false, defaultValue = "0") int limit) {
        return topicService.getTopics(limit);
    }

    // Update name and description
    @PutMapping("/topics/{id}")
    public Topic updateTopic(@PathVariable String id, @RequestBody Map<String, String> payload) {
        String name = payload.get("name");
        String description = payload.get("description");
        return topicService.updateTopic(id, name, description);
    }

    @PostMapping("/topics")
    public Topic addTopic(@RequestBody Topic topic) {
        return topicService.addTopic(topic);
    }

    @GetMapping("/topics/{id}")
    public Topic getTopic(@PathVariable String id) {
        return topicService.getTopic(id);
    }

    @DeleteMapping("/topics/{id}")
    public void deleteTopic(@PathVariable String id) {
        topicService.deleteTopic(id);
    }
}
