import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as favoriteSongsAPI from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    isLoading: false,
  };

  handleClick = async () => {
    const { arrayMusic } = this.props;

    this.setState({
      isLoading: true,
    });

    try {
      await favoriteSongsAPI.addSong(arrayMusic);
      this.setState({
        isLoading: false,
      });
    } catch {
      this.setState({
        isLoading: false,
      });
    }
  };

  render() {
    const { arrayMusic } = this.props;
    const { isLoading } = this.state;

    return (
      <div>
        <p>{ arrayMusic.trackName }</p>
        <audio data-testid="audio-component" src={ arrayMusic.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label
          data-testid={ `checkbox-music-${arrayMusic.trackId}` }
          htmlFor={ arrayMusic.trackId }
        >
          <input
            type="checkbox"
            name="favorite"
            id={ arrayMusic.trackId }
            onClick={ this.handleClick }
          />
          Favorita
        </label>
        { isLoading ? <Loading /> : undefined }
      </div>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  arrayMusic: PropTypes.array,
}.isRequired;
