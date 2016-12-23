
CREATE TABLE IF NOT EXISTS accounts (
    id          SERIAL CONSTRAINT accounts_key PRIMARY KEY,
    name        varchar(255) NOT NULL,
    isCredit    boolean NOT NULL DEFAULT FALSE,
    createdAt   timestamp NOT NULL DEFAULT now(),
    updatedAt   timestamp NOT NULL DEFAULT now(),
    CONSTRAINT name_unique UNIQUE(name)
);

