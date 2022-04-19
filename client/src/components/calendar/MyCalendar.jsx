import React, { Fragment, useCallback, useMemo, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { makeStyles, Container, Button } from '@material-ui/core';
import moment from 'moment';
import './CalendarStyle.scss';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';


const DragAndDropCalendar = withDragAndDrop(Calendar)
const localizer = momentLocalizer(moment);

const MyCalendar = (props) => {
  const eventList = props.myEvents.flat().map(item => {return item.todoitems}).flat().map(item => {
    const taskCopy = item;
    const startTime = new Date(item.start);
    const endTime = new Date(item.end_date);
    taskCopy.start = startTime;
    taskCopy.end_date = endTime;
    return taskCopy;
  })
  // console.log('eventList', eventList)
  return (
    <DragAndDropCalendar
      className='calendar'
      localizer={localizer}
      defaultView="week"
      events={eventList.filter(event => {return event.in_calendar})}
      startAccessor="start"
      endAccessor="end_date"
      onSelectEvent={(event) => {
        props.changeTitle(event);
      }}
      min={new Date(moment().hour(6).minute(0))}
      max={new Date(moment().hour(23).minute(0))}
      onEventDrop={props.moveEvent}
      onEventResize={props.resizeEvent}
      onDropFromOutside={props.onDropFromOutside}
      style={{ height: 1000 }}
    />
  )
}

export default MyCalendar;