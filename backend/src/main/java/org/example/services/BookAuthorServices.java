package org.example.services;

import org.example.APIServer;
import org.example.dtos.AuthorDTO;
import org.mongodb.morphia.query.Query;

import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/author")
public class BookAuthorServices extends APIServer {

    @POST
    @Path("/post")
    @Produces("application/json; charset=UTF-8")
    public Response postAuthor(AuthorDTO authorDTO) {
        if (authorDTO == null) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        } else if (authorDTO.getAuthorDescription().isEmpty()|| authorDTO.getFirstName().isEmpty() || authorDTO.getLastName().isEmpty()) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
        try{
            datastore.save(authorDTO);
            return Response.status(Response.Status.OK).build();
        } catch (Exception e){
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GET
    @Path("/get")
    @Consumes("application/json; charset=UTF-8")
    @Produces("application/json; charset=UTF-8")
    public Response getAuthor(AuthorDTO authorDTO){
        try{
            Query<AuthorDTO> query = datastore.createQuery(AuthorDTO.class).field("firstName").equal(authorDTO.getFirstName()).field("lastName").equal(authorDTO.getLastName());
            List<AuthorDTO> authors = query.asList();
            if (authors.isEmpty()){
                return Response.status(Response.Status.NOT_FOUND).build();
            }
            return Response.status(Response.Status.OK).entity(authors.get(0)).build();
        } catch (Exception e){
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }
}
