/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as favoriteSongsAPI from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  handleClick = async ({ target }) => {
    const { arrayMusic } = this.props;

    if (target.checked === true) {
      await favoriteSongsAPI.addSong(arrayMusic);
    } else {
      await favoriteSongsAPI.removeSong(arrayMusic);
    }
  };

  render() {
    const { arrayMusic, arrayFavorites } = this.props;

    return (
      <div className="musicCardFlex">
        <p>{arrayMusic.trackName}</p>
        <audio data-testid="audio-component" src={ arrayMusic.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <input
          type="checkbox"
          name="favorite"
          id={ arrayMusic.trackId }
          defaultChecked={ arrayFavorites
            .some((e) => e.trackId === arrayMusic.trackId) }
          onClick={ this.handleClick }
        />
        <label
          data-testid={ `checkbox-music-${arrayMusic.trackId}` }
          htmlFor={ arrayMusic.trackId }
        />
      </div>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  arrayMusic: PropTypes.array,
}.isRequired;
