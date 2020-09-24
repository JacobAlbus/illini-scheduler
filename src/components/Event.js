import React from 'react';
import { Row } from 'react-bootstrap';


const Recipe = ({title, description, startTime, endTime, type}) => {
  return(
    <div className="event mb-2">
      <Row className="ml-1"> 
        <h3>{title}</h3>
        <p className="my-auto" id="sub">{startTime} - {endTime}</p>
        <p className="my-auto" id="sub">Type: {type}</p>
      </Row>
      <p>{description}</p>
    </div>
  )
}

export default Recipe

