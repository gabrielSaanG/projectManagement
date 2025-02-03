package org.example.dtos;

import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;

@Entity("QuoteComponentData")
public class QuoteDTO {
    @Id
    private String id;
    private String quote;
    private String author;

    public QuoteDTO(){
    }

    public QuoteDTO(String quote, String author) {
        this.quote = quote;
        this.author = author;
    }

    public String getQuote() {
        return quote;
    }

    public void setQuote(String quote) {
        this.quote = quote;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }
}
