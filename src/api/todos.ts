import axios from 'axios'
import { Todo } from '../types/Todo'
import { FilterType } from '../types/FilterType'

axios.defaults.baseURL = 'https://todo-app-be.onrender.com/'

export function getAllTodos(type?: FilterType): Promise<Todo[]> {
  return axios.get('/todos').then((res) => res.data)
}

export async function updateAllTodos(todos: Todo[]): Promise<Todo[]> {
  const res = await axios.patch('/todos?action=update', {
    items: todos,
  })
  return res.data
}

export function deleteAllTodos(ids: number[]): Promise<Todo[]> {
  return axios.patch('/todos?action=delete', { ids }).then((res) => res.data)
}

export function getOneTodo(todoId: string): Promise<Todo> {
  return axios.get(`/todos/${todoId}`).then((res) => res.data)
}

export function addTodo(title: string): Promise<Todo> {
  return axios.post('/todos', { title }).then((res) => res.data)
}

export function removeTodo(todoId: number): Promise<string> {
  return axios.delete(`/todos/${todoId}`).then((res) => res.data)
}

export function updateTodo({ id, title, completed }: Todo): Promise<Todo> {
  return axios.put(`/todos/${id}`, { title, completed }).then((res) => res.data)
}
