import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicList extends Component {
  render() {
    const { arrayMusic, arrayFavorites, handleClick } = this.props;

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
          onClick={ handleClick }
        />
        <label
          data-testid={ `checkbox-music-${arrayMusic.trackId}` }
          htmlFor={ arrayMusic.trackId }
        />
      </div>
    );
  }
}

export default MusicList;

MusicList.propTypes = {
  arrayMusic: PropTypes.array,
}.isRequired;
