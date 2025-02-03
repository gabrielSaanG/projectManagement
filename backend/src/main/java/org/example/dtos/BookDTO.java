package org.example.dtos;

import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;
@Entity("bookData")
public class BookDTO {
    @Id
    private String id;
    private int token;
    private String imageURL;
    private String title;
    private String author;
    private String date;
    private String rating;
    private String genre;

    public BookDTO() {}

    public BookDTO(String imageURL, String title, String author, String date, String rating, String genre, int token) {
        this.imageURL = imageURL;
        this.title = title;
        this.author = author;
        this.date = date;
        this.rating = rating;
        this.genre = genre;
        this.token = token;
    }

    public int getToken() {
        return token;
    }

    public void setToken(int token) {
        this.token = token;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }
}
