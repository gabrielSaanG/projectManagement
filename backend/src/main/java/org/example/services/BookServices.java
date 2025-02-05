package org.example.services;

import org.example.APIServer;
import org.example.dtos.BookDTO;
import org.mongodb.morphia.query.Query;

import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.Random;

@Path("/book")
public class BookServices extends APIServer {

    @GET
    @Path("/get_all")
    @Consumes("application/json; charset=UTF-8")
    @Produces("application/json; charset=UTF-8")
    public Response getAllBooks() {
        try{
            Query<BookDTO> query = datastore.createQuery(BookDTO.class);
            List<BookDTO> books = query.asList();
            if (books == null || books.isEmpty()) {
                return Response.status(404).build();
            }
            return Response.ok().entity(books).build();
        } catch (Exception e) {
            return Response.status(500).build();
        }
    }

    @POST
    @Path("/get")
    @Produces("application/json; charset=UTF-8")
    public Response getBook(BookDTO book) {
        try{
            Query<BookDTO> query = datastore.createQuery(BookDTO.class).field("token").equal(book.getToken());
            List<BookDTO> books = query.asList();
            if (books == null || books.isEmpty()) {
                System.out.println("teste");
                return Response.status(404).build();
            }
            return Response.ok().entity(books).build();
        } catch (Exception e) {
            return Response.status(500).build();
        }
    }

    @POST
    @Path("/post")
    public Response postBook(BookDTO book) {
        if (book.getToken() ==  0){
            Random rand = new Random();
            book.setToken(rand.nextInt() * 10);
        }

        try{
            datastore.save(book);
            return Response.ok().build();
        } catch (Exception e) {
            return Response.status(500).build();
        }
    }
}
