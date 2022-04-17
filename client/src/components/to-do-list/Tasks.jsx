import React from 'react';
import Task from './Task.jsx';

function Tasks({tasks, openModal, isMobile, deleteTask, draggedEvent, setDraggedEvent, handleDragStart}) {
  console.log('tasks in tasks', tasks)
  const filteredTasks = tasks.todoitems.filter(task => !task.in_calendar)
  console.log('filteredTasks', filteredTasks)
  return(
    filteredTasks.map((task, i) => {
    return (<Task style={{display: 'inline-block'}}
    key={i} task={task} openModal={openModal} isMobile={isMobile}
    deleteTask={deleteTask} draggedEvent={draggedEvent}
    setDraggedEvent={setDraggedEvent} handleDragStart={handleDragStart}/>)
    }
  )
  )
}

// Will need for different functionality as a prop passed down to Task
// editClick={editClick} editing={editing}

export default Tasks;
