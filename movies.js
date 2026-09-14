const movieGrid = document.getElementById("movieGrid");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

async function loadMovies() {
    try {
        const response = await fetch("http://localhost:8080/api/movies");
        const movies = await response.json();

        displayMovies(movies);
    } catch (error) {
        console.error("Error loading movies:", error);
    }
}

async function searchMovies() {
    const title = searchInput.value.trim();

    if (title === "") {
        loadMovies();
        return;
    }

    try {
        const response = await fetch(
            `http://localhost:8080/api/movies/search?title=${encodeURIComponent(title)}`
        );

        const movies = await response.json();
        displayMovies(movies);
    } catch (error) {
        console.error("Error searching movies:", error);
    }
}

function displayMovies(movies) {
    movieGrid.innerHTML = "";

    movies.forEach(movie => {
        movieGrid.innerHTML += `
            <div class="col">
                <div class="card h-100">
                    <div class="card-img-top"
                         style="height: 300px; background-image: url('${movie.posterUrl}');
                         background-size: cover; background-position: center;">
                    </div>

                    <div class="card-body">
                        <h5 class="card-title">${movie.title}</h5>
                        <p class="card-text">
                            ${movie.genre} • ${movie.year}
                        </p>
                    </div>
                </div>
            </div>
        `;
    });
}

searchBtn.addEventListener("click", searchMovies);

loadMovies();
