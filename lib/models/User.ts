import { ClassModel } from './ClassModel'
import { Task } from './Task'

export type UserModel = {
  uid: string | undefined
  provider: string
  firstName: string | undefined
  lastName: string | undefined
  school: string | undefined
  email: string | undefined
  classes: ClassModel[] | undefined
  tasks: Task[] | undefined
}
