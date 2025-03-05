package io.github.generallyspecific.learningtracker.topic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.Instant;
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
        // show the [limit] most recently updated topics
        // displays all topics in alphabetical order
        if (limit > 0) {
            // NOTE: this is only used for the recent topics sidebar for now
            // once more functionality is added, this needs to be updated
            return topicRepository.findBy(PageRequest.of(0, limit, Sort.by(Sort.Direction.DESC, "updatedAt")));
        }
        return topicRepository.findAll(Sort.by(Sort.Direction.ASC, "name"));
    }

    public Topic updateTopic(String id, String name, String description) {
        Topic topic = topicRepository.findById(UUID.fromString(id)).orElse(null);
        topic.setName(name);
        topic.setDescription(description);
        topic.setUpdatedAt(Instant.now());

        return topicRepository.save(topic);
    }

    public Topic addTopic(Topic topic) {
        topic.setId(UUID.randomUUID());
        topic.setCreatedAt(Instant.now());
        topic.setUpdatedAt(Instant.now());
        return topicRepository.save(topic);
    }

    public Topic getTopic(String id) {
        return topicRepository.findById(UUID.fromString(id)).orElse(null);
    }

    public void deleteTopic(String id) {
        // FIXME: deleting the topic makes the topic null for books, videos, etc.
        topicRepository.deleteById(UUID.fromString(id));
    }
}
