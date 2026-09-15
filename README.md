Movie Recommendation System

A simple full-stack web application that helps users discover movies and get similar movie recommendations.

Features
Browse movies
Search movies by title
Filter movies by genre
View movie details
Get similar movie recommendations
Responsive and user-friendly interface
Technologies Used
Frontend
HTML
CSS
JavaScript
Bootstrap
Backend
Java
Spring Boot
Spring Data JPA
Hibernate
REST APIs
Database
MySQL
Recommendation Approach

The system uses a basic content-based recommendation approach. Movies are compared using their genre and keywords. A matching genre gives a higher similarity score, while common keywords add additional score. Movies with higher scores are shown as similar recommendations.

How to Run
## 1. Clone the Repository

git clone https://github.com/ankeetahm2711/movie-recommendation-system.git

cd movie-recommendation-system

## 2. Configure MySQL

Create a database named:

CREATE DATABASE movie_recommendation;

Create backend/src/main/resources/application.properties locally and add your own MySQL username and password.

Do not commit database credentials to GitHub.

## 3. Run the Backend

cd backend

mvn spring-boot:run

Backend API:

http://localhost:8080/api/movies

## 4. Run the Frontend

Open the project using VS Code Live Server.

Example:

http://localhost:5500/index.html

API Endpoints
Method	Endpoint	Description
GET	/api/movies	Get all movies
GET	/api/movies?genre=Action	Get movies by genre
GET	/api/movies/search?title=movie	Search movies by title
GET	/api/movies/{id}/similar	Get similar movies
Future Enhancements
User authentication
User ratings and reviews
Watch history and watchlists
Personalized recommendations
Machine learning-based recommendations
Collaborative filtering
External movie APIs
Project Source Code

GitHub: https://github.com/ankeetahm2711/movie-recommendation-system
