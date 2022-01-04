export type ClassTimes = {
    classroom: string;
    day: string;
    startTime: string;
    endTime: string;
    type: ClassTypes;
}

enum ClassTypes {
    Lecture,
    Tutorial,
    Practical
}