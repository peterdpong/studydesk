import { ClassTimes } from "./ClassTimes";

export type Class = {
  name: string;
  classTimes: string[];
  teacherName: string;
  color: string;
  assignments: Object[];
  syllabus: string;
  times: ClassTimes[]
}