import firebase from '../firebase'
import { Task } from '../models/Task'

// TODO: Placeholder for if no Tasks
export const newTask = (uid: string | undefined, taskList: Task[]) => {
  const refToUserData = firebase.firestore().collection('users').doc(uid)
  const defaultError = 'No error'

  let error = defaultError

  refToUserData
    .update({
      tasks: taskList,
    })
    .catch((err) => {
      error = err
    })

  return error
}

export const addTask = (uid: string | undefined, updatedTasks: Task[]) => {
  const refToUserData = firebase.firestore().collection('users').doc(uid)

  refToUserData
    .update({
      tasks: updatedTasks,
    })
    .catch((err) => console.log(err))
}

export const toggleTask = (
  uid: string | undefined,
  allTasks: Task[],
  tid: number
) => {
  const refToUserData = firebase.firestore().collection('users').doc(uid)

  const previousTasks = allTasks.filter((t) => t.id !== tid)
  const updatedTask = allTasks.filter((t) => t.id === tid)[0]
  const taskObject = { ...updatedTask, checked: !updatedTask.checked }
  previousTasks.push(taskObject)

  refToUserData
    .update({
      tasks: previousTasks,
    })
    .catch((err) => console.log(err))
}

export const editTask = (
  uid: string | undefined,
  allTasks: Task[],
  tid: number,
  editObject: Task
) => {
  const refToUserData = firebase.firestore().collection('users').doc(uid)

  const previousTasks = allTasks.filter((t) => t.id !== tid)
  previousTasks.push(editObject)

  refToUserData
    .update({
      tasks: previousTasks,
    })
    .catch((err) => console.log(err))
}

export const deleteTask = (
  uid: string | undefined,
  allTasks: Task[],
  tid: number
) => {
  const refToUserData = firebase.firestore().collection('users').doc(uid)

  const previousTasks = allTasks.filter((t) => t.id !== tid)

  refToUserData
    .update({
      tasks: previousTasks,
    })
    .catch((err) => console.log(err))
}
