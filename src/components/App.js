import React from 'react';
import Header from './Header';
import ContestList from './ContestList';
import Contest from './Contest';
import * as api from '../api';
import PartiesPage from './PartiesPage/PartiesPage';
import Pokemon from './Pokemon';
import PokemonList from './PokemonList';

const pushState = (obj, url) =>
  window.history.pushState(obj, '', url);

const onPopState = handler => {
  window.onpopstate = handler;
};

class App extends React.Component {
  static propTypes = {
    initialData: React.PropTypes.object.isRequired,
    pokemon: React.PropTypes.object
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
    api.fetchPokemon(pokemonId).then(pokemon => {
      this.setState({
        currentPokemonId: pokemon.id,
        pokemon: {
          ...this.state.pokemon,
          [pokemon.id]: pokemon
        }
      });
    });
  };
  currentPokemon() {
    return this.state.pokemon[this.state.currentPokemonId];
  }
  pageHeader() {
    if (this.state.currentContestId) {
      return this.currentContest().contestName;
    }

    return this.state.pokemon['1']['name'];
  }
  currentContent() {
    if (this.state.currentPokemonId) {
      return <Pokemon
               {...this.currentPokemon()} />;
    } else if (this.state.pokemon) {
      return <PokemonList
              onPokemonClick={this.fetchPokemon}
              pokemon={this.state.pokemon} />;
    } else if (this.state.currentPartyId) {
      return <h1>{this.state.currentPartyId}</h1>;
    }

    return <PartiesPage />;
  }
  render() {
    return (
      <div className="App">
        <Header message="Pokemon" />
        {this.currentContent()}
        {/*<PokemonList pokemon={this.state.pokemon} />*/}
      </div>
    );
  }
}

export default App;
