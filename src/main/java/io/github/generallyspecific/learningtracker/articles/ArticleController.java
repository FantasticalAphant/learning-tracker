package io.github.generallyspecific.learningtracker.articles;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "${cors.allowed.origins}")
public class ArticleController {
    private final ArticleService articleService;

    @Autowired
    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    // Get all articles sorted by title in ascending order
    @GetMapping("/articles")
    public List<Article> getArticles() {
        return articleService.getArticles();
    }

    // Add a new article to the list
    @PostMapping("/articles")
    public Article addArticle(@RequestBody Article article) {
        return articleService.addArticle(article);
    }

    // Delete an article from the list based on its url
    @DeleteMapping("/article")
    public void deleteArticle(@RequestParam String url) {
        articleService.deleteArticle(url);
    }

    // Get a list of topic IDs for an article
    @GetMapping("/article/topics")
    public List<UUID> getTopicsForArticle(@RequestParam String url) {
        return articleService.getTopicsForArticle(url);
    }

    // Update topics for an article based on topic IDs
    @PutMapping("/article/topics")
    public void addTopicsToArticle(@RequestParam String url, @RequestBody List<UUID> topicIds) {
        articleService.addTopicsToArticle(url, topicIds);
    }

    // Get all articles for a specific topic using the topic ID
    @GetMapping("/articles/topic/{topicId}")
    public List<Article> getArticlesByTopic(@PathVariable UUID topicId) {
        return articleService.getArticlesByTopic(topicId);
    }

    // Update the time the article was last accessed
    @PutMapping("/article/access")
    public void updateLastAccessed(@RequestParam String url) {
        articleService.updateLastAccessed(url);
    }
}
