export interface TodosResponse {
  count: 4,
  next: any,
  previous: any,
  results: Array<Todo>
}

export interface Todo {
  id?: string,
  title: string,
  created_at?: Date,
  updated_at?: Date,
  completed: boolean,
  user: number
}
