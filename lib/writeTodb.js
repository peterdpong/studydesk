import firebase from './firebase'

export const addClassTime = (uid, classList, classTimeObject, classname) => {
  const refToUserData = firebase.firestore().collection('users').doc(uid)

  const previousClasses = classList.filter((c) => c.name !== classname)
  const updatedClass = classList.filter((c) => c.name === classname)[0]
  const previousTimes = updatedClass.times
  const updatedTimes = previousTimes.concat(classTimeObject)
  updatedClass.times = updatedTimes
  previousClasses.push(updatedClass)

  refToUserData
    .update({
      classes: previousClasses,
    })
    .catch((err) => console.log(err))
}

export const addAssignment = (uid, classList, assignmentObject, classname) => {
  const refToUserData = firebase.firestore().collection('users').doc(uid)

  const previousClasses = classList.filter((c) => c.name !== classname)
  const updatedClass = classList.filter((c) => c.name === classname)[0]
  const previousAssignments = updatedClass.assignments
  const updatedAssignments = previousAssignments.concat(assignmentObject)
  updatedClass.assignments = updatedAssignments
  previousClasses.push(updatedClass)

  refToUserData
    .update({
      classes: previousClasses,
    })
    .catch((err) => console.log(err))
}

export const editClassTime = (uid, classList, classTimeObject, classname) => {
  const refToUserData = firebase.firestore().collection('users').doc(uid)

  const classes = classList
  for (var c = 0; c < classes.length; c++) {
    if (classes[c].name === classname) {
      for (var t = 0; t < classes[c].times.length; t++) {
        if (classes[c].times[t].id === classTimeObject.id) {
          classes[c].times[t] = classTimeObject
          break
        }
      }
      break
    }
  }

  refToUserData
    .update({
      classes: classes,
    })
    .catch((err) => console.log(err))
}

export const editAssignment = (uid, classList, assignmentObject, classname) => {
  const refToUserData = firebase.firestore().collection('users').doc(uid)

  const classes = classList
  for (var c = 0; c < classes.length; c++) {
    if (classes[c].name === classname) {
      for (var a = 0; a < classes[c].assignments.length; a++) {
        if (classes[c].assignments[a].id === assignmentObject.id) {
          classes[c].assignments[a] = assignmentObject
          break
        }
      }
      break
    }
  }

  refToUserData
    .update({
      classes: classes,
    })
    .catch((err) => console.log(err))
}

export const deleteAssignment = (uid, classList, classname, aid) => {
  const refToUserData = firebase.firestore().collection('users').doc(uid)

  const previousClasses = classList.filter((c) => c.name !== classname)
  const updatedClass = classList.filter((c) => c.name === classname)[0]
  const updatedAssignments = updatedClass.assignments.filter(
    (a) => a.id !== aid
  )
  updatedClass.assignments = updatedAssignments
  previousClasses.push(updatedClass)

  refToUserData
    .update({
      classes: previousClasses,
    })
    .catch((err) => console.log(err))
}

export const deleteTime = (uid, classList, classname, tid) => {
  const refToUserData = firebase.firestore().collection('users').doc(uid)

  const previousClasses = classList.filter((c) => c.name !== classname)
  const updatedClass = classList.filter((c) => c.name === classname)[0]
  const updatedTimes = updatedClass.times.filter((t) => t.id !== tid)
  updatedClass.times = updatedTimes
  previousClasses.push(updatedClass)

  refToUserData
    .update({
      classes: previousClasses,
    })
    .catch((err) => console.log(err))
}

export const addClass = (uid, updatedClasses) => {
  const refToUserData = firebase.firestore().collection('users').doc(uid)

  refToUserData
    .update({
      classes: updatedClasses,
    })
    .catch((err) => console.log(err))
}

export const addTask = (uid, updatedTasks) => {
  const refToUserData = firebase.firestore().collection('users').doc(uid)

  refToUserData
    .update({
      tasks: updatedTasks,
    })
    .catch((err) => console.log(err))
}

