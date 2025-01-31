package org.example.services;

import org.example.APIServer;
import org.example.configs.TokenGenerator;
import org.example.dtos.LoginDTO;
import org.example.dtos.TokenDTO;
import org.example.dtos.UserDTO;
import org.example.functions.PasswordHash;
import org.mongodb.morphia.query.Query;

import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.Date;

@Path("/auth")
public class AuthServices  extends APIServer {

    TokenGenerator keyGenerator = new TokenGenerator();

    @GET
    @Path("/current")
    @Produces("application/json; charset=UTF-8")
    public Response getCurrentUser(@HeaderParam("Authorization") String token){

        try{
            Query<TokenDTO> query = datastore.createQuery(TokenDTO.class).field("token").equal(token);
            TokenDTO tokenInfos = query.get();
            if (tokenInfos == null){
                return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token").build();
            }
            if (tokenInfos.getExpirationDate().compareTo(new Date()) < 0){
                return Response.status(Response.Status.UNAUTHORIZED).entity("Token expired").build();
            }
            Query<LoginDTO> queryUser = datastore.createQuery(LoginDTO.class).field("email").equal(tokenInfos.getEmail());
            LoginDTO loginInfos = queryUser.get();

            if (loginInfos == null){
                return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid user").build();
            }
            return Response.ok(loginInfos).build();
        } catch (Exception e){
            return Response.status(Response.Status.UNAUTHORIZED).entity("Exception found").build();
        }

    }

    @POST
    @Path("/login")
    @Consumes("application/json; charset=UTF-8")
    @Produces("application/json; charset=UTF-8")
    public Response login(final LoginDTO userTryDTO){
        if (userTryDTO.getEmail() == null || userTryDTO.getPassword() == null){
            return Response.status(Response.Status.UNAUTHORIZED).entity("Please enter your login details!").build();
        }
        try{
            Query<LoginDTO> query = datastore.createQuery(LoginDTO.class).field("email").equal(userTryDTO.getEmail());
            LoginDTO user = query.get();
            if (user == null){
                return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid user").build();
            }
            if (PasswordHash.checkPassword(userTryDTO.getPassword(), user.getSalt(), user.getPassword())){
                TokenDTO token = keyGenerator.generatorToken(userTryDTO.getEmail());
                System.out.println(token.getToken());
                return Response.ok(token).build();
            } else {
                return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid login").build();
            }
        } catch (Exception e) {
            return Response.status(Response.Status.NOT_IMPLEMENTED).entity("Exception found").build();
        }
    }

    @POST
    @Path("token-verify")
    @Consumes("application/json; charset=UTF-8")
    @Produces("application/json; charset=UTF-8")
    public Response tokenVerify(@HeaderParam("Authorization") String token){
        Date currentTime = new Date();
        Query<TokenDTO> query = datastore.createQuery(TokenDTO.class).field("token").equal(token);
        TokenDTO tokenInfos = query.get();
        if (tokenInfos == null){
            return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token").build();
        }
        if (currentTime.before(tokenInfos.getExpirationDate())){
            return Response.status(Response.Status.OK).entity("Token valid").build();
        }
        else{
            return Response.status(Response.Status.UNAUTHORIZED).entity("Token expired").build();
        }
    }

    @POST
    @Path("/register")
    @Consumes("application/json; charset=UTF-8")
    @Produces("application/json; charset=UTF-8")
    public Response register(UserDTO userTryDTO){
        try{
            userTryDTO.setSalt(PasswordHash.generateSalt());
            userTryDTO.setPassword(PasswordHash.hash(userTryDTO.getPassword(), userTryDTO.getSalt()));
            datastore.save(userTryDTO);
            return Response.status(Response.Status.CREATED).entity("User registered").build();
        } catch (Exception e){
            return Response.status(Response.Status.BAD_REQUEST).entity("Register error").build();
        }
    }
}
