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

    @GetMapping("/articles")
    public List<Article> getArticles() {
        return articleService.getArticles();
    }

    @PostMapping("/articles")
    public Article addArticle(@RequestBody Article article) {
        return articleService.addArticle(article);
    }

    @DeleteMapping("/article")
    public void deleteArticle(@RequestParam String url) {
        articleService.deleteArticle(url);
    }

    @GetMapping("/article/topics")
    public List<UUID> getTopicsForArticle(@RequestParam String url) {
        return articleService.getTopicsForArticle(url);
    }

    @PutMapping("/article/topics")
    public void addTopicsToArticle(@RequestParam String url, @RequestBody List<UUID> topicIds) {
        articleService.addTopicsToArticle(url, topicIds);
    }

    @GetMapping("/articles/topic/{topicId}")
    public List<Article> getArticlesByTopic(@PathVariable UUID topicId) {
        return articleService.getArticlesByTopic(topicId);
    }

    @PutMapping("/article/access")
    public void updateLastAccessed(@RequestParam String url) {
        articleService.updateLastAccessed(url);
    }
}
