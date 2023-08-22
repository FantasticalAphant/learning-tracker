package io.github.generallyspecific.learningtracker.topic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class TopicService {
    private final TopicRepository topicRepository;

    @Autowired
    public TopicService(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }

    public List<Topic> getTopics() {
        return topicRepository.findAll();
    }

    public Topic addTopic(Topic topic) {
        topic.setId(UUID.randomUUID());
        return topicRepository.save(topic);
    }

    public Topic getTopic(String id) {
        return topicRepository.findById(UUID.fromString(id)).orElse(null);
    }
}
