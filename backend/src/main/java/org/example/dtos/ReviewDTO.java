package org.example.dtos;

import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;

@Entity("reviewData")
public class ReviewDTO {

    @Id
    private ObjectId id;
    private String title;
    private String description;
    private String authorId;
    public int bookToken;
    private int rating;

    public ReviewDTO(String title, String description, String authorId, int bookToken, int rating) {
        this.title = title;
        this.description = description;
        this.authorId = authorId;
        this.bookToken = bookToken;
        this.rating = rating;
    }

    public ReviewDTO() {}

    public int getBookToken() {
        return bookToken;
    }

    public void setBookToken(int bookToken) {
        this.bookToken = bookToken;
    }

    public String getAuthorId() {
        return authorId;
    }

    public void setAuthorId(String authorId) {
        this.authorId = authorId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }
}
