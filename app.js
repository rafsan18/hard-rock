const searchField = document.querySelector(`[data-search-field]`);
const searchBtn = document.querySelector(`[data-search-btn]`);
const title = document.querySelectorAll(".lyrics-name");
const artistName = document.querySelectorAll(".artist-name");

searchBtn.addEventListener("click", function () {
  const searchFieldValue = searchField.value;
  fetch(`https://api.lyrics.ovh/suggest/${searchFieldValue}`)
    .then((result) => result.json())
    .then((searchResult) => {
      console.log(searchResult.data);
      // let title = document.querySelector(".lyrics-name");
      // title.innerText = searchResult.data[0].album.title;
      console.log(title);
      for (let i = 0; i < title.length; i++) {
        title[i].innerText = searchResult.data[i].title;
        artistName[i].innerText = searchResult.data[i].artist.name;
      }
    });
});
