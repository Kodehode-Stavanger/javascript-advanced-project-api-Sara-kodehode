const container = document.getElementById("container");
const listContainer = document.createElement("ul");
// listContainer.className("list-container");
container.append(listContainer);

async function getCharacterData() {
  try {
    const result = await fetch("https://api.disneyapi.dev/character");
    const data = await result.json();
    display(data);
  } catch (error) {
    console.log(error.message);
  }
}
getCharacterData();

function display(data) {
  data.data.forEach((character) => {
    const charElem = document.createElement("li");
    const charName = document.createElement("h2");

    charName.textContent = character.name;
    charElem.append(charName);

    character.films.forEach((film) => {
      let charFilms = document.createElement("p");
      charFilms.textContent = film;
      charElem.append(charFilms);
    });

    listContainer.append(charElem);
  });
}
