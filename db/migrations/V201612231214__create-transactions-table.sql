CREATE TABLE IF NOT EXISTS transactions (
    id              SERIAL CONSTRAINT transactions_key PRIMARY KEY,
    account_id       integer NOT NULL REFERENCES accounts (id),
    description     varchar(500) NOT NULL,
    amount          decimal NOT NULL DEFAULT 0,
    processed_on     date NOT NULL DEFAULT CURRENT_DATE,
    created_at       timestamp NOT NULL DEFAULT now(),
    updated_at       timestamp NOT NULL DEFAULT now(),
    CONSTRAINT description_processedOn_unique UNIQUE(description, processed_on)
);