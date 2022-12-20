import firebase from '../firebase'
import { ClassModel } from '../models/ClassModel'

// TODO: Check actual type for file
export const newFile = async (file: any) => {
  const storageRef = firebase.storage().ref()
  const fileRef = storageRef.child(file.name)
  await fileRef.put(file)
  const fileURL = await fileRef.getDownloadURL()

  return fileURL
}

export const addSyllabus = (
  uid: string | undefined,
  syllabusURL: string,
  classList: ClassModel[],
  classname: string
) => {
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

export const deleteFile = async (fileURL: string) => {
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

export const deleteSyllabus = (
  uid: string | undefined,
  classList: ClassModel[],
  classname: string
) => {
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
