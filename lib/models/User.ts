import { Class } from "./Class";
import { Task } from "./Task";

export type UserModel = {
  uid: string | undefined;
  provider: string;
  firstName: string | undefined;
  lastName: string | undefined;
  school: string | undefined;
  email: string | undefined;
  classes: Class[] | undefined;
  tasks: Task[] | undefined;
}