import {Component, OnInit} from '@angular/core';
import {StateService} from "../../core/services/state.service";
import {Observable} from "rxjs";
import {AppState} from "../../core/models/app.state";
import {Router} from "@angular/router";
import {TodoItem} from "../../core/models/todo-item";

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

  constructor(private stateService: StateService, private router: Router) {
  }

  ngOnInit(): void {
    this.today = Date.now();
    this.appState$ = this.stateService.getAppState$;
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
