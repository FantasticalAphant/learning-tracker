package io.github.generallyspecific.learningtracker.topic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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

    public List<Topic> getTopics(int limit) {
        if (limit > 0) {
            return topicRepository.findBy(PageRequest.of(0, limit, Sort.by(Sort.Direction.ASC, "name")));
        }
        return topicRepository.findAll(Sort.by(Sort.Direction.ASC, "name"));
    }

    public Topic addTopic(Topic topic) {
        topic.setId(UUID.randomUUID());
        return topicRepository.save(topic);
    }

    public Topic getTopic(String id) {
        return topicRepository.findById(UUID.fromString(id)).orElse(null);
    }

    public void deleteTopic(String id) {
        topicRepository.deleteById(UUID.fromString(id));
    }
}
