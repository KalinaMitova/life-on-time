import { SeparatedDate } from './date';

export interface Task {
  id: string,
  goal_id: string,
  title: string,
  until_date: SeparatedDate,
  status: string,
  taskLeftDays: number

}

// "tasks": [
//   {
//     "id": 11,
//     "goal_id": 11,
//     "title": "Task 5",
//     "description": "Task 5",
//     "until_date": "2019-09-19",
//     "status": 1,
//     "created_at": "2019-06-04 08:35:46",
//     "updated_at": "2019-05-31 08:35:46"
//   }
