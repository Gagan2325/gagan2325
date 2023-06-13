const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOWJjY2RmZjEzZDMxNjliOGZjNWU5MmQ2MmUyNzA1OSIsInN1YiI6IjY0ODRiMGU0OTkyNTljMDBlMmY0ZTY5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZZLU3RZtNGtFbQiu2t1rxmWQItBFO3HvqlY-yvyCd4E",
  },
};

const imageUrl = "https://image.tmdb.org/t/p/original";

function init(params) {
  FetchCategories();
}

function FetchCategories() {
  fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", options)
    .then((response) => response.json())
    .then((response) => {
      response.genres.map((element, index) => {
        FetchMovieFromCategories(element.name, element.id);
      });
    })
    .catch((err) => console.error(err));
}

function FetchMovieFromCategories(catName, catID) {
  var movieList = [];

  fetch(`https://api.themoviedb.org/3/list/${catID}?language=en-US`, options)
    .then((response) => response.json())
    .then((response) => {
      // console.log(response);
      movieList = response.items
        .map((element, item) => {
          return ` <img
        src="${imageUrl}${element.poster_path}"
        alt=""
        class="movies-item"
      />`;
        })
        .join("");
      if (response.items.length > 1) {
        const div = document.createElement("div");
        div.className = "movies-section";
        div.innerHTML = `<h2 class="movies-section-heading">${catName}<span class="explore-nudge">Explore</span>
        </h2>
        <div class="movies-row">
         ${movieList}
        </div>`;

        document.getElementById("movie-cont").append(div);
      }
    })
    .catch((err) => console.error(err));
}
window.addEventListener("load", () => {
  init();

  window.addEventListener("scroll", function () {
    const header = document.getElementById("header");
    if (window.scrollY > 5) {
      header.classList.add("black-bg");
    } else {
      header.classList.remove("black-bg");
    }
  });
});
