import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './common/input';

class LoginForm extends Component {
  state = {
    account: { username: '', password: '' },
    errors: {}
  }

  schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password')
  }

  validate = () => {
    const options = { abortEarly: false }
    const { error } = Joi.validate(this.state.account, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details)
      errors[item.path[0]] = item.message;
    
    return errors;
  }

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate()
    this.setState({ errors: errors || {} });

    if (errors) return;
  };

  handleChange = ({ currentTarget: input}) => {
    const errors = {...this.state.errors};
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = {...this.state.account};
    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  validateProperty = ({ name, value}) => {
    if (name === 'username'){
      if (value.trim() === '') return 'Username is required.';

    }

    if (name === 'password'){
      if (value.trim() === '') return 'Password is required.';

    }
  }

  render() { 
    const { account, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={account.user}
            onChange={this.handleChange}
            error={errors.username}
            label="Username"
          />
          <Input
            name="password"
            value={account.password}
            onChange={this.handleChange}
            type="password"
            error={errors.password}
            label="Password"
            
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}
 
export default LoginForm;