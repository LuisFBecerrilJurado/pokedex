const pokedex = document.querySelector("[data-poke-card]");
const nombre = document.querySelector("[data-poke-name]");
const imgContainer = document.querySelector("[data-poke-img-container]");
const img = document.querySelector("[data-poke-img]");
const id = document.querySelector("[data-poke-id]");
const pokeTypes = document.querySelector("[data-poke-types]");
const weight = document.querySelector("[ data-poke-Weight]");
const height = document.querySelector("[ data-poke-Height]");
const pokeStats = document.querySelector("[data-poke-stats]");
const moves = document.querySelector("[data-poke-moves]");
const abilities = document.querySelector("[data-poke-abilities]");
const pokeSound = document.querySelector("[data-sound-pokemon]");
const ctx = document.getElementById("myChart").getContext("2d");

document.getElementById("poke-card").style.display = "flex";
document.getElementById("pokedexCuerpo").style.width = "20rem";
document.getElementById("poke-card").style.justifyContent = "center";
document.getElementById("dataPokemon__stats").style.display = "none";
document.getElementById("poke-types").style.display = "none";
document.getElementById("poke-height").style.display = "none";
document.getElementById("poke-weight").style.display = "none";
document.getElementById("poke-id").style.display = "none";

const typeColors = {
  electric: "#e7d56b",
  normal: "#B09398",
  fire: "#FF675C",
  water: "#0596C7",
  ice: "#86b5c5",
  rock: "#999799",
  flying: "#539c86",
  grass: "#4A9681",
  psychic: "#be95a3",
  ghost: "#561D25",
  bug: "#76b977",
  poison: "#795663",
  ground: "#D2B074",
  dragon: "#DA627D",
  steel: "#1D8A99",
  fighting: "#2F2F2F",
  default: "#2A1A1F",
};

const buscarPokemon = (event) => {
    event.preventDefault();
    const { value } = event.target.pokemon;
  fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
    .then((data) => data.json())
      .then((response) => renderPokemonData(response))
    .catch((err) => renderNotFound());
  window.grafica.clear();
  window.grafica.destroy();
};



const renderPokemonData = (data) => {
  const sprite = data.sprites.front_default;
  const { stats, types } = data;
  nombre.textContent = data.name;
  img.setAttribute("src", sprite);
  id.textContent = `Nº ${data.id}`;
  height.textContent = `Height: ${data.height}`;
  weight.textContent = `Weight: ${data.weight}`;
  setCardColor(types);
  renderPokemonTypes(types);
  renderPokemonStats(stats);
  renderPokemonMoves(data);
  renderPokemonabilities(data);
  soundid = data.id;
  soundname = data.name;
  document.getElementById("dataPokemon__stats").style.display = "revert";
  document.getElementById("poke-types").style.display = "revert";
  document.getElementById("poke-height").style.display = "revert";
  document.getElementById("poke-weight").style.display = "revert";
  document.getElementById("poke-id").style.display = "revert";
  document.getElementById("pokedexCuerpo").style.width = "60%";
  if (soundid <= 721) {
    pokeSound.setAttribute("src", `sound/${soundid}-${soundname}.wav`);
  } else {
    pokeSound.setAttribute("src", "./sound//pokemon-3.mp3");
    }
};

const setCardColor = (types) => {
  const colorOne = typeColors[types[0].type.name];
  const colorTwo = types[1]
    ? typeColors[types[1].type.name]
    : typeColors.default;
  img.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
  img.style.backgroundSize = " 2rem 2rem";
};

const renderPokemonTypes = (types) => {
  pokeTypes.innerHTML = "";
  types.forEach((type) => {
    const typeTextElement = document.createElement("div");
    typeTextElement.style.color = typeColors[type.type.name];
    typeTextElement.textContent = type.type.name;
    pokeTypes.appendChild(typeTextElement);
  });
};

const renderPokemonStats = (stats) => {
  window.grafica = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["HP", "ATT", "DEF", "SATT", "SDEF", "SPEED"],
      datasets: [
        {
          label: "STATS",
          data: [
            stats[0].base_stat,
            stats[1].base_stat,
            stats[2].base_stat,
            stats[3].base_stat,
            stats[4].base_stat,
            stats[5].base_stat,
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.9)",
            "rgba(255, 159, 64, 0.9)",
            "rgba(255, 205, 86, 0.9)",
            "rgba(75, 192, 192, 0.9)",
            "rgba(54, 162, 235, 0.9)",
            "rgba(153, 102, 255, 0.9)",
            "rgba(201, 203, 207, 0.9)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

const renderPokemonMoves = (data) => {
  moves.innerHTML = "Moves:";
  if (data.moves.length > 1) {
    for (let move = 0; move < 4; move++) {
      const moveElement = document.createElement("div");
      const moveElementName = document.createElement("div");
      moveElementName.textContent = data.moves[move].move.name;
      moveElement.appendChild(moveElementName);
      moves.appendChild(moveElement);
    }
  } else if ((data.moves.length = 1)) {
    for (let move = 0; move < 1; move++) {
      const moveElement = document.createElement("div");
      const moveElementName = document.createElement("div");
      moveElementName.textContent = data.moves[move].move.name;
      moveElement.appendChild(moveElementName);
      moves.appendChild(moveElement);
    }
  }
};

const renderPokemonabilities = (data) => {
  abilities.innerHTML = "Abilities:";
  if (data.abilities.length >= 2) {
    for (let ability = 0; ability < data.abilities.length; ability++) {
      const abilityElement = document.createElement("div");
      const abilityElementName = document.createElement("div");
      abilityElementName.textContent = data.abilities[ability].ability.name;
      abilityElement.appendChild(abilityElementName);
      abilities.appendChild(abilityElement);
    }
  } else if (data.abilities.length < 2) {
    for (let ability = 0; ability < data.abilities.length; ability++) {
      const abilityElement = document.createElement("div");
      const abilityElementName = document.createElement("div");
      abilityElementName.textContent = data.abilities[ability].ability.name;
      abilityElement.appendChild(abilityElementName);
      abilities.appendChild(abilityElement);
    }
  }
};

function renderNotFound() {
  nombre.textContent = "Pokemon no encontrado";
  img.setAttribute("src", "img/DitoBailando.gif");
  img.style.background = "#fff";
  pokeTypes.innerHTML = "";
  id.textContent = "";
  moves.innerHTML = "";
  abilities.innerHTML = "";
  height.textContent = "";
  weight.textContent = "";
  pokeSound.setAttribute("src", "sound/error.mp3");
  document.getElementById("dataPokemon__stats").style.display = "none";
  document.getElementById("poke-types").style.display = "none";
  document.getElementById("poke-height").style.display = "none";
  document.getElementById("poke-weight").style.display = "none";
  document.getElementById("poke-id").style.display = "none";
  document.getElementById("pokedexCuerpo").style.width = "20rem";
}

