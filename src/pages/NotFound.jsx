import React, { Component } from 'react';
import error from '../images/error.png';

class NotFound extends Component {
  render() {
    return (
      <div className="errorPage" data-testid="page-not-found">
        <img className="errorImg" src={ error } alt="Imagem de erro" />
        <h1>ERROR 404: PÁGINA NÃO ENCONTRADA</h1>
      </div>
    );
  }
}

export default NotFound;
