import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import * as userAPI from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends Component {
  state = {
    user: [],
    namee: '',
    emaill: '',
    imagee: '',
    descriptionn: '',
    save: true,
    isLoading: true,
  };

  async componentDidMount() {
    const apiUser = await userAPI.getUser();
    this.setState({ user: apiUser, isLoading: false });
  }

  handleChange = ({ target }) => {
    const min = 2;
    this.setState({
      [target.name]: target.value,
    }, () => {
      const { namee, emaill, descriptionn, imagee } = this.state;
      this.setState({
        save: (namee.length < min || emaill.length < min
          || descriptionn.length < min || imagee.length < min),
      });
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const { namee, emaill, descriptionn, imagee } = this.state;
    const obj = {
      name: namee,
      email: emaill,
      image: imagee,
      description: descriptionn,
    };

    await userAPI.updateUser(obj);
    const { history } = this.props;
    return history.push('/profile');
  };

  render() {
    const { user } = this.state;
    const { save, isLoading } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        <form>
          <img src={ user.image } alt="Imagem de perfil" />
          <input
            data-testid="edit-input-image"
            type="url"
            name="imagee"
            placeholder="Insira o link da imagem"
            onChange={ this.handleChange }
          />
          <br />
          <h2>Nome</h2>
          <input
            data-testid="edit-input-name"
            type="text"
            name="namee"
            placeholder="Edite seu nome"
            onChange={ this.handleChange }
          />
          <br />
          <h2>Email</h2>
          <input
            data-testid="edit-input-email"
            type="text"
            name="emaill"
            placeholder="Edite seu email"
            onChange={ this.handleChange }
          />
          <br />
          <h2>Descrição</h2>
          <textarea
            data-testid="edit-input-description"
            name="descriptionn"
            cols="30"
            rows="10"
            placeholder="Edite sua descrição"
            onChange={ this.handleChange }
          />
          <br />
          <button
            data-testid="edit-button-save"
            type="submit"
            onClick={ this.handleSubmit }
            disabled={ save }
          >
            Salvar

          </button>
        </form>
        { isLoading && <Loading /> }
      </div>
    );
  }
}

export default ProfileEdit;

ProfileEdit.propTypes = {
  history: PropTypes.object,
}.isRequired;
