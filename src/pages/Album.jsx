import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
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
    if (isLoading) {
      return <Loading />;
    }

    return (
      <div className="containerAlbum" data-testid="page-album">
        <Header />
        <div className="containerImageMusic">
          <div className="imageAlbum">
            <img className="imgAlbumPosition" src={ image } alt="Imagem do álbum" />
            <div>
              <h2 data-testid="album-name">{ album }</h2>
              <p data-testid="artist-name">{ artist }</p>
            </div>
          </div>
          <div className="musics">
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
        </div>
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  history: PropTypes.object,

}.isRequired;
