document.getElementById("getRecBtn").addEventListener("click", async () => {
    const selectedGenre = document.getElementById("genreSelect").value;

    let url = "http://localhost:8080/api/movies";

    if (selectedGenre !== "") {
        url += `?genre=${encodeURIComponent(selectedGenre)}`;
    }

    try {
        const response = await fetch(url);
        const recs = await response.json();

        displayRecommendationCards(recs);
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
});

function displayRecommendationCards(list) {
    const grid = document.getElementById("recommendationGrid");

    grid.innerHTML = "";

    if (list.length === 0) {
        grid.innerHTML = `
            <div class="col-12">
                <p class="text-center text-secondary">
                    No movies found for the selected genre.
                </p>
            </div>
        `;
        return;
    }

    list.forEach(movie => {
        const col = document.createElement("div");

        col.className = "col";

        col.innerHTML = `
            <div class="card h-100"
                 onclick="window.location.href='details.html?id=${movie.id}'"
                 style="cursor: pointer;">

                <div class="card-img-top"
                     style="
                     height: 300px;
                     background-image: url('${movie.posterUrl}');
                     background-size: cover;
                     background-position: center;">
                </div>

                <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>

                    <p class="card-text">
                        ${movie.genre} • ${movie.year}
                    </p>
                </div>

            </div>
        `;

        grid.appendChild(col);
    });
}