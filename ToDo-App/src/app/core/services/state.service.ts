import {Injectable} from '@angular/core';
import {AppState} from "../models/app.state";
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {TodoList} from "../models/todo-list";
import {TodoItem} from "../models/todo-item";

@Injectable({
  providedIn: 'root'
})
export class StateService {
  /*Need to change that for uuid */
  private static generatedTodoListId = 6;
  private static generatedTodoItemId = 13;

  private appState!: AppState;
  private appState$!: BehaviorSubject<AppState>;

  initAppState(): void {
    let lists: TodoList[] = [];
    let l1: TodoList = {id: 1, caption: 'Shopping', description: 'Things to buy on our next stop to the supermarket', color: '#0000FFFF', icon: 'shopping_cart'};
    let l2: TodoList = {id: 2, caption: 'Work',description: 'Work list', color: '#008000FF', icon: 'work'};
    let l3: TodoList = {id: 3, caption: 'Fun', description: 'Fun list',color: '#FF00FFFF', icon: 'stars'};
    let l4: TodoList = {id: 4, caption: 'Events', description: 'Events list', color: '#FFA500FF', icon: 'event'};
    let l5: TodoList = {id: 5, caption: 'Flagged',description: 'Flagged list', color: '#4682B4FF', icon: 'flag'};

    lists.push(l1);lists.push(l2);lists.push(l3);lists.push(l4);lists.push(l5);

    let items: TodoItem[] = [];
    let item_1: TodoItem = {id: 1, caption: 'Tomatoes', listId: 1, isCompleted: false};
    let item_2: TodoItem = {id: 2, caption: 'Sugar', listId: 1, isCompleted: true};
    let item_3: TodoItem = {id: 3, caption: 'Milk', listId: 1, isCompleted: false};
    let item_4: TodoItem = {id: 4, caption: 'Water', listId: 1, isCompleted: true};
    items.push(item_1); items.push(item_2); items.push(item_3); items.push(item_4);

    let item_5: TodoItem = {id: 5, caption: 'item_5', listId: 2, isCompleted: false};
    let item_6: TodoItem = {id: 6, caption: 'item_6', listId: 2, isCompleted: false};
    let item_7: TodoItem = {id: 7, caption: 'item_7', listId: 2, isCompleted: false};
    let item_8: TodoItem = {id: 8, caption: 'item_8', listId: 2, isCompleted: true};
    items.push(item_5); items.push(item_6); items.push(item_7); items.push(item_8);

    let item_9: TodoItem = {id: 9, caption: 'item_9', listId: 3, isCompleted: false};
    let item_10: TodoItem = {id: 10, caption: 'item_10', listId: 3, isCompleted: false};
    let item_11: TodoItem = {id: 11, caption: 'item_11', listId: 3, isCompleted: false};
    let item_12: TodoItem = {id: 12, caption: 'item_12', listId: 3, isCompleted: true};

    items.push(item_9); items.push(item_10); items.push(item_11); items.push(item_12);

    this.appState = {todoLists: lists, todoItems: items};
    this.appState$.next(this.appState);
  }

  constructor() {
    this.appState = {todoLists: [], todoItems: []};
    this.appState$ = new BehaviorSubject<AppState>(this.appState);

    this.initAppState();
  }

  get getAppState$(): Observable<AppState> {
    return this.appState$.asObservable();
  }

  getAllLists(): Observable<TodoList[]> {
    return this.appState$.pipe(
      map(appState => appState.todoLists)
    );
  }

  getListById(id: number): Observable<TodoList> {
    return this.appState$.pipe(
      map(appState =>
        appState.todoLists.find(todoList => todoList.id === id)!
      )
    );
  }

  getAllItems(): Observable<TodoItem[]> {
    return this.appState$.asObservable().pipe(
      map(appState => appState.todoItems)
    );
  }

  getItem(id: number): Observable<TodoItem> {
    return this.appState$.pipe(
      map(appState =>
        appState.todoItems.find(todoItem => todoItem.id === id)!
      )
    );
  }

  getItemsOfList(listId: number): Observable<TodoItem[]> {
    return this.appState$.pipe(
      map(appState =>
        appState.todoItems.filter(todoItem => todoItem.listId === listId)
      )
    );
  }

  getAllNotCompletedItems(): Observable<TodoItem[]> {
    return this.appState$.pipe(
      map(appState => appState.todoItems.filter(todoItem => !todoItem.isCompleted))
    );
  }

  async addList(caption: string, description: string, color: string, icon: string): Promise<number> {
    let todoLists: TodoList[] = [...this.appState.todoLists];
    let todoItems: TodoItem[] = [...this.appState.todoItems];

    let listId: number = StateService.generateTodoListId();
    let todoList: TodoList = {
      id: listId,
      caption: caption,
      description: description,
      color: color,
      icon: icon
    }

    todoLists.push(todoList);

    this.appState = {todoLists: todoLists, todoItems: todoItems};
    this.appState$.next(this.appState);

    console.log(this.appState.todoLists);
    return listId;
  }

  async modifyList(list: TodoList): Promise<void> {
    let todoLists: TodoList[] = [...this.appState.todoLists];
    let todoItems: TodoItem[] = [...this.appState.todoItems];

    let listIndex = this.appState.todoLists.findIndex(todoList => todoList.id === list.id)
    todoLists[listIndex] = list;

    this.appState = {todoLists: [...todoLists], todoItems: [...todoItems]};
    this.appState$.next(this.appState);

    console.log(this.appState.todoLists);
  }

  async addTodoItem(listId: number, caption: string): Promise<number> {
    let todoLists: TodoList[] = [...this.appState.todoLists];
    let todoItems: TodoItem[] = [...this.appState.todoItems];

    let todoItem: TodoItem = {
      id: StateService.generateTodoItemId(),
      caption: caption,
      listId: listId,
      isCompleted: false
    };

    todoItems.push(todoItem);

    this.appState = {todoLists: todoLists, todoItems: todoItems};
    this.appState$.next(this.appState);

    return todoItem.id;
  }

  async markAsCompleted(itemId: number): Promise<void> {
    let todoLists: TodoList[] = [...this.appState.todoLists];
    let todoItems: TodoItem[] = [...this.appState.todoItems];

    let markItemIndex: number = todoItems.findIndex(item => item.id === itemId);
    todoItems[markItemIndex] = {...todoItems[markItemIndex], isCompleted: true};

    this.appState = {todoLists: todoLists, todoItems: todoItems};
    this.appState$.next(this.appState);
  }

  async deleteList(listId: number): Promise<void> {
    let todoLists: TodoList[] = [...this.appState.todoLists];
    let todoItems: TodoItem[] = [...this.appState.todoItems];

    todoLists = todoLists.filter(todoList => todoList.id !== listId);
    todoItems = todoItems.filter(todoItem => todoItem.listId !== listId);

    this.appState = {todoLists: todoLists, todoItems: todoItems};
    this.appState$.next(this.appState);
  }

  private static generateTodoListId(): number {
    return StateService.generatedTodoListId++;
  }

  private static generateTodoItemId(): number {
    return StateService.generatedTodoItemId++;
  }

}
