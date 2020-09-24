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
  
  // // TODO: sort event array
  // const orderFilteredEvents = () => {
  //   var orderedArray = filteredEvents;
  //   var formattedTimes = get24HrTime();
  
  //   var length = formattedTimes.length;
  //   for (let i = 1; i < length; i++) {
  //       let key = formattedTimes[i];
  //       let temp = orderedArray[i];
  //       let j = i - 1;
  //       while (j >= 0 && formattedTimes[j] > key) {
  //           formattedTimes[j + 1] = formattedTimes[j];
  //           orderedArray[j + 1] = orderedArray[j];
  //           j = j - 1;
  //       }
  //       formattedTimes[j + 1] = key;
  //       orderedArray[j + 1] = temp;
  //   }
  //   return orderedArray;
  // }

  // const get24HrTime = () => {
  //   var time24Hr = [];

  //   for(var i = 0; i < filteredEvents.length; i++){
  //     var time = new Date(filteredEvents[i].startTime*1000).toLocaleString().split("/")[2];
  //     time = time.split(", ")[1].replace(":00 ", " ");
  //     var hour = parseInt(time.split(":")[0]);

  //     if(time.split(" ")[1] === "PM" && hour !== 12){
  //       time24Hr.push(hour + 12);
  //     } else if(time.split(" ")[1] === "AM" && hour === 12){
  //       time24Hr.push(hour - 12);
  //     } else {
  //       time24Hr.push(hour);
  //     }
  //   }
  //   return time24Hr;
  // }

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
