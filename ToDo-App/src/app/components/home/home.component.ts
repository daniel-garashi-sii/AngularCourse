import {Component, OnInit} from '@angular/core';
import {StateService} from "../../core/services/state.service";
import {Observable} from "rxjs";
import {AppState} from "../../core/models/app.state";
import {Router} from "@angular/router";
import {TodoItem} from "../../core/models/todo-item";
import {map} from "rxjs/operators";
import {TodoList} from "../../core/models/todo-list";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Todo app';
  developerName: string = 'Daniel Garashi';
  today!: number;

  appState$!: Observable<AppState>;
  allToDoListsCount$!: Observable<number>;
  allITodoItemsCount$! : Observable<number>;
  allNotCompletedItemsCount$!: Observable<number>;

  constructor(private stateService: StateService, private router: Router) {
  }

  ngOnInit(): void {
    this.today = Date.now();
    this.appState$ = this.stateService.getAppState$;
    this.allToDoListsCount$ = this.getAllTodoLists().pipe(
      map(todoLists => todoLists.length)
    );
    this.allITodoItemsCount$ = this.getAllTodoItems().pipe(
      map(todoItems => todoItems.length)
    );
    this.allNotCompletedItemsCount$ = this.getAllNotCompletedItems().pipe(
      map(todoItems => todoItems.length)
    );
  }
  getAllTodoItems(): Observable<TodoItem[]> {
    return this.stateService.getAllItems();
  }

  getAllTodoLists(): Observable<TodoList[]> {
    return this.stateService.getAllLists();
  }

  getAllNotCompletedItems(): Observable<TodoItem[]> {
    return this.stateService.getAllNotCompletedItems();
  }

  async createNewList(): Promise<void> {
    await this.router.navigate(['lists', -1, 'edit']);
  }

  async gotoTodoLists(): Promise<void> {
    await this.router.navigateByUrl('lists');
  }

  async gotoTodoItems(): Promise<void> {
    await this.router.navigateByUrl('items');
  }
}
