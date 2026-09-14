package com.movie.recommendation;

import org.springframework.web.bind.annotation.*;

import java.util.List;

// Controller class that exposes REST APIs for movies
@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = {
    "http://localhost:5500",
    "http://127.0.0.1:5500"
})
public class MovieController {

    private final MovieService movieService;

    // Constructor injection for MovieService
    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    // GET /api/movies
    // Returns all movies or movies filtered by genre
    @GetMapping
    public List<Movie> getMovies(
            @RequestParam(required = false) String genre) {

        if (genre != null && !genre.isBlank()) {
            return movieService.getMoviesByGenre(genre);
        }

        return movieService.getAllMovies();
    }

    // GET /api/movies/search?title=xyz
    // Searches movies by title
    @GetMapping("/search")
    public List<Movie> searchMovies(@RequestParam String title) {
        return movieService.searchByTitle(title);
    }

    // GET /api/movies/{id}/similar
    // Returns movies similar to the selected movie
    @GetMapping("/{id}/similar")
    public List<Movie> getSimilarMovies(@PathVariable Long id) {
        return movieService.getSimilarMovies(id);
    }
}
