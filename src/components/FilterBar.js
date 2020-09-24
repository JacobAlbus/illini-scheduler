import React from 'react';
import { Row, Container, Col } from 'react-bootstrap';

const FilterBar = ( {eventFilters, setEventFilters} ) => {

  const eventFilterHandler = (e) => {
    var passedFilter = e.target.value;
    e.target.style.textDecoration = e.target.style.textDecoration === "line-through" ? "" : "line-through";

    if (eventFilters.includes(passedFilter)) {
      setEventFilters(
        eventFilters.filter(item => item !== passedFilter)
      );
    } else {
      setEventFilters(eventFilters.concat(passedFilter));
    }
  };

  const addAllEvents = () => {
    const allFilters = ["WORKSHOP", "MINIEVENT", "SPEAKER", "MEAL", "OTHER"];
    var eventFiltersHasAllFilters = true;
    
    for(var i = 0; i < allFilters.length; i++){
      if(!eventFilters.includes(allFilters[i])){
        eventFiltersHasAllFilters = false;
      }
    }

    if(!eventFiltersHasAllFilters){
      setEventFilters(allFilters);
    } else {
      setEventFilters([]);
    }
  }

  return(
    <div className="row-fluid" >
      <Container fluid >
        <Row className="justify-content-md-center mb-2 mt-2">
          <Col onClick={addAllEvents}> <button className="green-background" value="ALL"> All </button> </Col>   
          <Col onClick={eventFilterHandler}> <button className="green-background" value="WORKSHOP"> Workshop </button> </Col>        
          <Col onClick={eventFilterHandler}> <button className="green-background" value="MINIEVENT"> Minievent </button> </Col>        
        </Row>
        <Row className="justify-content-md-center mb-2">  
          <Col onClick={eventFilterHandler}> <button className="green-background" value="SPEAKER"> Speaker </button></Col>
          <Col onClick={eventFilterHandler}> <button className="green-background" value="MEAL"> Meal </button> </Col>
          <Col onClick={eventFilterHandler}> <button className="green-background" value="OTHER"> Other </button> </Col>     
        </Row>
      </Container>
    </div>
  );
}

export default FilterBar;