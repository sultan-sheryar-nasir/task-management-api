# Trash Collection Task API

This is the documentation for the Trash Collection Task API, developed to facilitate the management of trash collection tasks in inner-city streets using an innovative approach.

## Description

The Trash Collection Task API is a RESTful API built with NestJS, PostgreSQL. It allows users to perform various tasks related to trash collection, including creating tasks, marking tasks as completed, and retrieving tasks near a specific location.

## Features

- **Task Management**: Create, update, delete, and retrieve tasks for trash collection.
- **Geospatial Queries**: Utilize the PostGIS extension for PostgreSQL to perform geospatial queries and retrieve tasks near a specific location.
- **Authentication**: Secure endpoints with JWT-based authentication to ensure data privacy and integrity.
- **Swagger Documentation**: Generate API documentation using Swagger for easy reference and testing of endpoints.

## Prerequistes
1. Ensure that you have Node.js installed on your machine. Recommended v21.6.2
2. Download PostgreSQL 16: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads connection details can be found in **database.config.ts** inside src/config
3. Download postgis extention for Geospatial Queries: https://www.postgresql.org/ftp/postgis/pg16/v3.4.0/win64/. After the installation is complete run **CREATE EXTENSION postgis** in your SQL editor


## Installation

1. Clone the repository: `git clone https://github.com/sultan-sheryar-nasir/LiveEO-assessment.git`
2. Navigate to the project directory: **cd LiveEO=assessment**
3. Install dependencies: `npm install`
4. Run the application: `npm run start:dev`


### Postman Collection

You can simply import the collection file src/utils/LiveEO.postman_collection.json in your postman

### Swagger Documentation

Once the application is running, navigate to `/api` to access the Swagger documentation. Here, you can explore all available endpoints, their parameters. Due to limited time swagger documentation is not so rich so I recommend considering Postman Collection which have all the endpoints with sample requests.

### API Endpoints

- **GET /tasks**: Retrieve all tasks. Also you can filter by isCompleted query param.
- **GET /tasks:id**: Retrieve tasks by ID.
- **POST /tasks**: Create a new task.
- **PUT /tasks/:id**: Update an existing task or mark it as completed.
- **DELETE /tasks/:id**: Delete a task.
- **GET /tasks/nearby**: Retrieve tasks near a specific location.

- **POST /auth/register**: Register new user.
- **POST /auth/login**: Get JWT Token.

### Other Documents

 - Under the root of project you will find a documents folder, Inside this folder We have LiveEO Assessment Diagram and Stages document.