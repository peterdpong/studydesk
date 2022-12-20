import { Assignment } from './Assignment'
import { ClassTimes } from './ClassTimes'

export type ClassModel = {
  name: string
  classTimes: ClassTimes[]
  teacherName: string
  color: string
  assignments: Assignment[]
  syllabus: string
}
