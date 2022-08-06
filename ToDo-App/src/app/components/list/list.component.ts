import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs/operators";
import {BehaviorSubject, Observable, switchAll} from "rxjs";
import {TodoList} from "../../core/models/todo-list";
import {StateService} from "../../core/services/state.service";
import {TodoItem} from "../../core/models/todo-item";
import {FormControl, Validators} from "@angular/forms";
import {TodoListValidators} from "../../validators/todo-list-validators";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  todoList$!: Observable<TodoList>;
  listId!: number;

  todoItems$!: Observable<TodoItem[]>;
  todoItemControl: FormControl;
  private isCanDelete: boolean;
  isCanDelete$!: BehaviorSubject<boolean>;

  constructor(private stateService: StateService, private router: Router, private route: ActivatedRoute) {
    this.todoItemControl = new FormControl<string>('', [Validators.required, TodoListValidators.minCharactersValidation(5), TodoListValidators.containsMinWordsValidation(3)]);
    this.isCanDelete = false;
    this.isCanDelete$ = new BehaviorSubject<boolean>(this.isCanDelete);
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

  get getIsCanDelete$(){
    return this.isCanDelete$.asObservable();
  }

  async createNewList(): Promise<void> {
    await this.router.navigate(['lists', -1, 'edit']);
  }

  async deleteList(listId: number): Promise<void> {
    await this.stateService.deleteList(listId);
    await this.router.navigate(['lists']);
  }

  async editListDetails(listId: number): Promise<void> {
    await this.router.navigate(['lists', listId, 'edit']);
  }

  async markAsCompletedItem(itemId: number): Promise<void> {
    await this.stateService.markAsCompleted(itemId);
  }

  async addTodoItem(listId: number, caption: string): Promise<void>{
    await this.stateService.addTodoItem(listId, caption);

    this.todoItemControl.reset('');
  }

  checkAgainBeforeDeletion(): void{
    this.isCanDelete = !this.isCanDelete;
    this.isCanDelete$.next(this.isCanDelete);
  }

}
