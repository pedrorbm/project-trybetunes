import React, { Component } from 'react';
import loadingSpin from '../images/loadingSpin.svg';

class Loading extends Component {
  render() {
    return (
      <div className="containerLoading">
        <img className="loadingSpin" src={ loadingSpin } alt="imagem carregando" />
      </div>
    );
  }
}

export default Loading;
