export const pokemonAPI = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
  onDownloadProgress: function(progressEvent) {
    const displayBox = document.getElementById("pokemon-showcase");
    displayBox.innerHTML = `<i class="fas fa-spinner active"></i>
    <p>Catching Pokemons</p>`;
  },
  transformResponse: [
    async function(data, headers) {
      const pokemonArr = [];
      let { next } = JSON.parse(data);
      while (pokemonArr.length < 152) {
        let res = await axios.get(next);
        next = res.data.next;
        let results = res.data.results;
        pokemonArr.push(...results);
      }
      for (let i = 0; i < pokemonArr.length; i++) {
        const res = await axios.get(pokemonArr[i].url);
        const pok = res.data;
        pokemonArr[i] = { ...pokemonArr[i], ...pok };
      }
      return pokemonArr
        .sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
        .slice(0, 152);
    }
  ]
});
