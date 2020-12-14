import React from "react";

import Home from "./home";
import {LoginManager, Login, Logout, Register} from "./login"
import Calendrier from "./calender";

// Routing
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// BootStrap
//import 'bootstrap/dist/css/bootstrap.min.css'; // CSS
//import 'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Jumbotron from 'react-bootstrap/Jumbotron';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };

    this.loginManager = new LoginManager(this);
  }
  
  

  render() {

    if (!this.loginManager.isConnected()) {
      this.login = (<Nav className="mr-auto">
        <Nav.Link href="/login">Se connecter</Nav.Link>
        <Nav.Link href="/register">S'inscrire</Nav.Link>
      </Nav>);
    } else {
      this.login = (<span>{localStorage.getItem('user').name} <Logout manager={this.loginManager}/></span>)
    }

    return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Travail Pratique 2</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="mr-auto">
            <Nav.Link href="/">Accueil</Nav.Link>
            <Nav.Link href="/about">A propos</Nav.Link>
            <Nav.Link href="/calender">Calendrier</Nav.Link>
          </Nav>

          {this.login}
          
        </Navbar.Collapse>
      </Navbar>

      <link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
  integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
  crossorigin="anonymous"
/>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/calender">
          <Calendrier manager={this.loginManager}/>
        </Route>
        <Route path="/login">
          <Login manager={this.loginManager}/>
        </Route>
        <Route path="/register">
          <Register manager={this.loginManager}/>
        </Route>
      </Switch>
    </Router>
    );
  }
}

function About() {
  return (
    <Jumbotron>
      <div>
        <h2>A propos</h2>
        <p>Fait par Gabriel Brassard</p>
      </div>
    </Jumbotron>
  );
}