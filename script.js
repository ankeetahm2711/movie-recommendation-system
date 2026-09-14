// Dataset: you will add your posterUrl later
const movies = [
  { title: "Die Hard", genre: "Action", year: 1988, posterUrl: "dieHard.jpg" },
  { title: "Mad Max: Fury Road", genre: "Action", year: 2015, posterUrl: "madMax.jpg" },
  { title: "Superbad", genre: "Comedy", year: 2007, posterUrl: "Superbad.jpg" },
  { title: "The Hangover", genre: "Comedy", year: 2009, posterUrl: "The Hangover.jpg" },
  { title: "The Shawshank Redemption", genre: "Drama", year: 1994, posterUrl: "The Shawshank Redemption.jpg" },
  { title: "Forrest Gump", genre: "Drama", year: 1994, posterUrl: "Forrest Gump.jpg" },
  { title: "Get Out", genre: "Horror", year: 2017, posterUrl: "Get Out.jpg" },
  { title: "A Quiet Place", genre: "Horror", year: 2018, posterUrl: "A Quiet Place.jpg" },
  { title: "The Notebook", genre: "Romance", year: 2004, posterUrl: "The Notebook.jpg" },
  { title: "Titanic", genre: "Romance", year: 1997, posterUrl: "Titanic.jpg" }
];

document.getElementById("getRecBtn").addEventListener("click", () => {
  const selectedGenre = document.getElementById("genreSelect").value;
  const recs = movies.filter(m => {
    return selectedGenre === "" || m.genre === selectedGenre;
  });
  displayRecommendationCards(recs);
});

function displayRecommendationCards(list) {
  const grid = document.getElementById("recommendationGrid");
  grid.innerHTML = ""; // clear previous

  if (list.length === 0) {
    grid.innerHTML = `
      <div class="col-12">
        <p class="text-center text-secondary">No movies found for the selected genre.</p>
      </div>`;
    return;
  }

  list.forEach(m => {
    const col = document.createElement("div");
    col.className = "col";

    col.innerHTML = `
      <div class="card h-100">
        <div class="card-img-top" style="background-image: url('${m.posterUrl}');"></div>
        <div class="card-body">
          <h5 class="card-title">${m.title}</h5>
          <p class="card-text">Genre: ${m.genre} • Year: ${m.year}</p>
        </div>
      </div>
    `;

    grid.appendChild(col);
  });
}
