package com.movie.recommendation;

import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

// Service class containing movie-related business logic
@Service
public class MovieService {

    private final MovieRepository movieRepository;

    // Constructor injection for MovieRepository
    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    // Returns all movies from the database
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    // Returns movies belonging to the given genre
    public List<Movie> getMoviesByGenre(String genre) {
        return movieRepository.findAll()
                .stream()
                .filter(movie -> movie.getGenre().equalsIgnoreCase(genre))
                .collect(Collectors.toList());
    }

    // Searches movies by title
    public List<Movie> searchByTitle(String title) {
        return movieRepository.findAll()
                .stream()
                .filter(movie -> movie.getTitle()
                        .toLowerCase()
                        .contains(title.toLowerCase()))
                .collect(Collectors.toList());
    }

    // Finds movies similar to the selected movie
    // Similarity is based on genre and overlapping keywords
    public List<Movie> getSimilarMovies(Long movieId) {

        Movie selectedMovie = movieRepository.findById(movieId)
                .orElseThrow(() -> new RuntimeException("Movie not found"));

        List<String> selectedKeywords = getKeywords(selectedMovie.getKeywords());

        return movieRepository.findAll()
                .stream()
                .filter(movie -> !movie.getId().equals(movieId))
                .map(movie -> {
                    int score = 0;

                    // Add points when genres match
                    if (movie.getGenre().equalsIgnoreCase(selectedMovie.getGenre())) {
                        score += 2;
                    }

                    // Add one point for every matching keyword
                    List<String> movieKeywords = getKeywords(movie.getKeywords());

                    for (String keyword : movieKeywords) {
                        if (selectedKeywords.contains(keyword)) {
                            score++;
                        }
                    }

                    return new MovieScore(movie, score);
                })
                .filter(item -> item.score > 0)
                .sorted((a, b) -> Integer.compare(b.score, a.score))
                .map(item -> item.movie)
                .collect(Collectors.toList());
    }

    // Converts comma-separated keywords into a list
    private List<String> getKeywords(String keywords) {
        if (keywords == null || keywords.isBlank()) {
            return List.of();
        }

        return Arrays.stream(keywords.toLowerCase().split(","))
                .map(String::trim)
                .collect(Collectors.toList());
    }

    // Small helper class used to store movie and similarity score
    private static class MovieScore {
        Movie movie;
        int score;

        MovieScore(Movie movie, int score) {
            this.movie = movie;
            this.score = score;
        }
    }
}
