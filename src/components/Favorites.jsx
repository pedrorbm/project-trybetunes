import React, { Component } from 'react';
import Header from './Header';
import MusicCard from './MusicCard';
import Loading from './Loading';
import * as favoriteSongsAPI from '../services/favoriteSongsAPI';

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
      console.log(api);

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

    return (
      <div data-testid="page-favorites">
        <Header />
        { isLoading && <Loading /> }
        {
          favorites
            .map((m, i) => (<MusicCard
              key={ i }
              arrayMusic={ m }
              arrayFavorites={ favorites }
            />))
        }
      </div>
    );
  }
}

export default Favorites;
