import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import * as userAPI from '../services/userAPI';
import Loading from '../components/Loading';
import perfil from '../images/perfil.png';

class Profile extends Component {
  state = {
    user: [],
    imgUser: perfil,
    descriptionUser: `Lorem Ipsum is simply dummy text of the 
      printing and typesetting industry. Lorem Ipsum has been 
      the industrys standard dummy text ever since the 1500s, 
      when an unknown printer took a galley of type and scrambled 
      it to make a type specimen book. It has survived not only five 
      centuries, but also the leap into electronic typesetting, 
      remaining essentially unchanged.`,
    emailUser: 'exemplo@exemplo.com',
    isLoading: true,
  };

  async componentDidMount() {
    const apiUser = await userAPI.getUser();
    this.setState({ user: apiUser, isLoading: false });
  }

  render() {
    const { user, imgUser, emailUser, descriptionUser, isLoading } = this.state;
    if (isLoading) {
      return <Loading />;
    }

    return (
      <div data-testid="page-profile" className="containerProfile">
        <Header />
        <div className="containerSubProfile">
          <div className="containerImgPerfil">
            <img
              className="imgProfile"
              data-testid="profile-image"
              src={ user.image === '' ? imgUser : user.image }
              alt="Imagem de perfil"
            />
          </div>
          <div className="userInformation">
            <div>
              <h2>Nome</h2>
              <p>{ user.name }</p>
            </div>
            <div>
              <h2>Email</h2>
              <p>{ user.email === '' ? emailUser : user.email }</p>
            </div>
            <div className="containerDescription">
              <h2>Descrição</h2>
              <p
                className="description"
              >
                { user.description === '' ? descriptionUser : user.description }

              </p>
            </div>
            <button
              className="btnProfile"
              type="button"
            >
              <Link
                className="linkProfile"
                to="profile/edit"
              >
                EDITAR PERFIL

              </Link>

            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
