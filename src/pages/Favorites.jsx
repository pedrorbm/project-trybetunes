import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import * as favoriteSongsAPI from '../services/favoriteSongsAPI';
import MusicList from '../components/MusicList';

class Favorites extends Component {
  state = {
    favorites: [],
    isLoading: false,
  };

  async componentDidMount() {
    await this.updateFunc();
  }

  updateFunc = async () => {
    this.setState({ isLoading: true });

    try {
      const api = await favoriteSongsAPI.getFavoriteSongs();

      this.setState({
        favorites: api,
        isLoading: false,
      });
    } catch {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { favorites, isLoading } = this.state;
    if (isLoading) {
      return <Loading />;
    }

    return (
      <div className="containerFavorites" data-testid="page-favorites">
        <Header />
        <div className="musicsFavorites">
          <div className="textMusicsFavorites">
            <h2>Músicas Favoritas</h2>
          </div>
          <div className="renderMusicsFavorites">
            { this.updateFunc }
            {
              favorites
                .map((m, i) => (<MusicList
                  key={ i }
                  arrayMusic={ m }
                  arrayFavorites={ favorites }
                  handleClick={ async ({ target }) => {
                    if (target.checked === true) {
                      await favoriteSongsAPI.addSong(m);
                    } else {
                      await favoriteSongsAPI.removeSong(m);
                      this.updateFunc();
                    }
                  } }
                />))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Favorites;
