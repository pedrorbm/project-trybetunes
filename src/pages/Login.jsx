import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as userAPI from '../services/userAPI';
import Loading from '../components/Loading';
import logo from '../images/logoTunes.png';

class Login extends Component {
  state = {
    inputName: '',
    isLoading: false,
  };

  handleName = ({ target }) => {
    this.setState({
      inputName: target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { inputName } = this.state;
    const { history } = this.props;

    this.setState({
      isLoading: true,
    });

    await userAPI.createUser({ name: inputName });
    history.push('/search');
  };

  render() {
    const { inputName, isLoading } = this.state;
    const numberThree = 3;
    if (isLoading) {
      return <Loading />;
    }

    return (
      <div data-testid="page-login" className="loginContainer">
        <div className="loginPage">
          <div className="logoContainer">
            <img className="logoImg" src={ logo } alt="imagem do logotipo" />
          </div>
          <div className="inputConatiner">
            <input
              className="inputLogin"
              data-testid="login-name-input"
              type="text"
              placeholder="Insira seu nome"
              onChange={ this.handleName }
            />
          </div>
          <div className="btnContainer">
            <button
              className="btnLogin"
              data-testid="login-submit-button"
              type="submit"
              disabled={ inputName.length < numberThree }
              onClick={ this.handleSubmit }
            >
              Entrar

            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

Login.propTypes = {
  history: PropTypes.object,
}.isRequired;
