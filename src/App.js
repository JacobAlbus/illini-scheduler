import React, { useEffect, useState } from 'react';
import AllEvents from './components/AllEvents';
import FilterBar from './components/FilterBar';
import DaySelect from './components/DaySelect';
import { Row, Container, Col } from 'react-bootstrap';
import './App.css';

const App = () => {
  const [eventFilters, setEventFilters] = useState(["OTHER", "WORKSHOP", "MEAL", "SPEAKER", "MINIEVENT"]);
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedDay, setDay] = useState("7");

  useEffect(() => {
    getAllEvents();
  }, []);

  useEffect(() => {
    getFilteredEvents();
  }, [allEvents]);

  useEffect(() => {
    getFilteredEvents();
  }, [eventFilters]);

  const getAllEvents = async () => {
    const response = await fetch(`https://api.hackillinois.org/event/`);
    const data = await response.json();
    setAllEvents(data.events);
  }

  const getFilteredEvents = () => {
    setFilteredEvents(allEvents.filter(event => {
      if(eventFilters.includes(event.eventType)){
        return {...event}
      }
    }));
  }

  return (
    <div className="App">
      <Container fluid>
        <div className="">
          <h1>2021 HackIllinois Schedule</h1>
        </div>
        <Row className="schedule-body">
          <Col lg="3" className="event-setters"> 
            <FilterBar eventFilters={eventFilters} setEventFilters={setEventFilters}/>
            <DaySelect setDay={setDay}/> 
          </Col>
          <Col className="rounded-corners"> 
            <AllEvents filteredEvents={filteredEvents} selectedDay={selectedDay} setDay={setDay}/> 
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default App;
