CREATE TABLE IF NOT EXISTS transactions (
    id              SERIAL CONSTRAINT transactions_key PRIMARY KEY,
    accountId       integer NOT NULL REFERENCES accounts (id),
    description     varchar(500) NOT NULL,
    amount          decimal NOT NULL DEFAULT 0,
    processedOn     date NOT NULL DEFAULT CURRENT_DATE,
    createdAt       timestamp NOT NULL DEFAULT now(),
    updatedAt       timestamp NOT NULL DEFAULT now(),
    CONSTRAINT description_processedOn_unique UNIQUE(description, processedOn)
);