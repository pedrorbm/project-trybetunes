import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    search: '',
    name: '',
    albums: [],
    notFoundAlbum: false,
  };

  searchInput = ({ target }) => {
    this.setState({
      search: target.value,
    });
  };

  searchAlbums = async (event) => {
    event.preventDefault();
    const { search } = this.state;
    const result = await searchAlbumsAPI(search);

    this.setState({
      search: '',
      name: search,
      albums: result,
      notFoundAlbum: result.length < 1,
    });
  };

  render() {
    const { search, albums, notFoundAlbum, name } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            onChange={ this.searchInput }
            value={ search }
          />
          <button
            data-testid="search-artist-button"
            type="submit"
            disabled={ search.length < 2 }
            onClick={ this.searchAlbums }
          >
            Pesquisar

          </button>
        </form>
        { notFoundAlbum ? <p>Nenhum álbum foi encontrado</p> : '' }
        { albums.length >= 1 ? <p>{ `Resultado de álbuns de: ${name}` }</p> : '' }
        {
          albums.map((e) => (
            <div key={ e.collectionId }>
              <img src={ e.artworkUrl100 } alt="Imagem do albúm" />
              <p>{ `Albúm: ${e.collectionName}` }</p>
              <p>{ `Nome do artista: ${e.artistName}` }</p>
              <Link
                data-testid={ `link-to-album-${e.collectionId}` }
                to={ `/album/${e.collectionId}` }
              >
                Acessar

              </Link>
            </div>
          ))
        }
      </div>
    );
  }
}

export default Search;
