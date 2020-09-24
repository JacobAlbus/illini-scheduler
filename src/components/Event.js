import React from 'react';
import { Row } from 'react-bootstrap';


const Recipe = ({title, description, startTime, endTime}) => {
  return(
    <div className="event mb-2">
      <Row className="ml-1"> 
        <h3>{title}</h3>
        <p className="my-auto time">{startTime} - {endTime}</p>
      </Row>
      <p>{description}</p>
    </div>
  )
}

export default Recipe

