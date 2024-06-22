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

// index 페이지  ///////////////////////////////////////////////////
const getMovieList = async (listType, pageNum = 1) => {
  let movieListUrl = "";
  switch (listType) {
    // 무비차트 (인기영화)
    case "movieChart":
      movieListUrl = `${defaultUrl}movie/popular?language=ko-KR&page=${pageNum}`;
      break;
    // 현재상영작
    case "nowPlaying":
      movieListUrl = `${defaultUrl}movie/now_playing?language=ko-KR&page=${pageNum}`;
      break;
    // 상영예정작
    case "upComing":
      movieListUrl = `${defaultUrl}movie/upcoming?language=ko-KR&page=${pageNum}`;
      break;
    // TOP20 (높은 평점의 인기 영화)
    case "top20":
      movieListUrl = `${defaultUrl}movie/top_rated?language=ko-KR&page=${pageNum}`;
      break;
  }
  let response = await fetch(movieListUrl, options);
  return await response.json();
};

// 홈 슬라이드 //////////////////////////////////////////////
const mainSlide = async (listType) => {
  try {
    const movieData = await getMovieList(listType);
    const movies = movieData.results.slice(0, 5);
    const movieChartList = document.querySelector(
      "#slide-content .swiper-wrapper"
    );
    movies.forEach((movie) => {
      movieChartList.innerHTML += `
            <div class="swiper-slide rounded position-relative"
                style="background-image: url(${defaultImgUrl}${movie.backdrop_path})">
              <div class="text-start text-light position-absolute left-0 bottom-0">
                <h1 class="fw-bold mb-5 display-1 ms-5">${movie.title}</h1>
              </div>
            </div>`;
    });
    // swiper
    new Swiper("#slide-content .swiper-container", {
      effect: "coverflow", //슬라이드 종류중 Coverflow Effect사용
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 1, // 한 슬라이드에 보여줄 갯수 "auto"
      loop: true, // 슬라이드 반복 여부
      loopAdditionalSlides: 1, // 슬라이드 반복 시 마지막 슬라이드에서 다음 슬라이드가 보여지지 않는 현상 수정
      coverflowEffect: {
        rotate: 50, // Slide rotate in degrees
        stretch: 0, //Stretch space between slides (in px)
        depth: 100, // Depth offset in px (slides translate in Z axis)
        modifier: 1, // Effect multiplier
        slideShadows: true, //Enables slides shadows
      },
      pagination: {
        el: "#slide-content .swiper-pagination", //페이지 버튼을 담을 태그 설정
        clickable: true, // 버튼 클릭 여부
      },
      speed: 4000,
      autoplay: {
        // 자동 슬라이드 설정
        delay: 1000,
        disableOnInteraction: false, // false로 설정하면 스와이프 후 자동 재생이 비활성화 되지 않음
        pauseOnMouseEnter: true, // mouseover시 슬라이드 멈춤
      },
      breakpoints: {
        768: {
          slidesPerView: "auto",
        },
      },
    });
  } catch (error) {
    console.error("홈 슬라이드 에러:", error);
  }
};

// 무비리스트 //////////////////////////////////////////////
const loadMovieListShort = async (listType) => {
  const movieListContainer = document.querySelector(
    `#${listType} .swiper-wrapper`
  );
  try {
    const movieData = await getMovieList(listType);
    console.log("영화목록", movieData);
    const movieBrief = movieData.results;
    if (movieBrief.length > 0) {
      movieBrief.forEach((movie, index) => {
        const movieImg = movie.poster_path
          ? `${defaultImgUrl}${movie.poster_path}`
          : "./images/blank-movie.png";
        movieListContainer.innerHTML +=
          `
            <div class="swiper-slide position-relative">
                <a href="./movie_detail.html?movieId=${movie.id}">
                    <div class="card text-bg-dark">
                        <img src="${movieImg}"
                            class="img-fluid rounded h-100 object-fit-cover" alt="무비차트"/>
                        <div class="card-img-overlay">
                            <small class="card-text"><i class="bi bi-star-fill text-warning me-2"></i>${movie.vote_average}</small>
                            <small class="card-text">${movie.overview}</small>
                        </div>
                    </div>
                    <h1 class="ranking-text display-1 roboto-black-italic position-absolute bottom-0 start-0 text-light mx-3 my-0">
                  ` +
          (index + 1) +
          `
                    </h1>
                </a>
            </div>`;
      });
    }
    swiperArrow(listType);
    // swiper
    new Swiper(`#${listType}`, {
      slidesPerView: 3, // 한 슬라이드에 보여줄 갯수 "auto"
      spaceBetween: 15, // 슬라이드간 간격
      navigation: {
        nextEl: `#${listType} .swiper-button-next`,
        prevEl: `#${listType} .swiper-button-prev`,
      },
      breakpoints: {
        768: {
          slidesPerView: 4,
        },
        992: {
          slidesPerView: 6,
        },
      },
    });
  } catch (error) {
    console.error(`${listType} 에러:`, error);
  }
};

// 각 nav영역 //////////////////////////////////////////////
const loadMovieList = async (listType, containerId) => {
  let movieListContainer = document.querySelector(`#${containerId} .row`);
  try {
    const movieData = await getMovieList(listType);
    const movieBrief = movieData.results.slice(0, 18);
    if (movieBrief.length > 0) {
      movieBrief.forEach((movie) => {
        const movieImg = movie.poster_path
          ? `${defaultImgUrl}${movie.poster_path}`
          : "./images/blank-movie.png";
        movieListContainer.innerHTML += `
            <div class="col-4 col-md-3 col-lg-2 mb-5">
                <a href="./movie_detail.html?movieId=${movie.id}">
                    <div class="card bg-black">
                        <img src="${movieImg}"
                            class="img-fluid rounded h-100 object-fit-cover"
                            alt="무비리스트"/>
                        <div class="card-img-overlay text-light">
                            <small class="card-text"><i class="bi bi-star-fill text-warning me-2"></i>${movie.vote_average}</small>
                            <small class="card-text">${movie.overview}</small>
                        </div>
                        <div class="text-light text-center pt-2">${movie.title}</div>
                    </div>
                </a>
            </div>`;
      });
    }
  } catch (error) {
    console.error(`${listType} 에러:`, error);
  }
};

const swiperArrow = (listType) => {
  const movieChart = document.querySelector(`#${listType}`);
  const swiper_button_next = document.querySelector(
    `#${listType} .swiper-button-next`
  );
  const swiper_button_prev = document.querySelector(
    `#${listType} .swiper-button-prev`
  );

  movieChart.addEventListener("mouseover", (e) => {
    swiper_button_next.classList.remove("d-none");
    swiper_button_prev.classList.remove("d-none");
  });
  movieChart.addEventListener("mouseout", (e) => {
    swiper_button_next.classList.add("d-none");
    swiper_button_prev.classList.add("d-none");
  });
};

// 페이지 로드 시 초기화
document.addEventListener("DOMContentLoaded", () => {
  mainSlide("upComing");
  ["movieChart", "nowPlaying", "upComing", "top20"].forEach((listType) => {
    // 메인페이지
    loadMovieListShort(listType);
    // 각 nav 페이지
    loadMovieList(listType, `${listType}List`);
  });
});
