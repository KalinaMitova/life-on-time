import { Task } from './task';
import { SeparatedDate } from './date';

export interface Goal {
  id: number,
  title: string,
  description: string,
  until_date: SeparatedDate,
  status?: number,
  tasks: Array<Task>
}
