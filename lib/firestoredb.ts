import { UserUpdateAction } from '../pages/app/settings';
import firebase from './firebase';
import { Assignment } from './models/Assignment';

import { ClassModel } from "./models/ClassModel";
import { Task } from './models/Task';
import { UserModel } from './models/User';



export const addClass = (uid: string | undefined, updatedClasses: ClassModel[]) => {
    const refToUserData = firebase.firestore().collection("users").doc(uid);

    refToUserData
        .update({
            classes: updatedClasses
        })
        .catch(
            (err) => console.log(err)
        );
};


export const addTask = (uid: string | undefined, updatedTasks: Task[]) => {
    const refToUserData = firebase.firestore().collection("users").doc(uid);

    refToUserData
        .update({
            tasks: updatedTasks
        })
        .catch(
            (err) => console.log(err)
        );
};


export const toggleTask = (uid: string | undefined, allTasks: Task[], tid: number) => {
    const refToUserData = firebase.firestore().collection("users").doc(uid);

    const previousTasks = allTasks.filter((t) => t.id !== tid);
    const updatedTask = allTasks.filter((t) => t.id === tid)[0];
    const taskObject = {...updatedTask, checked: !(updatedTask.checked)}
    previousTasks.push(taskObject);

    refToUserData
        .update({
            tasks: previousTasks
        })
        .catch(
            (err) => console.log(err)
        );
}


export const editTask = (uid: string | undefined, allTasks: Task[], tid: number, editObject: Task) => {
    const refToUserData = firebase.firestore().collection("users").doc(uid);

    const previousTasks = allTasks.filter((t) => t.id !== tid);
    previousTasks.push(editObject);

    refToUserData
        .update({
            tasks: previousTasks
        })
        .catch(
            (err) => console.log(err)
        );
}


export const deleteTask = (uid: string | undefined, allTasks: Task[], tid: number) => {
    const refToUserData = firebase.firestore().collection("users").doc(uid);

    const previousTasks = allTasks.filter((t) => t.id !== tid);

    refToUserData
        .update({
            tasks: previousTasks
        })
        .catch(
            (err) => console.log(err)
        );
}


export const findCalendarMatch = (allTasks: Task[], allClasses: ClassModel[], date: string, day: string) => {
    const assignmentArray = [];
    const taskArray = [];
    const classArray = [];

    for(var c = 0; c < allClasses.length; c++){
        for(var t = 0; t < allClasses[c].classTimes.length; t++){
            if(allClasses[c].classTimes[t].day === day){
                classArray.push(allClasses[c].classTimes[t]);
            }
        }

        for(var a = 0; a < allClasses[c].assignments.length; a++){
            if(allClasses[c].assignments[a].dueDate === date){
                assignmentArray.push(allClasses[c].assignments[a]);
            }
        }
    }

    for(var t = 0; t < allTasks.length; t++){
        if(allTasks[t].dueDate === date){
            taskArray.push(allTasks[t]);
        }
    }

    return({
        assignmentArray, taskArray, classArray
    })
}


export const deleteClass = async (uid: string | undefined, classes: ClassModel[], className: string) => {
    const refToUserData = firebase.firestore().collection("users").doc(uid);
    const updatedClasses = classes.filter((c) => c.name !== className);

    refToUserData
        .update({
            classes: updatedClasses
        })
        .catch(
            (err) => console.log(err)
        );
    
}

// TODO: Rewrite with settings page
// export const updateUserProfile = async (uid: string | undefined, userObject: UserModel, action: UserUpdateAction) => {
//     const refToUserData = firebase.firestore().collection("users").doc(uid);
//     const refToUserAuth = firebase.auth().currentUser;
//     const defaultError = 'No error';

//     let error = defaultError;

//     if(profileObject.emailChange){
//         if(refToUserAuth){
//             await refToUserAuth
//                 .updateEmail(profileObject.email)
//                 .catch(
//                     (err) => {
//                         error = err.message;
//                     }
//                 )
            
//             if(!profileObject.emailOnly){
//                 await refToUserAuth
//                     .updatePassword(profileObject.password)
//                     .catch(
//                         (err) => {
//                             error = err.message;
//                         }
//                     )
//             }
//         }
//         else{
//             return;
//         }
//     }

//     else{
//         const usernameSplit = profileObject.username.split(' ');

//         refToUserData
//             .update({
//                 firstName: usernameSplit[0],
//                 lastName: usernameSplit[1],
//                 email: profileObject.email,
//                 school: profileObject.school
//             })
//             .catch(
//                 (err) => {
//                     error = err.message;
//                 }
//             )
//     }

//     return error;
// }


export const newClass = (uid: string | undefined, classList: ClassModel[]) => {
    const refToUserData = firebase.firestore().collection("users").doc(uid);
    const defaultError = 'No error';

    let error = defaultError;

    refToUserData
        .update({
            classes: classList
        })
        .catch(
            (err) => {
                error = err;
            }
        )

    return error;
}


export const newTask = (uid: string | undefined, taskList: Task[]) => {
    const refToUserData = firebase.firestore().collection("users").doc(uid);
    const defaultError = 'No error';

    let error = defaultError;

    refToUserData
        .update({
            tasks: taskList
        })
        .catch(
            (err) => {
                error = err;
            }
        )

    return error;
}

// TODO: Check actual type for file
export const newFile = async (file: any) => {
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    const fileURL = await fileRef.getDownloadURL();

    return fileURL;
}


export const addSyllabus = (uid: string | undefined, syllabusURL: string, classList: ClassModel[], classname: string) => {
    const refToUserData = firebase.firestore().collection("users").doc(uid);

    const previousClasses = classList.filter((c) => c.name !== classname);
    const updatedClass = classList.filter((c) => c.name === classname)[0];
    updatedClass.syllabus = syllabusURL;
    previousClasses.push(updatedClass);

    refToUserData
        .update({
            classes: previousClasses
        })
        .catch(
            (err) => console.log(err)
        )
};


export const deleteFile = async (fileURL: string) => {
    const fileRef = firebase.storage().refFromURL(fileURL);
    let error = '';

    fileRef
        .delete()
        .then(() => {
            console.log('Successfully deleted');
        })
        .catch((err) => {
            error = err.message;
        })

    return error;
}


export const deleteSyllabus = (uid: string | undefined, classList: ClassModel[], classname: string) => {
    const refToUserData = firebase.firestore().collection("users").doc(uid);

    const previousClasses = classList.filter((c) => c.name !== classname);
    const updatedClass = classList.filter((c) => c.name === classname)[0];
    updatedClass.syllabus = '';
    previousClasses.push(updatedClass);

    refToUserData
        .update({
            classes: previousClasses
        })
        .catch(
            (err) => console.log(err)
        )
};