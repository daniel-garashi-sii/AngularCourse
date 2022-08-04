import {Component, OnInit} from '@angular/core';
import {StateService} from "../../core/services/state.service";
import {Router} from "@angular/router";
import {TodoList} from "../../core/models/todo-list";
import {Observable} from "rxjs";

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  todoLists$!: Observable<TodoList[]>;

  constructor(private stateService: StateService, private router: Router) {
  }

  ngOnInit(): void {
    this.todoLists$ = this.stateService.getAllLists();
  }

  async addNewList(): Promise<void> {
    await this.router.navigate(['lists', -1, 'edit']);
  }

  async selectedList(listId: number): Promise<void> {
    this.router.navigate(['lists', listId]).then();

  }

}
