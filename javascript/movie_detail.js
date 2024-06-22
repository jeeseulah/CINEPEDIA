//네비게이션 ///////////////////////////////////////////////
// 네비게이션바 스크롤 효과 추가
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    nav.classList.add("bg-violat-transparent");
  } else {
    nav.classList.remove("bg-violat-transparent");
  }
});

//TMDB API //////////////////////////////////////////////
const defaultUrl = "https://api.themoviedb.org/3/";
const defaultImgUrl = "https://image.tmdb.org/t/p/original";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5OTRjNTUwZTI0ZmE1Yzc3NmRkM2JmZDUwNTcyMyIsInN1YiI6IjY2NTc0NGUwOTVhYjA3ZDliNzIxNWExOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.isQ0rGaXduotQL3G6lwHtZH4dnka2FvcmnlOCczyexw",
  },
};

// 무비디테일 페이지  ///////////////////////////////////////////////////
const initMovieDetailPage = async () => {
  try {
    const urlParams = new URL(location.href).searchParams;
    const movieId = urlParams.get("movieId");

    // 무비 디테일
    await getMovieDetail(movieId);
    await getMovieVideos(movieId);
    await getMovieCredits(movieId);
    await getMovieRecommendations(movieId);

    // Swiper
    initSwipers();
  } catch (error) {
    console.error("영화 상세 페이지 에러 :", error);
  }
};

// 무비 detail
const getMovieDetail = async (movie_id) => {
  const movieDetailUrl = `${defaultUrl}movie/${movie_id}?language=ko-KR`;
  const response = await fetch(movieDetailUrl, options);
  const movieData = await response.json();

  updateMovieDetail(movieData);
};

// 무비 video
const getMovieVideos = async (movie_id) => {
  const movieVideosUrl = `${defaultUrl}movie/${movie_id}/videos?language=ko-KR`;
  const response = await fetch(movieVideosUrl, options);
  const movieData = await response.json();

  updateMovieVideo(movieData);
};

// 출연자
const getMovieCredits = async (movie_id) => {
  const movieCreditsUrl = `${defaultUrl}movie/${movie_id}/credits?language=ko-KR`;
  const response = await fetch(movieCreditsUrl, options);
  const movieData = await response.json();

  updateMovieCredits(movieData);
};

// 추천 영화
const getMovieRecommendations = async (movie_id) => {
  const movieRecommendationsUrl = `${defaultUrl}movie/${movie_id}/recommendations?language=ko-KR`;
  const response = await fetch(movieRecommendationsUrl, options);
  const movieData = await response.json();

  updateMovieRecommendations(movieData);
};

// 영화 디테일 HTML
const updateMovieDetail = (movieData) => {
  console.log("영화정보 ", movieData);
  const videoBannerImg = document.querySelector("#video-banner .image-box");
  const movieScope = document.querySelector("#movieScope");
  const movieTitle = document.querySelector("#movieTitle");
  const movieInfo = document.querySelector("#movieInfo");
  const movieIntro = document.querySelector("#movieIntro");
  const movieShareBtn = document.querySelector("#movieShare");
  const videoDetailImg = document.querySelector(
    "#video-banner .video-detail-img"
  );

  // 출시일 년도만
  const release_date = movieData.release_date.split("-");
  // 평점 별표시 (10점만점을 별5개로 표현)
  console.log("별점 : ", movieData.vote_average);
  const vote_average = movieData.vote_average / 2.0;
  const vote_average_remain = vote_average - Math.floor(vote_average);
  let vote_average_innerHtml = "";
  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(vote_average))
      vote_average_innerHtml +=
        '<i class="bi bi-star-fill text-warning fs-2"></i>';
    else if (i === Math.floor(vote_average)) {
      if (vote_average_remain >= 0.5) {
        vote_average_innerHtml +=
          '<i class="bi bi-star-half text-warning fs-2"></i>';
      } else {
        vote_average_innerHtml +=
          '<i class="bi bi-star text-warning fs-2"></i>';
      }
    } else {
      vote_average_innerHtml += '<i class="bi bi-star text-warning fs-2"></i>';
    }
  }
  //장르표시
  let videoGenres_innerHtml = "";
  for (let i = 0; i < movieData.genres.length; i++) {
    videoGenres_innerHtml +=
      '<span class="border border-secondary px-1 m-1 rounded">' +
      movieData.genres[i].name +
      "</span>";
  }
  //영화배너
  if (videoBannerImg != null) {
    videoBannerImg.innerHTML = `<img src="${defaultImgUrl}${movieData.backdrop_path}" class="w-100" alt="배너이미지" />
          <div class="slide-img"></div>`;
  }
  //공유하기
  if (movieShareBtn != null) {
    movieShareBtn.addEventListener("click", function () {
      window.navigator.share({
        title: `${movieData.title}`, // 공유될 제목
        text: `${movieData.overview}`, // 공유될 설명
        url: window.location.href, // 공유될 URL
      });
    });
  }
  //별점
  if (movieScope != null) {
    movieScope.innerHTML = `${vote_average_innerHtml}`;
  }
  //영화제목
  if (movieTitle != null) {
    movieTitle.innerHTML = `${movieData.title}<span class="display-6 fw-bold">(${release_date[0]})</span>`;
  }
  //영화정보
  if (movieInfo != null) {
    movieInfo.innerHTML = `${videoGenres_innerHtml}<span class="border border-secondary px-1 m-1 rounded">${movieData.runtime}분</span>`;
  }
  //영화소개
  if (movieIntro != null) {
    movieIntro.innerHTML = `<p>개봉일 : ${movieData.release_date}</p>
      <h4 class="pb-3"><i>"${movieData.tagline}"</i></h4><p>${movieData.overview}</p>`;
  }
  if (videoDetailImg != null) {
    videoDetailImg.innerHTML = `<img src="${defaultImgUrl}${movieData.poster_path}"
              class="img-fluid rounded h-100 object-fit-cover" alt="영화 상세 이미지"/>`;
  }
};

