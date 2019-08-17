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

// "goals": [
//   {
//     "id": 11,
//     "category_id": 5,
//     "user_id": 2,
//     "idea_id": null,
//     "title": "Financial",
//     "description": "Financial",
//     "until_date": "2019-10-04",
//     "status": 1,
//     "created_at": "2019-05-31 08:35:46",
//     "updated_at": "2019-05-31 08:35:46",
//     "tasks": [
//       {
//         "id": 11,
//         "goal_id": 11,
//         "title": "Task 5",
//         "description": "Task 5",
//         "until_date": "2019-09-19",
//         "status": 1,
//         "created_at": "2019-06-04 08:35:46",
//         "updated_at": "2019-05-31 08:35:46"
//       }
//     ]
