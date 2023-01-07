import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as userAPI from '../services/userAPI';

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

    return (
      <div data-testid="page-login">
        <h1>LOGIN</h1>
        <input data-testid="login-name-input" type="text" onChange={ this.handleName } />
        <button
          data-testid="login-submit-button"
          type="submit"
          disabled={ inputName.length < numberThree }
          onClick={ this.handleSubmit }
        >
          Entrar

        </button>
        { isLoading ? <h1>Carregando...</h1> : '' }
      </div>
    );
  }
}

export default Login;

Login.propTypes = {
  history: PropTypes.object,
}.isRequired;
