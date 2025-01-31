package org.example.configs;

import com.mongodb.MongoClient;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;

public class MorphiaConfig {
    final Datastore datastore;

    public MorphiaConfig(String databaseName) {
        MongoClient mongo = new MongoClient("localhost", 27017);
        Morphia morphia = new Morphia();
        morphia.mapPackage("org.example");
        datastore = morphia.createDatastore(mongo, databaseName);
        datastore.ensureIndexes();
    }

    public Datastore getDatastore() {
        return datastore;
    }
}
