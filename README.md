
## Introduction

![[TaskManagementSystem.png]]

This is a Task Management CRUD application

Technologies I used for this project are:
- React
- TypeScript
- Tailwind CSS
- Java Spring Boot
- PostgreSQL

React JS + Java Spring Boot are the programming languages of choice.

This project shows my understanding of using industry standard technologies inside of a simple CRUD application.


## Setup:

- Setup the 2 PostgreSQL Tables like so

Users table:
````
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
````

Tasks table:
```
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    time TIMESTAMP NOT NULL,
    comment VARCHAR(255),
    user_id BIGINT NOT NULL
);
`````


- Run the Java Spring boot backend application
- run `npm i && npm start` for the client side to start the app