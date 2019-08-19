export interface GoalCreate {
  id: string,
  category_id: string,
  title: string,
  description: string,
  until_date: string,
  status?: string
}
