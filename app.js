import { pokemonAPI } from "./pokemonModule.js";
const pokemonArr = [];

document.getElementById("search-bar").oninput = ({ target }) => {
  displayPokemons(filter(pokemonArr, target.value));
};

getPokemons(pokemonArr);

async function getPokemons(arr) {
  try {
    const res = await pokemonAPI.get("/pokemon");
    const pokemons = await res.data;
    arr.push(...pokemons);
    displayPokemons(arr);
  } catch {
    console.log(err);
  }
}

function displayPokemons(pokemons) {
  const displayBox = document.getElementById("pokemon-showcase");
  displayBox.innerHTML = "";
  const length = pokemons.length;
  for (let i = 0; i < length; i++) {
    let pokemonCard = document.createElement("div");
    pokemonCard.className = "pokemon-card";
    pokemonCard.innerHTML = `
    <p class="pokemon-name">${pokemons[i].name}</p>
    <img src="${pokemons[i].sprites.front_default}" />
 `;
    displayBox.appendChild(pokemonCard);
    pokemonCard.onmouseenter = function(e) {
      const div = document.createElement("div");
      div.style.left = this.offsetWidth + "px";
      div.className = "pokemon-details";
      div.innerHTML = `<p>Name: ${pokemons[i].name}</p>
      `;
      for (let ability of pokemons[i].abilities) {
        div.innerHTML += `<p>Ability : ${ability.ability.name}</p>`;
      }
      this.appendChild(div);
      if (this.offsetWidth + e.clientX >= window.innerWidth)
        div.style.left = 0 + "px";
      pokemonCard.onmouseleave = function(e) {
        this.removeChild(div);
      };
    };
  }
}

function filter(arr, word) {
  if (word === "") return arr;
  return pokemonArr.filter(p =>
    p.name.trim().includes(word.trim().toLowerCase())
  );
}

const body = document.querySelector("#pokemon-showcase");

body.onscroll = e => {
  console.log(body.scrollTop);
};
