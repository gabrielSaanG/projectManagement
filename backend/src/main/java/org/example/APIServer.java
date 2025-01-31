package org.example;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.eclipse.jetty.util.security.Password;
import org.example.configs.CorsFilter;
import org.example.configs.MorphiaConfig;
import org.example.dtos.LoginDTO;
import org.example.functions.PasswordHash;
import org.glassfish.jersey.servlet.ServletContainer;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.query.Query;

import javax.servlet.DispatcherType;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.EnumSet;
import java.util.List;

public class APIServer {
    protected static Datastore datastore = new MorphiaConfig("banco-gerenciador").getDatastore();

    public static void main(String[] args) throws Exception {
        Server server = new Server(8231);

        ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
        context.setContextPath("/api");
        server.setHandler(context);

        ServletHolder jerseyServlet = context.addServlet(ServletContainer.class, "/*");
        jerseyServlet.setInitOrder(0);
        jerseyServlet.setInitParameter("jersey.config.server.provider.packages", "org.example");

        context.addFilter(CorsFilter.class, "/*", null);

//        createAdmin();
        server.start();
        server.join();

    }
    @SuppressWarnings("unused")

    public static void setDatastore(Datastore datastore) {
        APIServer.datastore = datastore;
    }

    @SuppressWarnings("unused")
    public static void testHash() throws NoSuchAlgorithmException, InvalidKeySpecException {
        byte[] salt = PasswordHash.generateSalt();
        String password = "admin";
        String hash = PasswordHash.hash(password, salt);
        System.out.println(hash);
        System.out.println(PasswordHash.checkPassword(password, salt, hash));
    }

    @SuppressWarnings("unused")
    public static void createAdmin() throws NoSuchAlgorithmException, InvalidKeySpecException {
        LoginDTO adminLogin = new LoginDTO();
        adminLogin.setEmail("admin@admin.com");
        adminLogin.setSalt(PasswordHash.generateSalt());
        adminLogin.setPassword(PasswordHash.hash("admin", adminLogin.getSalt()));
        datastore.save(adminLogin);
        searchInDatabase(datastore, adminLogin);
    }

    @SuppressWarnings("unused")
    public static void searchInDatabase(Datastore datastore, LoginDTO login){
        Query<LoginDTO> query = datastore.createQuery(LoginDTO.class);
        query.field("email").equal(login.getEmail());
        List<LoginDTO> results = query.asList();

        if(!results.isEmpty()){
            System.out.println("Encontrado: o valor existe no campo1 de um documento.");
            System.out.println(results.get(0).getPassword());
        } else {
            System.out.println("Não encontrado: o valor nao existe no campo1 de um documento.");
        }
    }
}
