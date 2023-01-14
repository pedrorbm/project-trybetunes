import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { arrayMusic } = this.props;

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
      </div>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  arrayMusic: PropTypes.array,
}.isRequired;
