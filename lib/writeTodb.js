import firebase from './firebase';

export const addClassTime = (uid, classList, classTimeObject, classname) => {
    const refToUserData = firebase.firestore().collection("users").doc(uid);

    const previousClasses = classList.filter((c) => c.name !== classname);
    const updatedClass = classList.filter((c) => c.name === classname)[0];
    const previousTimes = updatedClass.times;
    const updatedTimes = previousTimes.concat(classTimeObject);
    updatedClass.times = updatedTimes;
    previousClasses.push(updatedClass);

    refToUserData
        .update({
            classes: previousClasses
        })
        .catch(
            (err) => console.log(err)
        )
};


export const addAssignment = (uid, classList, assignmentObject, classname) => {
    const refToUserData = firebase.firestore().collection("users").doc(uid);

    const previousClasses = classList.filter((c) => c.name !== classname);
    const updatedClass = classList.filter((c) => c.name === classname)[0];
    const previousAssignments = updatedClass.assignments;
    const updatedAssignments = previousAssignments.concat(assignmentObject);
    updatedClass.assignments = updatedAssignments;
    previousClasses.push(updatedClass);

    refToUserData
        .update({
            classes: previousClasses
        })
        .catch(
            (err) => console.log(err)
        )
};


export const addTask = (uid, updatedTasks) => {
    const refToUserData = firebase.firestore().collection("users").doc(uid);

    refToUserData
        .update({
            tasks: updatedTasks
        })
        .catch(
            (err) => console.log(err)
        );
};


