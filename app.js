const searchField = document.querySelector(`[data-search-field]`);
const searchBtn = document.querySelector(`[data-search-btn]`);

const title = document.querySelectorAll(".lyrics-name");
const artistName = document.querySelectorAll(".artist-name");

const getLyricsBtn = document.querySelectorAll(`[data-get-lyrics]`);
const lyricsSpace = document.querySelectorAll(".single-result");

const simpleResults = document.getElementById("simple-results");
const simpleResultTitle = document.querySelectorAll(`[data-title]`);
const simpleResultAuthor = document.querySelectorAll(`[data-author]`);
const simpleGetLyricsBtn = document.querySelectorAll(`[data-simple-lyrics]`);
const simpleLyricsSpace = document.getElementById("simple-lyrics-space");

// event listener on typing
searchField.addEventListener("input", function (e) {
  simpleResults.style.display = "block";
  fetch(`https://api.lyrics.ovh/suggest/${e.target.value}`)
    .then((result) => result.json())
    .then((searchResult) => {
      for (let i = 0; i < simpleResultTitle.length; i++) {
        simpleResultTitle[i].innerText = searchResult.data[i].title;
        simpleResultAuthor[i].innerText = searchResult.data[i].artist.name;
      }
    });
});

for (let i = 0; i < simpleGetLyricsBtn.length; i++) {
  simpleGetLyricsBtn[i].addEventListener("click", function () {
    fetch(
      `https://api.lyrics.ovh/v1/${simpleResultAuthor[i].innerText}/${simpleResultTitle[i].innerText}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject("lyrics not found");
        }
      })
      .then((lyrics) => {
        simpleLyricsSpace.innerHTML += `<div class="single-lyrics text-center">
            <button class="btn btn-success go-back">&lsaquo;</button>
            <h2 class="text-success mb-4">${simpleResultAuthor[i].innerText} - ${simpleResultTitle[i].innerText}</h2>
            <pre class="lyric text-white">${lyrics.lyrics}</pre>
          </div>`;
      })
      .catch((error) => {
        simpleLyricsSpace.innerHTML += `<p class = "text-danger" style="margin-left: 15px;"> ${error}</p>`;
      });
  });
}

// Search button event
searchBtn.addEventListener("click", function () {
  simpleResults.style.display = "none";
  fetch(`https://api.lyrics.ovh/suggest/${searchField.value}`)
    .then((result) => result.json())
    .then((searchResult) => {
      for (let i = 0; i < title.length; i++) {
        lyricsSpace[i].style.display = "flex";
        title[i].innerText = searchResult.data[i].title;
        artistName[i].innerText = searchResult.data[i].artist.name;
      }
    });
});

// get lyrics button event
for (let i = 0; i < getLyricsBtn.length; i++) {
  getLyricsBtn[i].addEventListener("click", function () {
    fetch(
      `https://api.lyrics.ovh/v1/${artistName[i].innerText}/${title[i].innerText}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject("lyrics not found");
        }
      })
      .then((fullLyrics) => {
        lyricsSpace[i].innerHTML += `
        <div class="single-lyrics text-center">
          <button class="btn btn-success go-back">&lsaquo;</button>
          <h2 class="text-success mb-4">${artistName[i].innerText} - ${title[i].innerText}</h2>
          <pre class="lyric text-white">${fullLyrics.lyrics}</pre>
        </div>`;
      })
      // handled missing lyrics
      .catch((error) => {
        lyricsSpace[
          i
        ].innerHTML += `<p class = "text-danger" style="margin-left: 15px;"> ${error}</p>`;
      });
  });
}
