import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import uuid from 'uuid';

class AddContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };

  onSubmit = (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;

    if (name === '') {
      this.setState({ errors: { name: 'Имя обязательно' } });
      return;
    }
    if (name.length < 3 || name.length > 30) {
      this.setState({
        errors: { name: 'Имя должно иметь длину от 3х до 30ти символов' }
      });
      return;
    }
    if (email === '') {
      this.setState({ errors: { email: 'Email обязателен' } });
      return;
    }
    if (phone === '') {
      this.setState({ errors: { phone: 'Телефон обязателен' } });
      return;
    }
    if (phone.length !== 11 && typeof phone) {
      this.setState({ errors: { phone: 'Телефон должен иметь 11 цифр' } });
      return;
    }

    const newContact = {
      id: uuid(),
      name,
      email,
      phone
    };

    dispatch({ type: 'ADD_CONTACT', payload: newContact });

    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {}
    });

    this.props.history.push('/');
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <React.Fragment>
              <h1 className="display-5 mb-2">
                <span className="text-danger">Добавить</span> Контакт
              </h1>
              <div className="card mb-3">
                <div className="card-body">
                  <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                    <TextInputGroup
                      label="Имя"
                      name="name"
                      placeholder="Введите имя..."
                      value={name}
                      onChange={this.onChange}
                      error={errors.name}
                    />
                    <TextInputGroup
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="Введите email..."
                      value={email}
                      onChange={this.onChange}
                      error={errors.email}
                    />
                    <TextInputGroup
                      label="Телефон"
                      name="phone"
                      placeholder="Введите номер телефона..."
                      value={phone}
                      onChange={this.onChange}
                      error={errors.phone}
                    />
                    <input
                      type="submit"
                      value="Добавить контакт"
                      className="btn btn-block btn-light"
                    />
                  </form>
                </div>
              </div>
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