// 영화 비디오 HTML
const updateMovieVideo = (movieData) => {
  console.log("트레일러", movieData);
  const moviePlay = document.querySelector("#movieVideo");
  if (movieData.results.length > 0) {
    const videoURL = `https://www.youtube.com/embed/${movieData.results[0].key}`;
    //트레일러 영상
    moviePlay.innerHTML = `
            <div class="ratio ratio-16x9 mb-4">
                <iframe
                    src="${videoURL}"
                    title="Youtube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen>
                </iframe>
            </div>
            `;
  } else {
    moviePlay.innerHTML = `<h1 class="text-center"><i class="bi bi-exclamation-circle "></i></h1><h5 class="text-center mt-3 mb-5">영상이 아직 등록되지 않았습니다</h5>`;
  }
};

// 출연자 HTML
const updateMovieCredits = (movieData) => {
  console.log("출연자", movieData);
  const actorSwiper = document.querySelector("#actor .swiper-wrapper");
  const moreList = document.querySelector("#actor .moreList");
  const actorsBrief = movieData.cast.slice(0, 10);
  moreList.innerHTML = `
        <h2 class="fs-2 fw-bold m-0">감독/출연</h2>
        <a href="./actor_list.html?movieId=${movieData.id}" class="ms-auto mt-2 text-white-50 texthover">더보기 ></a>`;
  if (actorsBrief.length > 0) {
    actorsBrief.forEach((actor) => {
      const profileImg = actor.profile_path
        ? `${defaultImgUrl}${actor.profile_path}`
        : "./images/blank-profile.png";
      actorSwiper.innerHTML += `
            <div class="swiper-slide">
                <a href="#">
                    <div class="card bg-black text-white-50">
                        <div class="overflow-hidden rounded">
                            <img src="${profileImg}"
                              class="img-fluid h-100 object-fit-cover"
                              alt="배우이미지"
                            />
                        </div>
                        <div class="text-light text-center pt-2">${actor.name}</div>
                        <small class="text-center pt-1 pb-3">${actor.character}</small>
                    </div>
                </a>
            </div>
            `;
    });
  }
};

// 추천 영화 HTML
const updateMovieRecommendations = (movieData) => {
  console.log("추천영화", movieData);
  const recommendSwiper = document.querySelector(
    "#recommendList .swiper-wrapper"
  );
  const moreList = document.querySelector("#recommendList .moreList");
  const recommendBrief = movieData.results;
  moreList.innerHTML = `<h2 class="fs-2 fw-bold m-0">추천영화</h2>`;
  if (recommendBrief.length > 0) {
    recommendBrief.forEach((movie) => {
      const movieImg = movie.poster_path
        ? `${defaultImgUrl}${movie.poster_path}`
        : "./images/blank-movie.png";
      recommendSwiper.innerHTML += `
            <div class="swiper-slide">
                <a href="./movie_detail.html?movieId=${movie.id}">
                    <div class="card bg-black">
                        <img src="${movieImg}" class="img-fluid rounded h-100 object-fit-cover" alt="영화이미지"/>
                        <div class="card-img-overlay text-light">
                            <small class="card-text"><i class="bi bi-star-fill text-warning me-2"></i>${movie.vote_average}</small>
                            <small class="card-text">${movie.overview}</small>
                        </div>
                        <div class="text-light text-center pt-2 pb-4">${movie.title}</div>
                    </div>
                </a>
            </div>`;
    });
  }
};

// Swiper
const initSwipers = () => {
  new Swiper("#actor .swiper-container, #recommendList .swiper-container", {
    slidesPerView: 3, // 한 슬라이드에 보여줄 갯수 "auto"
    spaceBetween: 15, // 슬라이드간 간격
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true,
    },
    breakpoints: {
      768: { slidesPerView: 4 },
      992: { slidesPerView: 6 },
    },
  });
};

//무비디테일페이지 ///////////////////////////////////////////////
//위로 올라가는 버튼 숨기기
window.addEventListener("scroll", function () {
  const topBtn = document.getElementById("topBtn");
  const movieTabPst = document.getElementById("tab").offsetTop; // #tab요소의 위치 저장
  // mouse scroll시
  if (this.window.scrollY > movieTabPst) {
    // scroll height값이 tab요소보다 크면 class추가
    topBtn.classList.add("topBtn");
  } else {
    topBtn.classList.remove("topBtn");
  }
});

// 페이지 로드 시 초기화
document.addEventListener("DOMContentLoaded", () => {
  initMovieDetailPage();
});
