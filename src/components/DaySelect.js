import React from 'react';

const DaySelect = ({setDay}) => {

  const getDay = (e) =>{
    setDay(e.target.value);
  }

  return(
    <div>
      <select onChange={getDay} className="green-background">
        <option value="7">August 7th</option>
        <option value="8">August 8th</option>
        <option value="9">August 9th</option>
        <option value="10">August 10th</option>
        <option value="11">August 11th</option>
        <option value="12">August 12th</option>
        <option value="13">August 13th</option>
        <option value="14">August 14th</option>
        <option value="15">August 15th</option>
      </select>
    </div>
  );
}

export default DaySelect;