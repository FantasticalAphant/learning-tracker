package io.github.generallyspecific.learningtracker.books;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BookResponse {
    private String kind; // "books#volumes"
    private Integer totalItems; // Total number of items returned by the search
    private List<BookVolume> items;
}

@Getter
@Setter
class BookVolume {
    private String id; // Google Books ID
    private VolumeInfo volumeInfo;
}

@Getter
@Setter
class VolumeInfo {
    private String title;
    private List<String> authors;
    private String publisher;
    private String publishedDate;
    private String description;
    private List<IndustryIdentifier> industryIdentifiers; // ISBN
    private Integer pageCount;
    private String printType; // BOOK
    private List<String> categories; // e.g. "Computers"
    private ImageLinks imageLinks; // thumbnail
    private String infoLink; // URL to Google Books page
}

@Getter
@Setter
class IndustryIdentifier {
    private String type;
    private String identifier;
}

@Getter
@Setter
class ImageLinks {
    private String smallThumbnail;
    private String thumbnail;
}