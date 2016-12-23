
CREATE TABLE IF NOT EXISTS accounts (
    id          SERIAL CONSTRAINT accounts_key PRIMARY KEY,
    name        varchar(255) NOT NULL,
    is_credit    boolean NOT NULL DEFAULT FALSE,
    created_at   timestamp NOT NULL DEFAULT now(),
    updated_at   timestamp NOT NULL DEFAULT now(),
    CONSTRAINT name_unique UNIQUE(name)
);

