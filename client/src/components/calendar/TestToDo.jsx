import React from 'react';
import Paper from '@mui/material/Paper';
import moment from 'moment';

function TestToDo(props) {
  var test = {
    id: 1,
    title: 'Trip to China',
    description: '5-day business trip to meet with manufacturers',
    duration: '5 days',
    start: new Date(moment('9 Apr 2022 09:30')),
    end: new Date(moment('13 Apr 2022 09:30')),
    category_id: 1,
    inCalendar: false
  }
  return (
    <Paper style={{width: '200px', overflowWrap: 'anywhere'}} onDragStart={() => props.handleDragStart(test)}
    draggable='true'>{JSON.stringify(test, null, ' ')}</Paper>
  )
}

export default TestToDo;