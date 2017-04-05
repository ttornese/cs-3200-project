import axios from 'axios';

export const fetchParties = () => {
};

export const fetchPokemonList = () => {
  return axios.get('/api/pokemon')
    .then(resp => resp.data.pokemon);
};

export const fetchPokemon = pokemonId => {
  return axios.get(`/api/pokemon/${pokemonId}`)
    .then(resp => resp.data);
};
