package com.movie.recommendation;

import org.springframework.data.jpa.repository.JpaRepository;

// Repository interface for Movie database operations
public interface MovieRepository extends JpaRepository<Movie, Long> {
}
