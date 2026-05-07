const movies = [
  {
    title: "Phim Yêu Thích 1",
    episode: "Tập 1",
    video: "https://drive.google.com/uc?export=download&id=FILE_ID_1",
    sub: "sub/phim1.srt",
    poster: "poster/phim1.jpg"
  },
  {
    title: "Phim Yêu Thích 2",
    episode: "Tập 2",
    video: "https://drive.google.com/uc?export=download&id=FILE_ID_2",
    sub: "sub/phim2.srt",
    poster: "poster/phim2.jpg"
  }
];

const grid = document.getElementById("movie-grid");
const playerSection = document.getElementById("player-section");
const movieTitle = document.getElementById("movie-title");
const backBtn = document.getElementById("back-btn");

// Render grid
function renderGrid(filter="") {
  grid.innerHTML = "";
  movies
    .filter(m => m.title.toLowerCase().includes(filter.toLowerCase()))
    .forEach((movie, index) => {
      const card = document.createElement("div");
      card.className = "movie-card";
      card.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}">
        <div class="movie-info">
          <h4>${movie.title}</h4>
          <p>${movie.episode}</p>
        </div>
      `;
      card.addEventListener("click", () => playMovie(index));
      grid.appendChild(card);
    });
}
renderGrid();

// Search
document.getElementById("search").addEventListener("input", e => {
  renderGrid(e.target.value);
});

// Play movie
function playMovie(index) {
  const movie = movies[index];
  grid.classList.add("hidden");
  playerSection.classList.remove("hidden");
  movieTitle.textContent = `${movie.title} - ${movie.episode}`;

  const player = videojs("movie-player");
  player.pause();
  player.src({ type: "video/mp4", src: movie.video });

  while(player.remoteTextTracks().length > 0) {
    player.removeRemoteTextTrack(player.remoteTextTracks()[0]);
  }

  player.addRemoteTextTrack({
    kind: "subtitles",
    src: movie.sub,
    srclang: "vi",
    label: "Tiếng Việt",
    default: true
  }, false);

  player.load();
  player.play();
}

// Back
backBtn.addEventListener("click", () => {
  playerSection.classList.add("hidden");
  grid.classList.remove("hidden");
  videojs("movie-player").pause();
});