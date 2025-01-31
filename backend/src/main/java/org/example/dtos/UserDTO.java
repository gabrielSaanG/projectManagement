package org.example.dtos;

import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;


@Entity("userData")
public class UserDTO {
    @SuppressWarnings("unused")
    @Id
    private String id;
    private String name;
    private String email;
    private String password;
    private byte[] salt;

    @SuppressWarnings("unused")
    public UserDTO() {
    }

    @SuppressWarnings("unused")
    public UserDTO(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public byte[] getSalt() {
        return salt;
    }

    public void setSalt(byte[] salt) {
        this.salt = salt;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

