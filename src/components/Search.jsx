import React, { Component } from 'react';
import Header from './Header';

class Search extends Component {
  state = {
    search: '',
  };

  searchInput = ({ target }) => {
    this.setState({
      search: target.value,
    });
  };

  render() {
    const { search } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            onChange={ this.searchInput }
          />
          <button
            data-testid="search-artist-button"
            type="submit"
            disabled={ search.length < 2 }
          >
            Pesquisar

          </button>
        </form>
      </div>
    );
  }
}

export default Search;