export const toggleTask = (uid, allTasks, tid) => {
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

export const editTask = (uid, allTasks, tid, editObject) => {
  const refToUserData = firebase.firestore().collection('users').doc(uid)

  const previousTasks = allTasks.filter((t) => t.id !== tid)
  previousTasks.push(editObject)

  refToUserData
    .update({
      tasks: previousTasks,
    })
    .catch((err) => console.log(err))
}

export const deleteTask = (uid, allTasks, tid) => {
  const refToUserData = firebase.firestore().collection('users').doc(uid)

  const previousTasks = allTasks.filter((t) => t.id !== tid)

  refToUserData
    .update({
      tasks: previousTasks,
    })
    .catch((err) => console.log(err))
}

export const findCalendarMatch = (allTasks, allClasses, date, day) => {
  const assignmentArray = []
  const taskArray = []
  const classArray = []

  for (var c = 0; c < allClasses.length; c++) {
    for (var t = 0; t < allClasses[c].times.length; t++) {
      if (allClasses[c].times[t].day === day) {
        classArray.push(allClasses[c].times[t])
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

export const deleteClass = async (uid, classes, className) => {
  const refToUserData = firebase.firestore().collection('users').doc(uid)
  const updatedClasses = classes.filter((c) => c.name !== className)

  refToUserData
    .update({
      classes: updatedClasses,
    })
    .catch((err) => console.log(err))
}

export const updateUserProfile = async (uid, profileObject) => {
  const refToUserData = firebase.firestore().collection('users').doc(uid)
  const refToUserAuth = firebase.auth().currentUser
  const defaultError = 'No error'

  let error = defaultError

  if (profileObject.emailChange) {
    if (refToUserAuth) {
      await refToUserAuth.updateEmail(profileObject.email).catch((err) => {
        error = err.message
      })

      if (!profileObject.emailOnly) {
        await refToUserAuth
          .updatePassword(profileObject.password)
          .catch((err) => {
            error = err.message
          })
      }
    } else {
      return
    }
  } else {
    const usernameSplit = profileObject.username.split(' ')

    refToUserData
      .update({
        firstName: usernameSplit[0],
        lastName: usernameSplit[1],
        email: profileObject.email,
        school: profileObject.school,
      })
      .catch((err) => {
        error = err.message
      })
  }

  return error
}

export const newClass = (uid, classList) => {
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

export const newTask = (uid, taskList) => {
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

export const newFile = async (file) => {
  const storageRef = firebase.storage().ref()
  const fileRef = storageRef.child(file.name)
  await fileRef.put(file)
  const fileURL = await fileRef.getDownloadURL()

  return fileURL
}

export const addSyllabus = (uid, syllabusURL, classList, classname) => {
  const refToUserData = firebase.firestore().collection('users').doc(uid)

  const previousClasses = classList.filter((c) => c.name !== classname)
  const updatedClass = classList.filter((c) => c.name === classname)[0]
  updatedClass.syllabus = syllabusURL
  previousClasses.push(updatedClass)

  refToUserData
    .update({
      classes: previousClasses,
    })
    .catch((err) => console.log(err))
}

export const deleteFile = async (fileURL) => {
  const fileRef = firebase.storage().refFromURL(fileURL)
  let error = ''

  fileRef
    .delete()
    .then(() => {
      console.log('Successfully deleted')
    })
    .catch((err) => {
      error = err.message
    })

  return error
}

export const deleteSyllabus = (uid, classList, classname) => {
  const refToUserData = firebase.firestore().collection('users').doc(uid)

  const previousClasses = classList.filter((c) => c.name !== classname)
  const updatedClass = classList.filter((c) => c.name === classname)[0]
  updatedClass.syllabus = ''
  previousClasses.push(updatedClass)

  refToUserData
    .update({
      classes: previousClasses,
    })
    .catch((err) => console.log(err))
}
