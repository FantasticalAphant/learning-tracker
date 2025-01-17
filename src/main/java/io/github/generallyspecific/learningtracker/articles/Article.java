package io.github.generallyspecific.learningtracker.articles;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Document(collection="articles")
public class Article {
    @Id
    private String url;
    private String title;
    private String site;
    private Instant created;
    private Instant accessed;
    private List<UUID> topics;

    public Article(String url, String title, String site, Instant created, Instant accessed, List<UUID> topics) {
        this.url = url;
        this.title = title;
        this.site = site;
        this.created = created;
        this.accessed = accessed;
        this.topics = topics;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSite() {
        return site;
    }

    public void setSite(String site) {
        this.site = site;
    }

    public Instant getCreated() {
        return created;
    }

    public void setCreated(Instant created) {
        this.created = created;
    }

    public Instant getAccessed() {
        return accessed;
    }

    public void setAccessed(Instant accessed) {
        this.accessed = accessed;
    }

    public List<UUID> getTopics() {
        return topics;
    }

    public void setTopics(List<UUID> topics) {
        this.topics = topics;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Article article = (Article) o;
        return Objects.equals(url, article.url) && Objects.equals(title, article.title) && Objects.equals(site, article.site) && Objects.equals(created, article.created) && Objects.equals(accessed, article.accessed) && Objects.equals(topics, article.topics);
    }

    @Override
    public int hashCode() {
        return Objects.hash(url, title, site, created, accessed, topics);
    }

    @Override
    public String toString() {
        return "Article{" +
                "url='" + url + '\'' +
                ", title='" + title + '\'' +
                ", site='" + site + '\'' +
                ", created=" + created +
                ", accessed=" + accessed +
                ", topics=" + topics +
                '}';
    }
}

