CREATE TABLE accounts (
    id          integer CONSTRAINT firstkey PRIMARY KEY,
    name        varchar(255),
    CONSTRAINT name_unique UNIQUE(name)
);

