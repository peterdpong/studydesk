export type ClassTimes = {
    id: number;
    className: string;
    classroom: string;
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