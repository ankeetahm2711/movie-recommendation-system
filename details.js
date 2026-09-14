const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

async function loadMovie() {
    try {
        const response = await fetch(
            `http://localhost:8080/api/movies/${movieId}/similar`
        );

        const similarMovies = await response.json();

        const allResponse = await fetch(
            "http://localhost:8080/api/movies"
        );

        const movies = await allResponse.json();

        const movie = movies.find(m => m.id == movieId);

        if (!movie) {
            return;
        }

        document.getElementById("movieDetails").innerHTML = `
            <div class="row align-items-center">

                <div class="col-md-4">
                    <img src="${movie.posterUrl}"
                         class="img-fluid rounded"
                         alt="${movie.title}">
                </div>

                <div class="col-md-8">
                    <h1 class="mb-3">${movie.title}</h1>

                    <p class="text-secondary">
                        ${movie.genre} • ${movie.year}
                    </p>

                    <p class="lead">
                        ${movie.description}
                    </p>
                </div>

            </div>
        `;

        displaySimilarMovies(similarMovies);

    } catch (error) {
        console.error("Error loading movie:", error);
    }
}

function displaySimilarMovies(movies) {
    const grid = document.getElementById("similarMovies");

    grid.innerHTML = "";

    movies.slice(0, 4).forEach(movie => {

        grid.innerHTML += `
            <div class="col">
                <div class="card h-100"
                     onclick="window.location.href='details.html?id=${movie.id}'"
                     style="cursor:pointer">

                    <div class="card-img-top"
                         style="
                         height:280px;
                         background-image:url('${movie.posterUrl}');
                         background-size:cover;
                         background-position:center;">
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

loadMovie();