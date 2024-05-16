# Employee Application

## Introduction

This is a small project that enables creation and control of employee DB.

This project enables 5 endpoints to make CRUD operations on employee Table and return correct responses to the user.

Please review the different endpoints and test them via http (preffer way is using Postman).

---

### Install project dependencies
-   please make sure to insert  "type": "module", to package.json
-   please install sqlite3 : npm i sqlite3

    no need to install express package.

---

### Start Service
run 'node app.js' to start the service.

---

### How the service can be deployed
*   The service can be run localy using node app.js or by adding a docker container with node image, pass the files to the container and run it using docker CMD command.
*   because the DB is running in memory there is no way to make the service Scalable as of now, BUT if the DB was a shared DB (like RDS on AWS) than we could deploy a few containers of this service and it could work and be more Scalable.


## Out of Project Scope
-   there is no logging
-   there is no Auth or Security