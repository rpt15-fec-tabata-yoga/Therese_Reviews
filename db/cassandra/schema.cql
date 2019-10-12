DROP KEYSPACE IF EXISTS reviews_db;

CREATE KEYSPACE reviews_db WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : 3};

