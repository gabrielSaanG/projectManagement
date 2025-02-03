package org.example.services;

import javafx.scene.canvas.GraphicsContext;
import org.example.APIServer;
import org.example.dtos.QuoteDTO;
import org.example.dtos.TokenDTO;
import org.mongodb.morphia.query.Query;

import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.util.List;


@Path("/quote")
public class QuoteServices extends APIServer {

    @GET
    @Path("/get")
    @Consumes("application/json; charset=UTF-8")
    @Produces("application/json; charset=UTF-8")
    public Response getQuote() {
        Query<QuoteDTO> query = datastore.createQuery(QuoteDTO.class).field("author").equal("Marcus Tullius Cicero");
        List<QuoteDTO> quotes = query.asList();
        if (quotes == null) {
            return Response.status(404).build();
        }
        QuoteDTO firstQuote = quotes.get(0);
        return Response.ok(quotes).entity(firstQuote).build();
    }


    @POST
    @Path("/post")
    @Consumes("application/json; charset=UTF-8")
    @Produces("application/json; charset=UTF-8")
    public Response postQuote(final QuoteDTO quote) {
        if (quote == null) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
        try {
            datastore.save(quote);
            return Response.ok().build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }
}
