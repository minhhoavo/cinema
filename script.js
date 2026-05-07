// Mini “database” phim
const movies = [
  {
    title: "Phim Yêu Thích 1",
    video: "video/phim1.mp4",
    sub: "sub/phim1.srt",
    poster: "poster/phim1.jpg",
    description: "Một bộ phim rất hay về hành động."
  },
  {
    title: "Phim Yêu Thích 2",
    video: "video/phim2.mp4",
    sub: "sub/phim2.srt",
    poster: "poster/phim2.jpg",
    description: "Một bộ phim hài thú vị."
  }
];

const carouselWrapper = document.querySelector(".swiper-wrapper");
const playerSection = document.getElementById("player-section");
const movieTitle = document.getElementById("movie-title");
const backBtn = document.getElementById("back-btn");

// Render carousel phim
movies.forEach((movie, index) => {
  const slide = document.createElement("div");
  slide.className = "swiper-slide";
  slide.innerHTML = `
    <img src="${movie.poster}" alt="${movie.title}">
    <div class="overlay">
      <h3>${movie.title}</h3>
      <p>${movie.description}</p>
    </div>
  `;
  slide.addEventListener("click", () => playMovie(index));
  carouselWrapper.appendChild(slide);
});

// Khởi tạo Swiper
const swiper = new Swiper(".swiper", {
  slidesPerView: 4,
  spaceBetween: 30,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// Play phim
function playMovie(index) {
  const movie = movies[index];
  document.querySelector("#movie-carousel").classList.add("hidden");
  playerSection.classList.remove("hidden");
  movieTitle.textContent = movie.title;

  const player = videojs("movie-player");
  player.pause();
  player.src({ type: "video/mp4", src: movie.video });

  // Remove previous tracks
  while(player.remoteTextTracks().length > 0) {
    player.removeRemoteTextTrack(player.remoteTextTracks()[0]);
  }

  // Load sub
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

// Quay lại carousel
backBtn.addEventListener("click", () => {
  playerSection.classList.add("hidden");
  document.querySelector("#movie-carousel").classList.remove("hidden");
  const player = videojs("movie-player");
  player.pause();
});