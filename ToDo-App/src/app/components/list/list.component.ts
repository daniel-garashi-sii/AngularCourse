import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs/operators";
import {Observable, switchAll} from "rxjs";
import {TodoList} from "../../core/models/todo-list";
import {StateService} from "../../core/services/state.service";
import {TodoItem} from "../../core/models/todo-item";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  todoList$!: Observable<TodoList>;
  listId!: number;

  todoItems$!: Observable<TodoItem[]>;

  constructor(private stateService: StateService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const listId$ = this.route.params.pipe(
      map(params => Number(params['id']))
    );

    this.todoList$ = listId$.pipe(
      map(listId => this.stateService.getListById(listId)),
      switchAll()
    );

    this.todoItems$ = listId$.pipe(
      map(listId => this.stateService.getItemsOfList(listId)),
      switchAll()
    );
  }

  async createNewTodoList(): Promise<void> {
    await this.router.navigate(['lists', -1, 'edit']);
  }

  async deleteTodoList(listId: number): Promise<void> {
    await this.stateService.deleteList(listId);
    await this.router.navigate(['lists']);
  }

  async editListDetails(listId: number): Promise<void> {
    await this.router.navigate(['lists', listId, 'edit']);
  }

  async markAsCompletedItem(itemId: number): Promise<void>{
    await this.stateService.markAsCompleted(itemId);
  }
}
