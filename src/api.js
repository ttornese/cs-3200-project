import axios from 'axios';

export const fetchParties = () => {
  return axios.get('/api/parties')
    .then(resp => resp.data.parties);
};

export const fetchPokemonList = () => {
  return axios.get('/api/pokemon')
    .then(resp => resp.data.pokemon);
};

export const fetchPokemon = pokemonId => {
  return axios.get(`/api/pokemon/${pokemonId}`)
  .then(resp => {
    resp.data
  });
};

export const fetchAbility = abilityName => {
  return axios.get(`/api/ability/${abilityName}`)
    .then(resp => resp.data);
};

export const createParty = partyId => {
  return axios.post('/api/parties', { partyId })
  .then(resp => resp.data);
};
