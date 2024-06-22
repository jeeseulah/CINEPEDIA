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

// 최근 검색어 기능 ///////////////////////////////////////////////////////////////
const searchForm = document.querySelector(".search-check");
const allClearButton = document.querySelector(".all-clear");
const searchListContainer = document.querySelector(".search-list");
const searchResult = document.querySelector(".recent_search"); // 검색 결과 출력할 요소

// 검색버튼 event시 값 전달
searchForm.addEventListener("submit", (e) => {
  e.preventDefault(); // form태그의 submit에 의해 발생한 리로드가 실행되지 않도록
  const searchValue = document.querySelector(".search-text").value;
  console.log("searchValue : ", searchValue);
  initMovieSearchPage(searchValue); // 영화 검색
  addKeyword(searchValue); // 최근 검색어에 추가함
});

// 새로운 검색어 로컬에 저장
const addKeyword = (text) => {
  const keywords = JSON.parse(localStorage.getItem("keywords") || "[]");
  //"[]"해줘야함. 새로고침 후 keywords값이 null이 되기때문
  const newKeyword = {
    id: Date.now(),
    text: text,
  };
  const updatedKeywords = [newKeyword, ...keywords];
  localStorage.setItem("keywords", JSON.stringify(updatedKeywords));
};

// 최근 검색어 표시하기
const getKeyword = () => {
  searchListContainer.innerHTML = "";
  // 단일 삭제 후 li list를 새롭게 update하기 위해 필요

  const keywordsList = JSON.parse(localStorage.getItem("keywords") || "[]");
  //"[]" 꼭! 해줘야 함. 새로고침 시 동작안함
  console.log("검색리스트", keywordsList);

  if (keywordsList.length > 0) {
    keywordsList.forEach((element) => {
      searchListContainer.innerHTML += `
        <li>${element.text}
            <button class="btn btn-black btn-sm text-white-50 ms-auto" onclick="deleteKeyword(${element.id})">
                <i class="bi bi-x-lg"></i>
            </button>
        </li>`;
    });
    allClearButton.classList.remove("d-none");
  } else {
    searchListContainer.innerHTML =
      '<p class="text-white-50 pt-3">검색 내역이 없습니다.</p>';
    allClearButton.classList.add("d-none");
  }
};

// 최근 검색어 모두 삭제
allClearButton.addEventListener("click", () => {
  localStorage.clear();
  getKeyword();
});

// 최근 검색어 단일 삭제
const deleteKeyword = (id) => {
  let keywords = JSON.parse(localStorage.getItem("keywords") || "[]");
  let updatedKeywords = keywords.filter((keyword) => keyword.id !== id);
  localStorage.setItem("keywords", JSON.stringify(updatedKeywords));
  getKeyword();
};

// 영화 검색 페이지  ///////////////////////////////////////////////////////////////
const initMovieSearchPage = async (searchValue) => {
  try {
    searchResult.innerHTML = "";

    // 무비 디테일
    await getMovieSearch(searchValue);
    await getPersonSearch(searchValue);
  } catch (error) {
    console.error("검색 페이지 에러 :", error);
  }
};

// 영화 검색
const getMovieSearch = async (searchValue) => {
  const movieSearchUrl = `${defaultUrl}search/movie?query=${searchValue}&language=ko-KR`;
  const response = await fetch(movieSearchUrl, options);
  const movieData = await response.json();
  updateMovieSearch(movieData);
};

// 인물 검색
const getPersonSearch = async (searchValue) => {
  const personSearchUrl = `${defaultUrl}search/person?query=${searchValue}&language=ko-KR`;
  const response = await fetch(personSearchUrl, options);
  const personData = await response.json();
  updatePersonSearch(personData);
};

// 영화 검색 HTML
const updateMovieSearch = (movieData) => {
  console.log("영화리스트", movieData);
  const movieBrief = movieData.results.slice(0, 12);
  if (movieBrief.length > 0) {
    movieBrief.forEach((movie) => {
      const posterImg = movie.poster_path
        ? `${defaultImgUrl}${movie.poster_path}`
        : "./images/blank-movie.png";
      searchResult.innerHTML += `
            <div class="movie_search col-4 col-md-3 col-lg-2 mb-5">
                <a href="./movie_detail.html?movieId=${movie.id}">
                    <div class="card bg-black">
                        <img src="${posterImg}" class="img-fluid rounded h-100 object-fit-cover" alt="영화이미지"/>
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
};

// 인물 검색 HTML
const updatePersonSearch = (personData) => {
  console.log("인물리스트", personData);
  const personBrief = personData.results.slice(0, 6);
  if (personBrief.length > 0) {
    personBrief.forEach((person) => {
      const profileImg = person.profile_path
        ? `${defaultImgUrl}${person.profile_path}`
        : "./images/blank-profile.png";
      searchResult.innerHTML += `
            <div class="person_search col-4 col-md-3 col-lg-2 mb-5">
                <a href="#">
                  <div class="card bg-black text-white-50">
                    <div class="overflow-hidden rounded">
                      <img src="${profileImg}" class="img-fluid h-100 object-fit-cover" alt="배우이미지"/>
                    </div>
                    <small class="text-light text-center pt-2">${person.name}</small>
                  </div>
                </a>
            </div>`;
    });
  }
};

// 페이지 로드 시 초기화
document.addEventListener("DOMContentLoaded", () => {
  getKeyword();
});
