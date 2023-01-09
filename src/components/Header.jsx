import React, { Component } from 'react';
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
        Header
      </header>
    );
  }
}

export default Header;
