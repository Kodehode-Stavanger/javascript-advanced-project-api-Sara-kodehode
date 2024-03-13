const searchForm = document.getElementById("search-character-form");
const input = document.getElementById("search-input");
const showAllCharactersBtn = document.getElementById("show-all-characters-btn");
showAllCharactersBtn.style.display = "none";
showAllCharactersBtn.style.margin = "0 auto";
const nextPageBtn = document.getElementById("next-page-btn");
const previousPageBtn = document.getElementById("previous-page-btn");

const container = document.getElementById("container");
const listContainer = document.createElement("ul");
listContainer.id = "characters-list";

container.append(listContainer);

const apiEndpoint = "https://api.disneyapi.dev/character";

async function getCharacterData(url) {
  try {
    const result = await fetch(url);
    const data = await result.json();

    //console.log(typeof data);
    console.log(data);

    display(data);
  } catch (error) {
    console.log(error.message);
  }
}
getCharacterData(apiEndpoint);

function display(data) {
  while (listContainer.firstChild) {
    listContainer.firstChild.remove();
  }
  if (data.data.length > 0) {
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
        const charFilms = document.createElement("p");
        charFilms.textContent = character.films[0];
        charElem.append(charFilms);
        listContainer.append(charElem);
      }
    });
  } else if (data.data.name) {
    const charElem = document.createElement("li");
    charElem.classList.add("character-item");
    const charName = document.createElement("h2");
    const charImg = document.createElement("img");
    charImg.classList.add("char-img");
    charImg.setAttribute("src", data.data.imageUrl);
    charName.textContent = data.data.name;
    charElem.append(charName);
    charElem.append(charImg);
    const charFilms = document.createElement("p");
    charFilms.textContent = data.data.films[0];
    charElem.append(charFilms);
    listContainer.append(charElem);
  } else {
    const message = document.createElement("h3");
    message.textContent =
      "Unfortunately, This character doesn't exist in our database";
    message.style.padding = "10px";
    message.style.width = "fit-content";
    message.style.whiteSpace = "nowrap";
    message.style.margin = "0 auto";
    container.appendChild(message);
  }
  nextPageBtn.addEventListener("click", (e) => {
    //e.preventDefault();
    e.stopPropagation();
    //e.stopImmediatePropagation();
    nextPage(data);
  });

  previousPageBtn.addEventListener("click", () => {
    previousPage(data);
  });
}

// separate functions for nextPage and previousPage
function nextPage(data) {
  {
    getCharacterData(data.info.nextPage);
  }
}

function previousPage(data) {
  {
    getCharacterData(data.info.previousPage);
  }
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
