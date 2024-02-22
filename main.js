const container = document.getElementById("container");
const listContainer = document.createElement("ul");
// listContainer.className("list-container");
container.append(listContainer);

async function getQuizData() {
  try {
    const result = await fetch("https://api.disneyapi.dev/character");
    const data = await result.json();
    // console.log(data);
    console.log(data);
    display(data);
  } catch (error) {
    console.log(error.message);
  }
}
getQuizData();

function display(data) {
  data.data.forEach((e) => {
    const charElem = document.createElement("li");
    let charName = document.createElement("h2");
    let charFilms = document.createElement("span");
    // console.log(e.name);

    e.films.forEach((film) => {
      if (!film) {
        console.log(film);

        charFilms = film;
      }
    });
    // charName = e.name;
    // console.log(charName);
    // charFilms = e.films;
    charElem.append(charName, charFilms);
    listContainer.append(charElem);
  });
}
