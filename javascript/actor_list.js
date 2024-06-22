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

// 감독/출연 리스트 페이지  ///////////////////////////////////////////////////
const initActorListPage = async () => {
  try {
    const urlParams = new URL(location.href).searchParams;
    const movieId = urlParams.get("movieId");

    // 무비 디테일
    await getMovieDetail(movieId);
    await getMovieCredits(movieId);
  } catch (error) {
    console.error("감독출연 리스트 페이지 에러 :", error);
  }
};

// 무비 detail
const getMovieDetail = async (movie_id) => {
  const movieDetailUrl = `${defaultUrl}movie/${movie_id}?language=ko-KR`;
  const response = await fetch(movieDetailUrl, options);
  const movieData = await response.json();

  updateMovieDetail(movieData);
};

// 출연자
const getMovieCredits = async (movie_id) => {
  const movieCreditsUrl = `${defaultUrl}movie/${movie_id}/credits?language=ko-KR`;
  const response = await fetch(movieCreditsUrl, options);
  const movieData = await response.json();

  updateMovieCredits(movieData);
};

// 무비 디테일 HTML
const updateMovieDetail = (movieData) => {
  console.log("영화정보 ", movieData);
  const motieTitle = document.querySelector("#actorListTitle");
  let release_date = movieData.release_date.split("-");
  motieTitle.innerHTML = `
        <div style="background-image: linear-gradient(
                        to top,
                        rgba(0, 0, 0, 0.8),
                        rgba(0, 0, 0, 0.2)
                    ),
                    url('${defaultImgUrl}${movieData.backdrop_path}');
                    background-size: cover;
                    background-position: center;
                    background-attachment: fixed;">
            <div class="container">
                <div class="d-flex text-light py-5 px-3">
                    <h2 class="fw-bold m-0">${movieData.title} (${release_date[0]})</h2>
                </div>
            </div>
        </div>`;
};

// 출연자 HTML
const updateMovieCredits = (movieData) => {
  console.log("출연자", movieData);
  const castList = document.querySelector("#castList .row");
  const crewList = document.querySelector("#crewList .row");
  const actors = movieData.cast;
  const crews = movieData.crew;
  // 배역
  if (actors.length > 0) {
    actors.forEach((actor) => {
      const profileImg = actor.profile_path
        ? `${defaultImgUrl}${actor.profile_path}`
        : "./images/blank-profile.png";
      castList.innerHTML += `
            <div class="col-3 col-md-2 col-lg-1 mb-5">
                <a href="#">
                    <div class="card bg-black text-white-50">
                        <div class="overflow-hidden rounded">
                            <img
                            src="${profileImg}"
                            class="img-fluid h-100 object-fit-cover"
                            alt="배우이미지"/>
                        </div>
                        <small class="text-light text-center pt-2">${actor.name}</small>
                        <small class="text-center pt-1 pb-3">${actor.character}</small>
                    </div>
                </a>
            </div>`;
    });
  }

  // 제작진
  if (crews.length > 0) {
    crews.forEach((crew) => {
      const profileImg = crew.profile_path
        ? `${defaultImgUrl}${crew.profile_path}`
        : "./images/blank-profile.png";
      crewList.innerHTML += `
            <div class="col-3 col-md-2 col-lg-1 mb-5">
                <a href="#">
                    <div class="card bg-black text-white-50">
                        <div class="overflow-hidden rounded">
                            <img
                            src="${profileImg}"
                            class="img-fluid h-100 object-fit-cover"
                            alt="제작진이미지"/>
                        </div>
                        <small class="text-light text-center pt-2">${crew.name}</small>
                        <small class="text-center pt-1 pb-3">${crew.job}</small>
                    </div>
                </a>
            </div>`;
    });
  }
};

// 페이지 로드 시 초기화
document.addEventListener("DOMContentLoaded", () => {
  initActorListPage();
});
