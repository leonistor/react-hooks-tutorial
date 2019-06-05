import React, {
  useState,
  useEffect,
  useReducer,
  ChangeEventHandler
} from 'react'
import { v4 as uuid } from 'uuid'

interface ITask {
  id: string
  taskText: string
}

interface IState {
  tasks: ITask[]
  completedTasks: ITask[]
}

// https://medium.com/@jrwebdev/react-hooks-in-typescript-88fce7001d0d
type Action =
  | { type: 'add'; newTask: ITask }
  | { type: 'complete'; task: ITask }
  | { type: 'delete'; taskId: string }

const initialTasksState: IState = { tasks: [], completedTasks: [] }

const tasksReducer = (state: IState, action: Action) => {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        tasks: [...state.tasks, action.newTask]
      }
    case 'complete':
      return {
        ...state,
        tasks: state.tasks.filter(t => t.id !== action.task.id),
        completedTasks: [...state.completedTasks, action.task]
      }
    case 'delete':
      return {
        ...state,
        completedTasks: state.completedTasks.filter(t => t.id !== action.taskId)
      }
    default:
      return state
  }
}

const TASKS_STORAGE_KEY = 'TASKS_STORAGE_KEY'

const storeTasks = (taskMap: IState) =>
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(taskMap))

const readStoredTasks = (): IState => {
  let taskMap = localStorage.getItem(TASKS_STORAGE_KEY)
  return taskMap ? JSON.parse(taskMap) : initialTasksState
}

function Tasks() {
  const [taskText, setTaskText] = useState<string>('')
  var storedTasks: IState = readStoredTasks()

  const [state, dispatch] = useReducer(tasksReducer, storedTasks)
  const { tasks, completedTasks } = state

  useEffect(() => {
    storeTasks({ tasks, completedTasks })
  })

  const updateTaskText: ChangeEventHandler<HTMLInputElement> = event => {
    setTaskText(event.target.value)
  }

  const addTask = () => {
    const newTask = { id: uuid(), taskText }
    dispatch({ type: 'add', newTask })
  }

  const completeTask = (completedTask: ITask) => () => {
    dispatch({ type: 'complete', task: completedTask })
  }

  const deleteTask = (task: ITask) => () => {
    dispatch({ type: 'delete', taskId: task.id })
  }

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
            <div key={id} onClick={completeTask(task)}>
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
