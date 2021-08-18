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


/*export const addTimeOrAssignment = (uid, classList, addObject, classname, isTime) => {
    const refToUserData = firebase.firestore().collection("users").doc(uid);

    const previousClasses = classList.filter((c) => c.name !== classname);
    const updatedClass = classList.filter((c) => c.name === classname)[0];
    let previous = [];

    if(isTime){
        previous = updatedClass.times;
        const updatedTimes = previous.concat(addObject);
        updatedClass.times = updatedTimes;
        previousClasses.push(updatedClass);
    }
    else{
        previous = updatedClass.assignments;
        const updatedAssignments = previous.concat(addObject);
        updatedClass.assignments = updatedAssignments;
        previousClasses.push(updatedClass);
    }

    refToUserData
        .update({
            classes: previousClasses
        })
        .catch(
            (err) => console.log(err)
        )
};*/


export const editClassTime = (uid, classList, classTimeObject, classname) => {
    const refToUserData = firebase.firestore().collection("users").doc(uid);

    /*const previousClasses = classList.filter((c) => c.name !== classname);
    const updatedClass = classList.filter((c) => c.name === classname)[0];
    const previousTimes = updatedClass.times.filter((t) => t.id !== timeId);
    const updatedTime = updatedClass.times.filter((t) => t.id === timeId);
    ////
    const updatedTimes = previousTimes.concat(classTimeObject);
    updatedClass.times = updatedTimes;
    previousClasses.push(updatedClass);*/

    const classes = classList;
    for(var c = 0; c < classes.length; c++){
        if(classes[c].name === classname){
            for(var t = 0; t < classes[c].times.length; t++){
                if(classes[c].times[t].id === classTimeObject.id){
                    classes[c].times[t] = classTimeObject;
                    break;
                }
            }
            break;
        }
    }

    refToUserData
        .update({
            classes: classes
        })
        .catch(
            (err) => console.log(err)
        )
};


export const editAssignment = (uid, classList, assignmentObject, classname) => {
    const refToUserData = firebase.firestore().collection("users").doc(uid);

    const classes = classList;
    for(var c = 0; c < classes.length; c++){
        if(classes[c].name === classname){
            for(var a = 0; a < classes[c].assignments.length; a++){
                if(classes[c].assignments[a].id === assignmentObject.id){
                    classes[c].assignments[a] = assignmentObject;
                    break;
                }
            }
            break;
        }
    }

    refToUserData
        .update({
            classes: classes
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


