import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import Loading from './Loading';
import * as favoriteSongsAPI from '../services/favoriteSongsAPI';

class Album extends Component {
  state = {
    artist: '',
    album: '',
    image: '',
    musics: [],
    favorites: [],
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });

    try {
      const { history } = this.props;
      const id = history.location.pathname.replace('/album/', '');
      const requisition = await getMusics(id);
      const favorite = await favoriteSongsAPI.getFavoriteSongs();
      const albumImg = requisition[0].artworkUrl100;

      this.setState({
        artist: requisition[0].artistName,
        album: requisition[0].collectionName,
        image: albumImg,
        musics: requisition.slice(1),
        favorites: favorite,
        isLoading: false,
      });
    } catch {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { artist, album, image, musics, favorites, isLoading } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        { isLoading && <Loading /> }
        <img src={ image } alt="Imagem do álbum" />
        <p data-testid="album-name">{album}</p>
        <p data-testid="artist-name">{artist}</p>
        {
          musics.map((m, i) => (
            <MusicCard
              key={ i }
              arrayMusic={ m }
              arrayFavorites={ favorites }
            />
          ))
        }
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  history: PropTypes.object,

}.isRequired;
