import {Component, OnInit} from '@angular/core';
import {AppState} from "./core/models/app-state";
import {TodoList} from "./core/models/todo-list";
import {TodoItem} from "./core/models/todo-item";
import {StateService} from "./core/services/state.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ToDo-App';
  private appState: AppState = {todoLists: [], todoItems: []};

  constructor(private state: StateService) {

  }

  ngOnInit(): void {

  }



}
