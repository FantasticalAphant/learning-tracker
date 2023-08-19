package io.github.generallyspecific.learningtracker.articles;

import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

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
            Document document = org.jsoup.Jsoup.connect(url).get();
            String title = document.title();
            article.setTitle(title);
        } catch (Exception e) {
            System.out.println("Error connecting to " + url);
        }
        article.setCreated(Instant.now());

        return articleRepository.save(article);
    }

    public void deleteArticle(String url) {
        articleRepository.deleteById(url);
    }
}
