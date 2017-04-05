import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from './src/components/App';

import config from './config';
import axios from 'axios';

const getApiUrl = (path, params) => {
  let pokemonIdPath = /\/pokemon\/\d*/;
  let partyIdPath = /\/party\/\d*/;

  if (pokemonIdPath.test(path)) {
    return `${config.serverUrl}/api/pokemon/${params.pokemonId}`;
  } else if (partyIdPath.test(path)) {
    return `${config.serverUrl}/api/party/${params.partyId}`;
  } else if (path === '/pokemon') {
    return `${config.serverUrl}/api/pokemon`;
  }

  return `${config.serverUrl}/api/party`;
};

const getInitialData = (url, params, apiData) => {
  if (params.pokemonId) {
    return {
      currentPokemonId: apiData.id,
      pokemon: {
        [apiData.id]: apiData
      }
    }
  } else if (params.partyId) {
    return {
      currentPartyId: apiData.party_id,
      parties: {
        [apiData.party_id]: apiData
      }
    }
  } else if (url === "/pokemon") {
    return {
      pokemon: apiData.pokemon
    }
  }

  return {
    parties: apiData.parties
  }
};

const serverRender = (url, params) =>
  axios.get(getApiUrl(url, params))
    .then(resp => {
      const initialData = getInitialData(url, params, resp.data);
      return {
        initialMarkup: ReactDOMServer.renderToString(
          <App initialData={initialData} />
        ),
        initialData
      };
    });

export default serverRender;
