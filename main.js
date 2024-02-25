const searchForm = document.getElementById("search-character-form");
const input = document.getElementById("search-input");
const showAllCharactersBtn = document.getElementById("show-all-characters-btn");
const nextPageBtn = document.getElementById("next-page-btn");
const previousPageBtn = document.getElementById("previous-page-btn");
showAllCharactersBtn.style.display = "none";
const container = document.getElementById("container");
const listContainer = document.createElement("ul");
listContainer.id = "characters-list";

container.append(listContainer);

const apiEndpoint = "https://api.disneyapi.dev/character";

async function getCharacterData(url) {
  try {
    const result = await fetch(url);
    const data = await result.json();
    console.log(data);
    // console.log(data.data);

    display(data);
  } catch (error) {
    console.log(error.message);
  }
}
getCharacterData(apiEndpoint);

function display(data) {
  console.log(data.length);

  while (listContainer.firstChild) {
    listContainer.firstChild.remove();
  }
  data.data.forEach((character) => {
    const charElem = document.createElement("li");
    charElem.classList.add("character-item");
    const charName = document.createElement("h2");
    const charImg = document.createElement("img");
    charImg.classList.add("char-img");
    charImg.setAttribute("src", character.imageUrl);
    if (character.imageUrl) {
      charName.textContent = character.name;
      charName.style.textAlign = "center";
      charElem.append(charName);
      charElem.append(charImg);

      character.films.forEach((film) => {
        let charFilms = document.createElement("p");
        charFilms.textContent = film;
        // charElem.append(charFilms);
      });

      listContainer.append(charElem);
    }
  });

  nextPageBtn.addEventListener("click", () => {
    getCharacterData(data.info.nextPage);
  });
  previousPageBtn.addEventListener("click", () => {
    getCharacterData(data.info.previousPage);
  });
}
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = input.value;
  input.value = "";
  getCharacterData(
    `https://api.disneyapi.dev/character?name=${searchTerm.replace(" ", "%20")}`
  );
  searchForm.style.display = "none";
  nextPageBtn.style.display = "none";
  previousPageBtn.style.display = "none";
  showAllCharactersBtn.style.display = "block";
});

showAllCharactersBtn.addEventListener("click", () => {
  getCharacterData(apiEndpoint);
  searchForm.style.display = "block";
  showAllCharactersBtn.style.display = "none";
  nextPageBtn.style.display = "block";
  previousPageBtn.style.display = "block";
});
