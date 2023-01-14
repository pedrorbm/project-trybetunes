import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends Component {
  state = {
    artist: '',
    album: '',
    image: '',
    musics: [],
  };

  async componentDidMount() {
    const { history } = this.props;
    const id = history.location.pathname.replace('/album/', '');
    const requisition = await getMusics(id);
    const albumImg = requisition[0].artworkUrl100;

    this.setState({
      artist: requisition[0].artistName,
      album: requisition[0].collectionName,
      image: albumImg,
      musics: requisition.slice(1),
    });
  }

  render() {
    const { artist, album, image, musics } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <img src={ image } alt="Imagem do álbum" />
        <p data-testid="album-name">{album}</p>
        <p data-testid="artist-name">{artist}</p>
        { musics.map((m, i) => <MusicCard key={ i } arrayMusic={ m } />) }
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  history: PropTypes.object,

}.isRequired;
