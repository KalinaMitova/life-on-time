import { Task } from './task';
import { SeparatedDate } from './date';

export interface Goal {
  id: string,
  title: string,
  description: string,
  until_date: SeparatedDate,
  status: string,
  tasks: Array<Task>
}
