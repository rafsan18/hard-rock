const searchField = document.querySelector(`[data-search-field]`);
const searchBtn = document.querySelector(`[data-search-btn]`);
const title = document.querySelectorAll(".lyrics-name");
const artistName = document.querySelectorAll(".artist-name");
const getLyricsBtn = document.querySelectorAll(`[data-get-lyrics]`);

searchBtn.addEventListener("click", function () {
  const searchFieldValue = searchField.value;
  fetch(`https://api.lyrics.ovh/suggest/${searchFieldValue}`)
    .then((result) => result.json())
    .then((searchResult) => {
      console.log(searchResult.data);

      for (let i = 0; i < title.length; i++) {
        title[i].innerText = searchResult.data[i].title;
        artistName[i].innerText = searchResult.data[i].artist.name;
      }
    });
});

for (let i = 0; i < getLyricsBtn.length; i++) {
  getLyricsBtn[i].addEventListener("click", function () {
    console.log(artistName[i], title[i]);

    fetch(
      `https://api.lyrics.ovh/v1/${artistName[i].innerText}/${title[i].innerText}`
    )
      .then((lyrics) => lyrics.json())
      .then((fullLyrics) => {
        console.log(fullLyrics);
      });
  });
}
