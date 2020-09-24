import React, { useState, useEffect } from 'react';
//import { Row, Container, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import Event from './Event';

const AllEvents = ({filteredEvents, selectedDay, setDay}) => {
  const [selectedDayEvents, setDayEvents] = useState([]);

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

  // TODO: sort event array
  // const orderSelectedDayEvents = () => {
  //   var orderedArray = selectedDayEvents;
  //   var length = orderedArray.length;
  //   for (let i = 1; i < length; i++) {
  //       let key = getStartTime(orderedArray[i];
  //       let j = i - 1;
  //       while (j >= 0 && inputArr[j] > key) {
  //           inputArr[j + 1] = inputArr[j];
  //           j = j - 1;
  //       }
  //       inputArr[j + 1] = key;
  //   }
  //   return inputArr;
  // }

  const getStartTime = (event) => {
    var startDate = getStartDate(event)[2];
    return startDate.split(", ")[1];
  }

  const getEndTime = (event) => {
    var endDate = new Date(event.endTime*1000).toLocaleString().split("/")[2];
    return endDate.split(", ")[1];
  }

  const getStartDate = (event) => {
    var date = new Date(event.startTime*1000).toLocaleString().split("/");
    return date;
  }

  useEffect(() => {
    getSelectedDayEvents();
  }, [filteredEvents, selectedDay]);

  return(
    <div>
      <h1 className="date-header">August {selectedDay}th 2021</h1>
      {selectedDayEvents.map((event) => (
        <Event
          key={event.id}
          title={event.name}
          description={event.description}
          startTime={getStartTime(event)}
          endTime={getEndTime(event)}
          date={selectedDay}
        />
      ))}
    </div>
        
  );
}

export default AllEvents;