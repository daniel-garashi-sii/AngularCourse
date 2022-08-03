import {TodoItem} from "./todo-item";
import {TodoList} from "./todo-list";

export interface AppState {
  readonly todoLists: TodoList[];
  readonly todoItems: TodoItem[];
}
