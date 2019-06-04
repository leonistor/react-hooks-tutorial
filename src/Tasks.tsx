import React, { useState, ChangeEventHandler } from 'react'
import { v4 as uuid } from 'uuid'

interface ITask {
  id: string
  taskText: string
}

let i = 0

function Tasks() {
  const [taskText, setTaskText] = useState<string>('')

  let tasks: ITask[], setTasks: React.Dispatch<React.SetStateAction<ITask[]>>
  let completedTasks: ITask[],
    setCompletedTasks: React.Dispatch<React.SetStateAction<ITask[]>>

  if (i % 2 === 0) {
    ;[tasks, setTasks] = useState<ITask[]>([])
    ;[completedTasks, setCompletedTasks] = useState<ITask[]>([])
  } else {
    ;[completedTasks, setCompletedTasks] = useState<ITask[]>([])
    ;[tasks, setTasks] = useState<ITask[]>([])
  }

  const updateTaskText: ChangeEventHandler<HTMLInputElement> = event => {
    setTaskText(event.target.value)
  }

  const addTask = () => {
    const newTask = { id: uuid(), taskText }
    setTasks([...tasks, newTask])
  }

  const colmpleteTask = (completedTask: ITask) => () => {
    setCompletedTasks([...completedTasks, completedTask])
    setTasks(tasks.filter(task => task.id !== completedTask.id))
  }

  const deleteTask = (task: ITask) => () => {
    setCompletedTasks(completedTasks.filter(t => t.id !== task.id))
  }

  console.log('tasks', tasks)
  console.log('completed tasks', completedTasks)

  return (
    <div>
      <h3>Tasks</h3>
      <div className="form">
        <input value={taskText} onChange={updateTaskText} />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="task-list">
        {tasks.map(task => {
          const { id, taskText } = task
          return (
            <div key={id} onClick={colmpleteTask(task)}>
              {taskText}
            </div>
          )
        })}
      </div>
      <div className="completed-list">
        {completedTasks.map(task => {
          const { id, taskText } = task
          return (
            <div key={id}>
              {taskText}{' '}
              <span className="delete-task" onClick={deleteTask(task)}>
                x
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Tasks