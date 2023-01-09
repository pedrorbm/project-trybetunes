import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as userAPI from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    user: '',
    isLoading: true,
  };

  async componentDidMount() {
    const name = await userAPI.getUser();
    this.setState({
      user: name.name,
      isLoading: false,
    });
  }

  render() {
    const { user, isLoading } = this.state;

    return (
      <header data-testid="header-component">
        { isLoading ? <Loading /> : '' }
        <h2 data-testid="header-user-name">{ user }</h2>
        <Link data-testid="link-to-search" to="/search">Pesquisa</Link>
        <br />
        <Link data-testid="link-to-favorites" to="/favorites">Favoritas</Link>
        <br />
        <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
      </header>
    );
  }
}

export default Header;
