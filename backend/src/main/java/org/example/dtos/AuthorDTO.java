package org.example.dtos;

import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;

@Entity("AuthorData")
public class AuthorDTO {
    @Id
    private ObjectId id;
    private String firstName;
    private String lastName;
    private String authorDescription;

    public AuthorDTO() {}

    public AuthorDTO(String firstName, String lastName, String authorDescription) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.authorDescription = authorDescription;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getAuthorDescription() {
        return authorDescription;
    }

    public void setAuthorDescription(String authorDescription) {
        this.authorDescription = authorDescription;
    }
}
