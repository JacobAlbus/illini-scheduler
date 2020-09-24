import React, { useState, useEffect } from 'react';
//import { Row, Container, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import Event from './Event';

const AllEvents = ({filteredEvents, selectedDay, setDay}) => {
  const [selectedDayEvents, setDayEvents] = useState([]);
  const [orderedEvents, setOrderedEvents] = useState([]);

  const getSelectedDayEvents = () => {
   setDayEvents(filteredEvents.filter(event => {
      var day = getStartDate(event)[1];
      if(day === selectedDay){
        return{
          ...event
        };
      }
    }));
  }

  const orderSelectedDayEvents = () => {
    var orderedArray = selectedDayEvents;
    var formattedTimes = get24HrTime();

    var length = formattedTimes.length;
    for (let i = 1; i < length; i++) {
      let key = formattedTimes[i];
      let temp = orderedArray[i];
      let j = i - 1;
      while (j >= 0 && formattedTimes[j] > key) {
        formattedTimes[j + 1] = formattedTimes[j];
        orderedArray[j + 1] = orderedArray[j];
        j = j - 1;
      }
      formattedTimes[j + 1] = key;
      orderedArray[j + 1] = temp;
    }
    setOrderedEvents(orderedArray);
  }

  const get24HrTime = () => {
    var time24Hr = [];

    for(var i = 0; i < selectedDayEvents.length; i++){
      var time = getStartTime(selectedDayEvents[i]);
      var hour = parseInt(time.split(":")[0]);

      if(time.split(" ")[1] === "PM" && hour !== 12){
        time24Hr.push(hour + 12);
      } else if(time.split(" ")[1] === "AM" && hour === 12){
        time24Hr.push(hour - 12);
      } else {
        time24Hr.push(hour);
      }
    }
    return time24Hr;
  }

  const getStartTime = (event) => {
    var startTime = getStartDate(event)[2];
    startTime = startTime.split(", ")[1].replace(":00 ", " ");
    return startTime;
  }

  const getEndTime = (event) => {
    var endTime = new Date(event.endTime*1000).toLocaleString().split("/")[2];
    endTime = endTime.split(", ")[1].replace(":00 ", " ");
    return endTime;
  }

  const getStartDate = (event) => {
    var date = new Date(event.startTime*1000).toLocaleString().split("/");
    return date;
  }

  useEffect(() => {
    getSelectedDayEvents();
  }, [filteredEvents, selectedDay]);

  useEffect(() => {
    orderSelectedDayEvents();
  }, [selectedDayEvents]);

  useEffect(() => {

  })

  return(
    <div>
      <h1 onClick={orderSelectedDayEvents} className="date-header">August {selectedDay}th 2021</h1>
      {orderedEvents.map((event) => (
        <Event
          key={event.id}
          title={event.name}
          description={event.description}
          startTime={getStartTime(event)}
          endTime={getEndTime(event)}
          type={event.eventType}
          date={selectedDay}
        />
      ))}
    </div>
        
  );
}

export default AllEvents;