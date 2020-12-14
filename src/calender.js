import React from "react";

import axios from "axios";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';


// Calendrier
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

export default class Calendrier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: {},

      newEvent: {title: '', start: '', end: ''},
    }
    
    if (this.props.manager.isConnected()){
      this.user = {};
      this.user = JSON.parse(localStorage.getItem('user'));
      console.log(this.user);

      this.updateCalender();
    }
    
    
    this.addEvent = this.addEvent.bind(this);
    this.dataToSend = this.dataToSend.bind(this);
    this.eventClick = this.eventClick.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
  }

  updateCalender() {
    fetch(`http://localhost:3020/events/` + this.user.id).then(response => response.json()).then(data => {
        console.log(data);
        this.setState({ events: data });
        //this.calender = <FullCalendar ref={this.calendarRef} plugins={[ dayGridPlugin ]} initialView="dayGridMonth" events={data}/>;
      });
  }

  dataToSend() {
    
    return {
      "userid" : this.user.id,
      "title" : this.state.newEvent.title,
      "start" : this.state.newEvent.start,
      "end" : this.state.newEvent.end
    }
  }

  addEvent(event) {
    event.preventDefault();

    console.log(this.dataToSend());

    axios.put("http://localhost:3020/event", this.dataToSend()).then(() => {

      //this.setState({events: [...this.state.events, this.state.newEvent]});
      this.updateCalender();

      alert("Evenement rajouter");

    }).catch(function (error) {
      console.log(error);
    });
  }

  eventClick(info) {
    axios.delete("http://localhost:3020/event/" + info.event.id).then(() => {
      this.updateCalender();

      alert("Evenement : " + info.event.title + " suprime");
    }).catch(function (error) {
      console.log(error);
    });


  }

  handleTitleChange(event) {
    this.setState({
      newEvent: {title: event.target.value, start: this.state.newEvent.start, end: this.state.newEvent.end}
    });
  }

  handleStartChange(event) {
    this.setState({
      newEvent: {title: this.state.newEvent.title, start: event.target.value, end: this.state.newEvent.end}
    });
  }

  handleEndChange(event) {
    this.setState({
      newEvent: {title: this.state.newEvent.title, start: this.state.newEvent.start, end: event.target.value}
    });
  }
  

  render() {
    if (this.props.manager)
    if (this.props.manager.isConnected()) {
      return (
        <div>
          <Jumbotron>
            <h2>Ajouter Event</h2>
          <Form onSubmit={this.addEvent}>
            <Form.Group>
              <Form.Label>Titre</Form.Label>
              <Form.Control type="username" placeholder="Titre" value={this.state.newEvent.title} onChange={this.handleTitleChange}/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Debut</Form.Label>
              <Form.Control type="date" placeholder="Debut" value={this.state.password} onChange={this.handleStartChange}/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Fin</Form.Label>
              <Form.Control type="date" placeholder="Fin" value={this.state.password} onChange={this.handleEndChange}/>
            </Form.Group>

            <Button variant="primary" type="submit">
              Entrer
            </Button>
          </Form>
          </Jumbotron>
          <FullCalendar plugins={[ dayGridPlugin ]} initialView="dayGridMonth" events={this.state.events} eventClick={this.eventClick}/>;
        </div>
      );
    }

    return (<h2>Veuillez vous connecter</h2>)
  }
}

export class Event extends React.Component {

}