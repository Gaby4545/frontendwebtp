import React from "react";

import axios from "axios";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Nav from 'react-bootstrap/Nav';

export class LoginManager {
  constructor(a) {
    this.a = a;
  }

  isConnected() {
    return localStorage.getItem('user') != null;
  }

  setUser(user) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
    this.a.setState({user: user})
  }

  getUser() {
    return this.user;
  }

  disconnect() {
    this.user = null;
    localStorage.removeItem('user');
    this.a.setState({user: {}})
  }
}

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.register = this.register.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
  }

  register(event) {
    event.preventDefault();

    console.log(this.state.username);

    axios.put("http://localhost:3020/user", {
      "username" : this.state.username, 
      "password" : this.state.password
    }).catch(function (error) {
      console.log(error);
    });
  }

  handleNameChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  handlePassChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  render() {
    if (this.props.manager)
    if (!this.props.manager.isConnected()) {
      return (
      <Jumbotron>
        <h1>Inscrivez vous</h1>
        <Form onSubmit={this.register}>
          <Form.Group>
            <Form.Label>Nom Utilisateur</Form.Label>
            <Form.Control type="username" placeholder="Entrer votre Nom Utilisateur" value={this.state.username} onChange={this.handleNameChange}/>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Mot de Passe</Form.Label>
            <Form.Control type="password" placeholder="Entrer votre Mot de Passe" value={this.state.password} onChange={this.handlePassChange}/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Entrer
          </Button>
        </Form>
      </Jumbotron>
      )
    } 

    return (<h2>Veuillez vous deconnecter</h2>);
  };
}

export class Login extends React.Component {
  constructor(props) {
    super(props);
    //console.log(props);
    this.state = {
      username: '',
      password: ''
    };

    this.register = this.register.bind(this);
    this.thenFunction = this.thenFunction.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
  }

  thenFunction(response) {
    console.log(response.data);

    if (response.data.length > 0) {
      this.props.manager.setUser(response.data[0]);
      //this.history.pushState(null, 'login', "/");
    }
  }

  register(event) {
    event.preventDefault();

    console.log(this.state.username);

    axios.get("http://localhost:3020/user/checkpass/" + this.state.username + "/" + this.state.password).then(this.thenFunction).catch(function (error) {
      console.log(error);
      // Pas la meilleure facon et pas a la meilleure place
      window.alert("Informations de connexion invalides");
    });
  }

  handleNameChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  handlePassChange(event) {
    this.setState({
      password: event.target.value
    });
  }
  

  render() {
    if (this.props.manager)
    if (!this.props.manager.isConnected()) {
      return (
      <Jumbotron>
        <h1>Connectez vous</h1>
        <Form onSubmit={this.register}>
            <Form.Group>
              <Form.Label>Nom Utilisateur</Form.Label>
              <Form.Control type="username" placeholder="Entrer votre Nom Utilisateur"  value={this.state.username} onChange={this.handleNameChange}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Mot de Passe</Form.Label>
              <Form.Control type="password" placeholder="Entrer votre Mot de Passe" value={this.state.password} onChange={this.handlePassChange}/>
            </Form.Group>
            <Button variant="primary" type="submit">
              Entrer
            </Button>
        </Form>
      </Jumbotron>
      )
    } 

    return (<h2>Veuillez vous deconnecter</h2>);
  };
}


export class Logout extends React.Component {
  constructor(props) {
    super(props);

    this.disconnect = this.disconnect.bind(this);
  }

  disconnect() {
    this.props.manager.disconnect();
    
  }

  render() {
    return (
      <Nav.Link onClick={this.disconnect}>Se deconnecter</Nav.Link>
    )
  }
}