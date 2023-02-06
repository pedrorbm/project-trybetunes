import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import LoadingMinor from '../components/LoadingMinor';

class Search extends Component {
  state = {
    search: '',
    name: '',
    albums: [],
    notFoundAlbum: false,
    isLoading: false,
  };

  searchInput = ({ target }) => {
    this.setState({
      search: target.value,
    });
  };

  searchAlbums = async (event) => {
    event.preventDefault();

    this.setState({ albums: [], isLoading: true });

    const { search } = this.state;

    try {
      const result = await searchAlbumsAPI(search);

      this.setState({
        search: '',
        name: search,
        albums: result,
        notFoundAlbum: result.length < 1,
        isLoading: false,
      });
    } catch {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { search, albums, notFoundAlbum, name, isLoading } = this.state;

    return (
      <div className="containerSearch" data-testid="page-search">
        <Header />
        <div className="containerSearchResult">
          <form className="formSearch">
            <input
              className="inputSearch"
              data-testid="search-artist-input"
              placeholder="DIGITE A SUA PESQUISA"
              type="text"
              onChange={ this.searchInput }
              value={ search }
            />
            <button
              className="btnSearch"
              data-testid="search-artist-button"
              type="submit"
              disabled={ search.length < 2 }
              onClick={ this.searchAlbums }
            >
              <h4>PROCURAR</h4>

            </button>
          </form>
          <div className="renderMusic">
            <div className="phraseResult">
              {notFoundAlbum
                ? <h1 className="resultAlbum">Nenhum álbum foi encontrado</h1> : ''}
              {
                albums.length >= 1 && (
                  <h1 className="resultAlbum">
                    {`Resultados de álbuns do Artista: ${name}`}
                  </h1>)
              }
            </div>
            <div className="results">
              { isLoading && <LoadingMinor /> }
              {
                albums.map((e) => (
                  <div key={ e.collectionId } className="cardMusic">
                    <img
                      className="imgCard"
                      src={ e.artworkUrl100 }
                      alt="Imagem do albúm"
                    />
                    <p className="albumName">
                      <strong>Albúm:</strong>
                      {' '}
                      {e.collectionName}
                    </p>
                    <p>
                      <strong>Nome do artista:</strong>
                      {' '}
                      {e.artistName}
                    </p>
                    <button type="button" className="btnAcess">
                      <Link
                        className="linkAcess"
                        data-testid={ `link-to-album-${e.collectionId}` }
                        to={ `/album/${e.collectionId}` }
                      >
                        <strong>ACESSAR</strong>

                      </Link>
                    </button>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
