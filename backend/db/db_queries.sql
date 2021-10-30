-- PATIENT QUERIES
CREATE TABLE patient (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    dob DATE NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO patient (first_name, last_name, dob, email, password)
VALUES ('Anagh', 'Mehran', '1997-04-07', 'anagh07@gmail.com', 'p123456'),
('Jon', 'Doe', '1990-01-01', 'jdoe@gmail.com', '12345678');

DELETE * FROM patient;

SELECT * FROM patient;