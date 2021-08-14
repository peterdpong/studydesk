import { Class } from "./Class";
import { Task } from "./Task";

export type UserModel = {
  uid: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  school: string | undefined;
  email: string | undefined;
  classes: Class[] | undefined;
  tasks: Task[] | undefined;
}