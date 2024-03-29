import firebase from '../firebase'
import { Assignment } from '../models/Assignment'
import { ClassModel } from '../models/ClassModel'
import { ClassTimes } from '../models/ClassTimes'
import { Task } from '../models/Task'

// TODO: Placeholder for if no Classes
export const newClass = (uid: string | undefined, classList: ClassModel[]) => {
  const refToUserData = firebase.firestore().collection('users').doc(uid)
  const defaultError = 'No error'

  let error = defaultError

  refToUserData
    .update({
      classes: classList,
    })
    .catch((err) => {
      error = err
    })

  return error
}

// Functions here deal with manipulating the contents of a Class.
export const addClass = (
  uid: string | undefined,
  updatedClasses: ClassModel[]
) => {
  const refToUserData = firebase.firestore().collection('users').doc(uid)

  refToUserData
    .update({
      classes: updatedClasses,
    })
    .catch((err) => console.log(err))
}

export const deleteClass = async (
  uid: string | undefined,
  classes: ClassModel[],
  className: string
) => {
  const refToUserData = firebase.firestore().collection('users').doc(uid)
  const updatedClasses = classes.filter((c) => c.name !== className)

  refToUserData
    .update({
      classes: updatedClasses,
    })
    .catch((err) => console.log(err))
}

export const addClassTime = (
  uid: string | undefined,
  classList: ClassModel[],
  classTimeObject: ClassTimes,
  className: string
) => {
  if (!uid) {
    console.error('addClassTime Error: uid undefined.')
    return
  }

  const refToUserData = firebase.firestore().collection('users').doc(uid)
  const classIndex = classList.findIndex((value) => value.name === className)

  if (classIndex === -1) {
    console.error('addClassTime Error: Could not find class name.')
    return
  }

  classList[classIndex].classTimes.push(classTimeObject)

  refToUserData
    .update({
      classes: classList,
    })
    .catch((err) => console.error(err))
}

// nts(Peter): Rewrite using index of classtime insead of id
export const editClassTime = (
  uid: string | undefined,
  classList: ClassModel[],
  classTimeObject: ClassTimes,
  className: string,
  classTimeIndex: number
) => {
  if (!uid) {
    console.error('editClassTime Error: uid undefined.')
    return
  }

  const refToUserData = firebase.firestore().collection('users').doc(uid)
  const classIndex = classList.findIndex((value) => value.name === className)
  if (classIndex === -1) {
    console.error('editClassTime Error: Could not find class name.')
    return
  }

  classList[classIndex].classTimes[classTimeIndex] = classTimeObject

  refToUserData
    .update({
      classes: classList,
    })
    .catch((err) => console.error(err))
}

export const deleteClassTime = (
  uid: string | undefined,
  classList: ClassModel[],
  className: string,
  classTimeIndex: number
) => {
  if (!uid) {
    console.error('editClassTime Error: uid undefined.')
    return
  }

  const refToUserData = firebase.firestore().collection('users').doc(uid)
  const classIndex = classList.findIndex((value) => value.name === className)
  if (classIndex === -1) {
    console.error('editClassTime Error: Could not find class name.')
    return
  }

  // Remove time at index
  classList[classIndex].classTimes.splice(classTimeIndex, 1)

  refToUserData
    .update({
      classes: classList,
    })
    .catch((err) => console.log(err))
}

// Class Assignment manipulation actions
// TODO: Rewrite assignment object with better ID generation -> use map?

// TODO: Check undefined
export const addAssignment = (
  uid: string | undefined,
  classList: ClassModel[] | undefined,
  assignmentObject: Assignment,
  className: string
) => {
  const refToUserData = firebase.firestore().collection('users').doc(uid)

  const classRef = classList?.find((c) => c.name === className)
  if (classRef) {
    classRef.assignments.push(assignmentObject)
  }

  refToUserData
    .update({
      classes: classList,
    })
    .catch((err) => console.log(err))
}

export const editAssignment = (
  uid: string | undefined,
  classList: ClassModel[],
  assignmentObject: Assignment,
  className: string
) => {
  const refToUserData = firebase.firestore().collection('users').doc(uid)

  const classRef = classList?.find((c) => c.name === className)
  if (classRef) {
    const assignmentIndex = classRef.assignments.findIndex(
      (assignment) => assignment.id === assignmentObject.id
    )

    classRef.assignments[assignmentIndex] = assignmentObject
  }

  refToUserData
    .update({
      classes: classList,
    })
    .catch((err) => console.log(err))
}

export const deleteAssignment = (
  uid: string | undefined,
  classList: ClassModel[],
  className: string,
  assignmentID: number
) => {
  const refToUserData = firebase.firestore().collection('users').doc(uid)

  const classRef = classList?.find((c) => c.name === className)
  if (classRef) {
    classRef.assignments = classRef.assignments.filter(
      (assignment) => assignment.id !== assignmentID
    )
  }

  refToUserData
    .update({
      classes: classList,
    })
    .catch((err) => console.log(err))
}

//TODO: Calendar generation - may need to move elsewhere
export const findCalendarMatch = (
  allTasks: Task[],
  allClasses: ClassModel[],
  date: string,
  day: string
) => {
  const assignmentArray = []
  const taskArray = []
  const classArray = []

  for (var c = 0; c < allClasses.length; c++) {
    for (var t = 0; t < allClasses[c].classTimes.length; t++) {
      if (allClasses[c].classTimes[t].day === day) {
        classArray.push(allClasses[c].classTimes[t])
      }
    }

    for (var a = 0; a < allClasses[c].assignments.length; a++) {
      if (allClasses[c].assignments[a].dueDate === date) {
        assignmentArray.push(allClasses[c].assignments[a])
      }
    }
  }

  for (var t = 0; t < allTasks.length; t++) {
    if (allTasks[t].dueDate === date) {
      taskArray.push(allTasks[t])
    }
  }

  return {
    assignmentArray,
    taskArray,
    classArray,
  }
}
