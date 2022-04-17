import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import MyCalendar from './calendar/MyCalendar.jsx';
import ToDoList from './to-do-list/ToDoList.jsx';
import TopBar from './TopBar.jsx';
import moment from 'moment';

// For example data:
import { result } from '../../../database/example.js';

  // const naviBar = (<TopBar isMobile={isMobile} onCalendar={onCalendar} setOnCalendar={setOnCalendar}/>)
  // const toDoList = (<ToDoList draggedEvent={draggedEvent} setDraggedEvent={setDraggedEvent} handleDragStart={handleDragStart} myEvents={myEvents}/>)
  // const myCalender = (<MyCalendar myEvents={myEvents} moveEvent={moveEvent} resizeEvent={resizeEvent} changeTitle={changeTitle} onDropFromOutside={onDropFromOutside}/>)
  // const testToDo = (<TestToDo draggedEvent={draggedEvent} setDraggedEvent={setDraggedEvent} handleDragStart={handleDragStart}/>)
  // condition redering base on device
const Home = ({isMobile, isLoggedIn, isLoading, setIsLoggedIn, userEmail, sharedBy}) => {

  const [allTodos, setAllTodos] = useState([]);
  const [myEvents, setMyEvents] = useState([
    {
      id: 0,
      title: "Sample Event",
      start_date: new Date(),
      end_date: new Date(moment().add(1, "hour")),
      allDay: false,
      in_calendar: true
    },
    {
      id: 1,
      title: 'Trip to China',
      description: '5-day business trip to meet with manufacturers',
      duration: '5 days',
      start: new Date(),
      end: new Date(moment().add(5, "days")),
      category_id: 1,
      in_calendar: false
    },
    {
      id: 2,
      title: 'Trip to Los Angeles',
      description: 'Meeting with Executives',
      duration: '6 hours',
      start: new Date(moment('14 Apr 2022 09:30:00 UT')),
      end: new Date(moment('14 Apr 2022 15:30:00 UT')),
      category_id: 1,
      in_calendar: false
    }
  ]);
  const [onCalendar, setOnCalendar] = useState(false);
  const [draggedEvent, setDraggedEvent] = useState()

  // Requires logic and transforming of data to appropriate form to pass down data to calendar and todoList with required information from the appropriate user's calendar
  // All Components lose functionality if "isLoggedIn" is false

  // API Request Routes:

  // GET '/todoList/:userEmail' -> For all data
  const getAllTodos = () => {
    console.log('Get All Todo Data');
    // axios.get('/todoList', { params: { userEmail: userEmail } })
    //   .then((result) => {
      //     console.log(result);
      //     setAllTodos(result);
      //   })
      //   .catch(err => console.error(err));
  }

  // POST '/todoList/:userEmail' -> Adding or Upserting a "todoList item"
  const addTodo = (todo) => {
    console.log('Add todo: ', todo);
    // axios.post('/todoList', { params: { userEmail: userEmail }, data: todo })
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch(err => console.error(err));
  }

  // PATCH '/todoList/:userEmail' -> For updating the data -> ex. Moving around item in Calendar / Lengthening item in Calendar / Clicking on "Done" in Modal for Calendar/TodoList
  const updateTodo = (todo) => {
    console.log('Update Todo: ', todo);
    // axios.patch('/todoList', { params: { userEmail: userEmail }, data: todo })
    //   .then((result) => {
      //     console.log(result);
      //   })
      //   .catch(err => console.error(err));
  }

  // DELETE '/todoList/:userEmail' -> For deleting the data -> Clicking on "Delete" button in Modal
  const deleteTodo = (todo) => {
    console.log('Delete Todo: ', todo);
    // axios.delete('/todoList', { params: { userEmail: userEmail }, data: todo })
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch(err => console.error(err));
  }

  // For example data / demo landing page if not logged in
  var exampleData = null;

  // if (isLoggedIn === false) {}
  for (var i = 0; i < result.calendars.length; i++) {
    if (result.calendars[i].calendar_owner === '1@qq.com') {
      exampleData = result.calendars[i].categories;
    }
  }

  // For getting all data when rendering
  // useEffect(() => {
  //   getAllTodos();
  // })
  //Calendar helper functions
  const moveEvent = useCallback(
    ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
      const { allDay } = event;
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true;
      }

      setMyEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end, allDay }];
      });
    },
    [setMyEvents]
  );

  const newEvent = useCallback(
    (event) => {
      setMyEvents((prev) => {
        const idList = prev.map((item) => item.id)
        const newId = Math.max(...idList) + 1
        return [...prev, { ...event, id: newId }]
      })
    },
    [setMyEvents]
  )

  const resizeEvent = useCallback(
    ({ event, start, end }) => {
      setMyEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end }];
      });
    },
    [setMyEvents]
  );

  const changeTitle = (event) => {
    var title = prompt("Change title", event.title);
    var newList = myEvents;
    setMyEvents((prev) => {
      newList[prev.indexOf(event)].title = title;
      return newList
    });
  };
  const handleDragStart = useCallback((event) => {
    console.log('dragged event', event)
    setDraggedEvent(event), []
  })


  const onDropFromOutside = useCallback(
    () => {
      setMyEvents((prev) => {
        const existing = draggedEvent;
        console.log('existing', existing)
        existing.in_calendar = !existing.in_calendar;
        const filtered = prev.filter((ev) => ev.id !== draggedEvent.id);
        return [...filtered, { ...existing }];
      });
      setDraggedEvent(null)
    },
    [draggedEvent, setDraggedEvent, newEvent]
  )

  // All Components
  console.log('home', userEmail);
  const naviBar = (<TopBar isLoading={isLoading} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} isMobile={isMobile} onCalendar={onCalendar} setOnCalendar={setOnCalendar} userEmail={userEmail}/>);
  const toDoList = (<ToDoList isMobile={isMobile} taskData={exampleData} draggedEvent={draggedEvent} setDraggedEvent={setDraggedEvent} handleDragStart={handleDragStart}/>);
  const myCalender = (<MyCalendar myEvents={myEvents} moveEvent={moveEvent} resizeEvent={resizeEvent} changeTitle={changeTitle} onDropFromOutside={onDropFromOutside}/>);

  // Conditional Rendering based on device
  const renderContent = () => {
    // view for mobile and in to do list page
    if (isMobile && !onCalendar) {
      return (
        <div>
          {naviBar}
          <div className="">
            {toDoList}
          </div>
        </div>
      )
    } else if (isMobile && onCalendar) {
      // view for mobile and in calendar page
      return (
        <div>
          {naviBar}
          <div>
            {myCalender}
          </div>
        </div>
      )
    } else {
      return (
        // view for desktop display both calendar and to do list
        <div>
          {naviBar}
          {myCalender}
          {toDoList}
        </div>
      )
    }
  }

  return (
    <div>
      {renderContent()}
    </div>
  )
}

export default Home;