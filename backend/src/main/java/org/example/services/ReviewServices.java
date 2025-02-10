package org.example.services;

import org.example.APIServer;
import org.example.dtos.ReviewDTO;
import org.mongodb.morphia.query.Query;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/review")
public class ReviewServices extends APIServer {

    @Path("/get_all")
    @POST
    @Produces("application/json")
    @Consumes("application/json")
    public Response getReview(ReviewDTO reviewDTO) {
        try{
            Query<ReviewDTO> query = datastore.createQuery(ReviewDTO.class).field("bookToken").equal(reviewDTO.getBookToken());
            List<ReviewDTO> reviews = query.asList();

            if (reviews.isEmpty()) {
                return Response.status(404).build();
            }

            return Response.ok(reviews).build();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Response.status(500).build();
    }

    @Path("/post")
    @POST
    public Response postReview(ReviewDTO reviewDTO) {
        if (reviewDTO == null) {
            return Response.status(400).build();
        }
        try{
            datastore.save(reviewDTO);
            return Response.status(200).build();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Response.status(500).build();
    }
}
