import React, { Component } from 'react';
import loadingSpin from '../images/loadingSpin.svg';

class LoadingMinor extends Component {
  render() {
    return (
      <div className="containerLoadingMinor">
        <img className="loadingSpinMinor" src={ loadingSpin } alt="imagem carregando" />
      </div>
    );
  }
}

export default LoadingMinor;
