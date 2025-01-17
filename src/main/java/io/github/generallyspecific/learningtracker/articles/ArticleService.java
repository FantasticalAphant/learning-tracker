package io.github.generallyspecific.learningtracker.articles;

import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ArticleService {
    private final ArticleRepository articleRepository;

    @Autowired
    public ArticleService(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    public List<Article> getArticles() {
        return articleRepository.findAll(Sort.by(Sort.Direction.ASC, "title"));
    }

    public Article addArticle(Article article) {
        String url = article.getUrl();
        try {
            Document document = org.jsoup.Jsoup.connect(url).userAgent("Mozilla/5.0").timeout(3000).get();

            String title = document.title();

            Element h1 = document.select("h1").first();
            if (h1 != null) {
                article.setTitle(h1.attr("content"));
            }

            Element ogTitle = document.select("meta[property=og:title]").first();
            if (ogTitle != null) {
                article.setTitle(ogTitle.attr("content"));
            }

            article.setTitle(title);
        } catch (Exception e) {
            // JSoup call may fail due to Captcha checks
            System.out.println("Error connecting to " + url);
            article.setTitle(url);
        }
        article.setCreated(Instant.now());

        return articleRepository.save(article);
    }

    public void deleteArticle(String url) {
        articleRepository.deleteById(url);
    }

    public List<Article> getArticlesByTopic(UUID topicId) {
        return articleRepository.findAllByTopic(topicId);
    }

    public void addTopicsToArticle(String url, List<UUID> topicIds) {
        articleRepository.findById(url).ifPresent(article -> {
            article.setTopics(topicIds);
            articleRepository.save(article);
        });
    }

    public List<UUID> getTopicsForArticle(String url) {
        return articleRepository.findById(url).map(Article::getTopics).orElse(new ArrayList<>());
    }

    public void updateLastAccessed(String url) {
        articleRepository.findById(url).ifPresent(article -> {
            article.setAccessed(Instant.now());
            articleRepository.save(article);
        });
    }
}
