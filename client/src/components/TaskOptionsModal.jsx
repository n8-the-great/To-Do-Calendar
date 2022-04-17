// import {React, useState} from 'react';
import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { Button, TextField, Modal, Stack, InputLabel, Select, MenuItem, Container, makeStyles } from '@material-ui/core';

import { format } from 'date-fns';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';

const useStyles = makeStyles({
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'white',
    boxShadow: 24,
    display: 'inline-block',
    borderRadius: '15px',
    padding: '1rem'
  },
  input: {
    width: '90%',
    margin: '1rem'
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: '0.5rem 0 0 0'
  },
  done: {
    margin: '0.5rem 0.5rem 0.5rem 0rem'
  },
  addTo: {
    backgroundColor: '#1976d2',
    color: 'white',
    margin: '0.5rem'
  },
  delete: {
    backgroundColor: 'red',
    color: 'white',
    margin: '0.5rem'
  }
});

description: "Discuss A"
duration: "01:00:00"
end_date: "2022-04-15T10:30:20"
in_calendar: false
item_id: 1
start: "2022-04-15T09:30:20"
title: "meeting with A"

var TaskOptionsModal = (props) => {
  const [todoTitle, setTodoTitle] = useState(props.task.title);
  const [todoDescription, setTodoDescription] = useState(props.task.description);
  const [startTime, setStartTime] = useState(props.task.start);
  const [endTime, setEndTime] = useState(props.task.end_date);

  const classes = useStyles();

  const handleEditDone = () => {
    var todoToUpdate = {
      title: todoTitle,
      description: todoDescription,
      start: startTime,
      end_date: endTime
    };
    props.updateTodo(todoToUpdate);
    props.setModalOpen(false);
  }

  const handleTodoDelete = () => {
    props.deleteTodo(props.task);
    props.setModalOpen(false);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Modal open={props.modalOpen} onClose={() => props.setModalOpen(false)}>
        <Container className={classes.modal}>
          <TextField label="Title" className={classes.input} defaultValue={props.task.title} onChange={(newValue) => setTodoTitle(newValue)} />
          <TextField multiline label="Description" className={classes.input} defaultValue={props.task.description} onChange={(newValue) => setTodoDescription(newValue)}/>
          <DesktopDateTimePicker renderInput={(props) => <TextField className={classes.input} {...props} />} label="Start Time"
            value={props.task.start || new Date()} onChange={(newValue) => {setStartTime(newValue)}} />
          <DesktopDateTimePicker renderInput={(props) => <TextField className={classes.input} {...props} />} label="End Time"
            value={props.task.end_date || new Date()} onChange={(newValue) => {setEndTime(newValue)}}/>
          <Container className={classes.container}>
            <Button className={classes.done} variant="contained" size="medium" onClick={() => handleEditDone()}>Done</Button>
            <Button className={classes.addTo} variant="contained" size="medium">{props.task.in_calendar ? 'Add to TodoList' : 'Add to Calendar'}</Button>
            <Button className={classes.delete} variant="contained" size="medium" onClick={() => handleTodoDelete()}>Delete</Button>
          </Container>
        </Container>
      </Modal>
    </LocalizationProvider>
  );
};

export default TaskOptionsModal;

