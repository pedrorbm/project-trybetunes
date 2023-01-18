import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import * as userAPI from '../services/userAPI';

class Profile extends Component {
  state = {
    user: [],
  };

  async componentDidMount() {
    const apiUser = await userAPI.getUser();
    this.setState({ user: apiUser });
  }

  render() {
    const { user } = this.state;

    return (
      <div data-testid="page-profile">
        <div>
          <Header />
          <img data-testid="profile-image" src={ user.image } alt="Imagem de perfil" />
          <h2>Nome</h2>
          <p>{ user.name }</p>
          <h2>Email</h2>
          <p>{ user.email }</p>
          <h2>Descrição</h2>
          <p>{ user.description }</p>
          <Link to="profile/edit">Editar perfil</Link>
        </div>
      </div>
    );
  }
}

export default Profile;
