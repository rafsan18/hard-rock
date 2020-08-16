const searchField = document.querySelector(`[data-search-field]`);
const searchBtn = document.querySelector(`[data-search-btn]`);

searchBtn.addEventListener("click", function () {
  const searchFieldValue = searchField.value;
  fetch(`https://api.lyrics.ovh/suggest/${searchFieldValue}`)
    .then((result) => result.json())
    .then((searchResult) => {
      console.log(searchResult);
    });
});
