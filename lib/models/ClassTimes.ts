export type ClassTimes = {
    className: string;
    classRoom: string;
    day: string;
    startTime: string;
    endTime: string;
    type: ClassTypes;
}

export enum ClassTypes {
    Lecture,
    Tutorial,
    Practical
}