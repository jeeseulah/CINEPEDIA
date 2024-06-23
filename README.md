<div align='center'>
  <h1><b>🎥CINEPEDIA</b></h1>
</div>

> 🗝️ **CINEPEDIA 배포 링크**

👉 [CINEPEDIA 시작하기](https://m.site.naver.com/1ppVX)

> 🗝️ **CINEPEDIA 접속 QR**

![1ppVX](https://github.com/jeeseulah/CINEPEDIA/assets/165135312/26fa0c49-cd81-4a7a-ba68-706dbcd898b2)

<br/>

## 0. 📅 서비스 소개

![logo_violat_gra](https://github.com/jeeseulah/CINEPEDIA/assets/165135312/81fba646-c1a9-47a9-b569-7e8a6dfa5394)

<br/>

**영화에 대한 정보를 제공하는 플랫폼 "CinePedia"**

"CinePedia"는 **영화**를 뜻하는 라틴어 "Cine"와 **백과사전**을 의미하는 그리스어 "pedia"에서 영감을 받아 만들어진 이름입니다.<br />
다양한 문화와 장르의 영화들을 통해 새로운 시각을 얻고, 영화에 대한 이해와 흥미를 넓힐 수 있는 공간이에요. <br />
함께 CINEPEDIA에서 영화의 멋진 세계를 탐험해보세요!
<br/><br/>
“CinePedia”는 현재상영 및 상영예정작, 역대영화 순위, 영화관련영상 등 영화에 대한 다양한 정보를 제공하고 있습니다.

<br/>

## 0-1. 📅 개인프로젝트 진행 기간

2024.06.18 ~ 2024.06.22 (5일) <br/><br/>
![Slide 16_9 - 202 (1)](https://github.com/jeeseulah/CINEPEDIA/assets/165135312/83762885-6d2c-4565-8e83-d3c5bacbf305)

## 0-2. ⚙️ 개발 환경 및 기술 스택

<h3>Frontend</h3>
<p>
    <img src="https://img.shields.io/badge/HTML-E34F26?style=flat-square&logo=HTML5&logoColor=white"/>&nbsp 
    <img src="https://img.shields.io/badge/CSS-1572B6?style=flat-square&logo=css3&logoColor=white"/>&nbsp 
    <img src="https://img.shields.io/badge/Javascript-ffb13b?style=flat-square&logo=javascript&logoColor=white"/>&nbsp 
    <img src ="https://img.shields.io/badge/Bootstrap-7952B3?style=flat-square&logo=bootstrap&logoColor=white"/>&nbsp
    <img src="https://img.shields.io/badge/Swiper-6332F6?style=flat-square&logo=swiper&logoColor=white">&nbsp
</p>
<h3>Development Tools</h3>
<p>
  <img src="https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=flat-square&logo=visualstudiocode&logoColor=white"/>&nbsp 
</p>
<h3>Version Control</h3>
<p>
  <img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white"/>&nbsp
  <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white"/>
</p>
<h3>Design</h3>
<p>
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=figma&logoColor=white"/>&nbsp
</p>
<br/>

## 0-3. ✴️사용한 외부 API

영화 정보 공유사이트 [TMDB API](https://developer.themoviedb.org/reference/intro/getting-started)의 Open API 활용

<br/>

## 0-4. 📂프로젝트 폴더 구조

```
🎥 CINEPEDIA
│  .gitignore
│  README.md
│  actor_list.html    ────────────────────── 영화의 배우, 제작진 리스트 페이지
│  index.html   ──────────────────────────── 메인 페이지
│  movieChart.html    ────────────────────── 무비차트 페이지
│  movie_detail.html    ──────────────────── 영화 상세 정보 페이지
│  nowPlaying.html    ────────────────────── 현재상영작 페이지
│  search.html    ────────────────────────── 검색 페이지
│  top20.html   ──────────────────────────── 역대영화순위 페이지
│  upComing.html    ──────────────────────── 상영예정작 페이지
│
├─📂css
│      bootstrap.min.css
│      style.css    ──────────────────────── css 파일
│
├─📂images
└─📂javascript
        bootstrap.bundle.js
        actor_list.js   ──────────────────── 배우, 제작진 리스트 페이지에서 사용될 javascript
        index.js    ──────────────────────── 메인페이지, 무비차트~상영예정작 페이지 javascript
        movie_detail.js   ────────────────── 영화 상세 페이지에서 사용될 javascript
        search.js   ──────────────────────── 검색 기능 javascript
```

<br/>

## 1. 🤗 주요 기능 소개

### 1) 반응형 웹 페이지

| 메인 페이지                                                                                              | 영화 상세 페이지                                                                                         |
| -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| ![반응형1](https://github.com/jeeseulah/CINEPEDIA/assets/165135312/55ba6dce-302d-4334-b117-b13fc07d9793) | ![반응형2](https://github.com/jeeseulah/CINEPEDIA/assets/165135312/c5d908a4-6356-4128-80ea-148b9e15ac82) |

- CINEPEDIA는 반응형 웹 페이지로 제작 되어 어떤 디바이스를 사용하든지, 화면에 맞춰 자동으로 최적화 되어 있습니다.
- 데스크톱 컴퓨터, 테블릿, 스마트폰 등 다양한 환경에서 이용가능 합니다.

### 2) Bootstrap 사용

- 반응형 웹 페이지를 만들기 위해 Bootstrap을 사용했습니다.
- 개발 시간을 단축하고, 일관된 디자인을 유지할 수 있도록 도와 주었습니다.

### 3) Swiper 사용

![메인슬라이드](https://github.com/jeeseulah/CINEPEDIA/assets/165135312/63844530-c0fc-4f0e-b2f3-13d5949c987e)

- 인기영화의 Top5만 나타나게 하였습니다.
- Swiper의 종류 중 Coverflow Effect를 사용했습니다.
- 마우스를 올리면 슬라이드가 멈추도록 설정되어 있습니다.
- 간단한 터치나 스와이프 동작으로 카드 사이를 이동하며, 반응형으로 제작되어 모바일에서도 자연스럽게 동작합니다.
- 영화 포스터 위에 영화 제목을 표시하고, 포스터가 흰 배경인 경우를 고려하여 text에 shadow 효과를 추가했습니다.

| Swiper Pagination (메인 페이지)                                                                                      | Swiper Scrollbar (영화 상세 페이지)                                                                                  |
| -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| ![영화리스트스와이퍼2](https://github.com/jeeseulah/CINEPEDIA/assets/165135312/c78ececf-5448-4afc-afaa-7168345b031c) | ![영화리스트스와이퍼1](https://github.com/jeeseulah/CINEPEDIA/assets/165135312/44f40c90-ff75-48f4-aa1c-bff1f7f5ef1f) |

- 메인 페이지에는 마우스를 올리면 Swiper Pagination 나타나도록 설정했습니다.
- 영화 상세 페이지에는 Swiper Scrollbar를 사용하여 마우스 드래그를 통해 슬라이드를 이동할 수 있도록 했습니다.

### 4) 영화 순위 보여주기

![영화리스트스와이퍼2](https://github.com/jeeseulah/CINEPEDIA/assets/165135312/c78ececf-5448-4afc-afaa-7168345b031c)

- forEach의 index를 사용하여 영화 poster card 상단에 순위가 표시되도록 했습니다.

### 5) 영화 카드 MouseOver 효과

| 영화 poster 이미지가 없을 경우 (맨왼쪽)                                                                             | MouseOver시 영화 상세 내용 표시                                                                                     |
| ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| ![이미지가 없을 경우](https://github.com/jeeseulah/CINEPEDIA/assets/165135312/c11ba226-3d9d-411b-8310-95708da44847) | ![영화카드마우스오버](https://github.com/jeeseulah/CINEPEDIA/assets/165135312/edb67ce2-1ee2-44cc-9562-e5fc64bee706) |

- 영화 poster 이미지가 없는 경우 기본 이미지가 나타납니다.
- 영화 poster card에 마우스를 올리면 해당 영화의 별점과 간단한 설명이 나타납니다.
- 설명이 길 경우를 고려해 말줄임표로 표시했습니다.

### 6) 별점 표시, 공유 기능

![공유기능](https://github.com/jeeseulah/CINEPEDIA/assets/165135312/ee3cba86-6311-4c6d-a9b3-c122b220cdbf)

- 영화 제목 상단에 해당 영화의 평점을 불러와 별 모양으로 표시하도록 구현했습니다.
  - 평점은 10점 만점의 값으로 되어 있기 때문에 평점을 2로 나눈 값으로 표시했습니다.
- `window.navigator.share()`를 이용하여 공유 버튼을 클릭하면 해당 주소를 공유할 수 있도록 했습니다.

### 7) 더보기 기능

![더보기기능](https://github.com/jeeseulah/CINEPEDIA/assets/165135312/d3979713-24c0-4d67-ac18-8a1b4e2a981a)

- 영화에 대한 소개글이 길 경우 css를 이용해 말 줄임표로 표시하고, "더보기" 버튼을 클릭하면 전체 내용이 나타나도록 구현했습니다.

### 8) 트레일러 영상 보기

![트레일러](https://github.com/jeeseulah/CINEPEDIA/assets/165135312/834767ee-2c7f-424b-848e-b0a9f899db9b)

- 해당 영화의 트레일러 영상을 영화 상세 설명 하단에 바로 시청할 수 있도록 구현했습니다.

### 9) 위로 scroll 기능

![위로화살표](https://github.com/jeeseulah/CINEPEDIA/assets/165135312/715e744f-fc57-40d7-85d3-88ac927b2b41)

- 페이지 오른쪽 하단에 보이는 위로 화살표 모양을 클릭하면 페이지 상단으로 이동합니다.

### 10) 최근 검색어 저장

![검색기능](https://github.com/jeeseulah/CINEPEDIA/assets/165135312/f508b21f-9956-4c57-9519-e7b34f878b27)

- 이전에 검색된 내용이 없으면 "검색 내역이 없습니다"라고 표시됩니다.
- 검색할 때마다 localStorage에 검색 값이 배열로 저장됩니다.
- 검색내용을 개별적으로 삭제하거나 모두 한 번에 삭제할 수 있습니다.

## 1-1. 🧵 작업 과정

### 1) 로고 제작

![Slide 16_9 - 203 (1)](https://github.com/jeeseulah/CINEPEDIA/assets/165135312/caf40256-3438-4a11-bf3f-9826efcaaffc)

- 로고 제작 하는 과정에서 폰트 선택과 디자인에 대하여 고민하였습니다. 복잡하지 않고 간결하며, 쉽게 인식할 수 있는 폰트를 선택했습니다. 디자인은 영화 프레임을 상상하며 사각형 프레임 안에 문구를 배치하였습니다.
- Blanka 글꼴을 선택하고, 포토샵에서 gradient 효과를 적용하여 색상을 설정했습니다.

### 2) 와이어프레임 작성 (피그마)

![와이어프레임](https://github.com/jeeseulah/CINEPEDIA/assets/165135312/b1148772-d624-425a-82f7-f7cba32211e9)

- 피그마를 이용해 와이어프레임을 제작했습니다.
- 반응형 페이지를 위해 lg, md, sm 사이즈로 제작했습니다.
- 👉[피그마링크](<https://www.figma.com/design/QUV9hKMmLmIsgLklpzFiMl/%EA%B0%9C%EC%9D%B8%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8(%EC%98%81%ED%99%94%EC%A1%B0%ED%9A%8C)?node-id=0-1&t=BV6hzDmxj09h43rh-0>)

### 3) 기능 명세서 작성

![요구사항정리](https://github.com/jeeseulah/CINEPEDIA/assets/165135312/68d3ed89-b626-4fb1-94e5-4564b560d5dd)

- 👉[기능명세링크](https://www.notion.so/ba42f3a137824a1a92488ec9e49a56e2?pvs=4)

## 2. ✴️ 핵심 코드

<details>
    <summary><b>2-(1) 주어진 API에서 데이터 필터링하기</b></summary>
```json

````

```jsx

````

</details>
<details><summary><b>2-(2) 별점 표시 </b></summary></details>
<details><summary><b>2-(3) 더보기</b></summary></details>
<details><summary><b>2-(4) 최근검색어 기능 구현하기</b></summary></details>

## 3. ✴️ 보완해야할 부분

- 검색 결과가 없는 경우에는 해당하는 결과가 없다는 안내 메시지가 표시되는 기능
- 최근 검색어를 클릭하면 해당 검색어로 바로 검색되는 기능
- 배우 프로필 페이지 만들기
- 검색 시 키보드 키를 누를 때마다 검색 결과가 실시간으로 나타나도록 설정하는 기능

## 4. ✴️ 느낀점

<!-- Top Button -->
<p style='background: black; width: 32px; height: 32px; border-radius: 50%; display: flex; justify-content: center; align-items: center; margin-left: auto;'><a href="#top" style='color: white; '>▲</a></p>

<br />
