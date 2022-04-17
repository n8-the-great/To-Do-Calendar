import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import MyCalendar from './calendar/MyCalendar.jsx';
import ToDoList from './to-do-list/ToDoList.jsx';
import TopBar from './TopBar.jsx';
import TestToDo from './calendar/TestToDo.jsx';

// For example data:
import { result } from '../../../database/example.js';


const Home = ({isMobile, isLoggedIn, isLoading, setIsLoggedIn, userEmail, sharedBy, onCalendar, setOnCalendar,
  myEvents, moveEvent, resizeEvent, changeTitle, handleDragStart, draggedEvent, setDraggedEvent, onDropFromOutside}) => {



  // Needs axios requests to get data when first rendering
  // Requires logic and transforming of data to appropriate form to pass down data to calendar and todoList with required information from the appropriate user's calendar
  // All Components lose functionality if "isLoggedIn" is false

  // API Request Routes:
  // GET '/todoList/:userEmail' -> For all data
  // POST '/todoList/:userEmail' -> Adding or Upserting a "todoList item"
  // PATCH '/todoList/:userEmail' -> For updating the data -> ex. Moving around item in Calendar / Lengthening item in Calendar / Clicking on "Done" in Modal for Calendar/TodoList
  // DELETE '/todoList/:userEmail' -> For deleting the data -> Clicking on "Delete" button in Modal

  // The above list is also in server/routes/todoListRouter.js

  // For example data / demo landing page if not logged in
  var exampleData = null;

  for (var i = 0; i < result.calendars.length; i++) {
    if (result.calendars[i].calendar_owner === '1@qq.com') {
      exampleData = result.calendars[i].categories;
    }
  }

  // if (isLoggedIn === false) {}

  // All Components
  console.log('home', userEmail);
  const naviBar = (<TopBar isLoading={isLoading} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} isMobile={isMobile} onCalendar={onCalendar} setOnCalendar={setOnCalendar} userEmail={userEmail}/>);
  const toDoList = (<ToDoList isMobile={isMobile} taskData={exampleData}/>);
  const myCalender = (<MyCalendar myEvents={myEvents} moveEvent={moveEvent} resizeEvent={resizeEvent} changeTitle={changeTitle} onDropFromOutside={onDropFromOutside}/>);
  const testToDo = (<TestToDo draggedEvent={draggedEvent} setDraggedEvent={setDraggedEvent} handleDragStart={handleDragStart}/>);

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
          {/* {testToDo} */}
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