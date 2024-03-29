import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import * as api from '../api';
import PartiesPage from './PartiesPage/PartiesPage';
import PartyPage from './PartyPage/PartyPage';
import PokemonListPage from './PokemonListPage/PokemonListPage';
import PokemonPage from './PokemonPage/PokemonPage';

const pushState = (obj, url) =>
  window.history.pushState(obj, '', url);

const onPopState = handler => {
  window.onpopstate = handler;
};

class App extends React.Component {
  static propTypes = {
    initialData: PropTypes.object.isRequired,
    pokemon: PropTypes.object
  };

  state = this.props.initialData;

  componentDidMount() {
    onPopState((event) => {
      this.setState({
        currentPokemonId: (event.state || {}).currentPokemonId
      });
    });
  }

  componentWillUnmount() {
    onPopState(null);
  }

  fetchPokemon = (pokemonId) => {
    pushState(
      { currentPokemonId: pokemonId },
      `/pokemon/${pokemonId}`
    );
    api.fetchPokemon(pokemonId, "type").then(pokemon => {
      this.setState({
        currentPokemonId: pokemon.id,
        pokemon: {
          ...this.state.pokemon,
          [pokemon.id]: pokemon
        }
      });
    });
  };

  fetchParties = () => {
    pushState(
      { currentPokemonId: null, currentPartyId: null },
      '/'
    );

    api.fetchParties().then(parties => {
      this.setState({
        currentPokemonId: null,
        currentPartyId: null,
        pokemon: null,
        parties
      });
    });
  }

  fetchParty = (partyId) => {
    pushState(
      { currentPartyId: partyId },
      `/parties/${partyId}`
    );
    api.fetchParty(partyId).then(party => {
      this.setState({
        currentPartyId: party.party_id,
        parties: {
          ...this.state.parties,
          [party.party_id]: party
        }
      });
    });
  };

  currentPokemon() {
    return this.state.pokemon[this.state.currentPokemonId];
  }

  currentParty() {
    return this.state.parties[`${this.state.currentPartyId}`];
  }

  pageHeader() {
    if (this.state.currentContestId) {
      return this.currentContest().contestName;
    }

    return this.state.pokemon['1']['name'];
  }

  currentContent() {
    if (this.state.currentPokemonId) {
      return <PokemonPage pokemon={this.currentPokemon()} />;
    } else if (this.state.pokemon) {
      return (
        <PokemonListPage
          onClickPokemon={this.fetchPokemon}
          pokemon={this.state.pokemon}
        />
      );
    } else if (this.state.currentPartyId) {
      return (
        <PartyPage
          onClickAddPokemon={this.addPokemonToParty.bind(this)}
          onClickPokemon={this.fetchPokemon.bind(this)}
          party={this.currentParty()}
        />
      );
    }

    return (
      <PartiesPage
        onClickCreateParty={this.createParty.bind(this)}
        onClickDeleteParty={this.deleteParty.bind(this)}
        onClickParty={this.fetchParty.bind(this)}
        parties={this.state.parties}
      />
    );
  }

  createParty() {
    let partyNumber = 1;
    if (Object.keys(this.state.parties).length > 0) {
      partyNumber = Math.max.apply(
        null,
        Object.keys(this.state.parties).map(x => {
          return x;
        })
      ) + 1;
    }
    api.createParty(partyNumber).then(resp => {
      this.setState({
        parties: {
          ...this.state.parties,
          [resp.party.party_id]: resp.party
        }
      });
    });
  }

  deleteParty = (partyId) => {
    api.deleteParty(partyId).then(parties => {
      this.setState({
        parties
      });
    });
  };


  addPokemonToParty(partyId, pokemonName) {
    api.addPokemonToParty(partyId, pokemonName).then(resp => {
      console.log(resp);
      this.setState({
        currentPartyId: this.state.currentPartyId,
        parties: {
          ...this.state.parties,
          [resp.party_id]: {
            party_id: resp.party_id,
            pokemon: resp.pokemon
          }
        }
      });
    });
  }

  handleClick() {
    this.createParty();
  }

  render() {
    return (
      <div className="App">
        <Header onClickTitle={this.fetchParties} />
        {this.currentContent()}
      </div>
    );
  }
}

export default App;
