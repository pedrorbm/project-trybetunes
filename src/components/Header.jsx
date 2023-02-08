import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as userAPI from '../services/userAPI';
import logo from '../images/logoTunes.png';
import perfil from '../images/perfil.png';
import lupaIcon from '../images/lupaIcon.png';
import favoritesIcon from '../images/favoritesIcon.png';
import perfilIcon from '../images/perfilIcon.png';

class Header extends Component {
  state = {
    user: '',
    image: '',
  };

  async componentDidMount() {
    const user = await userAPI.getUser();
    this.setState({
      user: user.name,
      image: user.image,
    });
  }

  clickMenu = () => {
    const menu = document.querySelector('.headerContainer');
    if (menu.style.display === 'none') {
      menu.style.display = 'block';
    } else {
      menu.style.display = 'none';
    }
  };

  render() {
    const { user, image } = this.state;

    return (
      <header data-testid="header-component">
        <div className="logoHeader">
          <img className="imgLogo" src={ logo } alt="Imagem do logotipo" />
          <div
            role="button"
            onClick={ this.clickMenu }
            onKeyPress={ () => {} }
            tabIndex="0"
          >
            <i className="material-icons">menu</i>
          </div>
        </div>
        <div className="headerContainer">
          <div className="linksContainer">
            <img className="iconsHeader" src={ lupaIcon } alt="ícone da lupa" />
            <Link
              className="link"
              data-testid="link-to-search"
              to="/search"
            >
              <h3>Pesquisa</h3>
            </Link>
          </div>
          <div className="linksContainer">
            <img className="iconsHeader" src={ favoritesIcon } alt="ícone de favoritos" />
            <Link
              className="link"
              data-testid="link-to-favorites"
              to="/favorites"
            >
              <h3>Favoritas</h3>

            </Link>
          </div>
          <div className="linksContainer">
            <img className="iconsHeader" src={ perfilIcon } alt="ícone de perfil" />
            <Link
              className="link"
              data-testid="link-to-profile"
              to="/profile"
            >
              <h3>Perfil</h3>

            </Link>
          </div>
          <div className="user">
            <img
              className="imgPerfil"
              src={ image === '' ? perfil : image }
              alt="imagem de perfil"
            />
            <h2 data-testid="header-user-name">{ user }</h2>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
