import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StateService} from "../../core/services/state.service";
import {TodoList} from "../../core/models/todo-list";
import {BehaviorSubject, filter, Observable, Subscription, switchAll} from "rxjs";
import {map} from "rxjs/operators";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Color} from "../../core/models/color";
import {COLORS} from "../../core/models/colors";
import {ICONS} from "../../core/models/icons";
import {TodoListValidators} from "../../validators/todo-list-validators";

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.css']
})
export class ListEditComponent implements OnInit, OnDestroy {
  readonly colors: Color[] = COLORS;
  readonly icons: String[] = ICONS;

  listId!: number;
  todoList$!: Observable<TodoList>;
  todoListGroup!: FormGroup;

  selectedColor!: string;
  selectedColor$!: BehaviorSubject<string>;

  todoLists$!: Observable<TodoList[]>;

  private subscriptions = new Subscription();

  constructor(private stateService: StateService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    this.buildReactiveForm();
  }

  ngOnInit(): void {
    this.selectedColor = this.colors[0].code;
    this.selectedColor$ = new BehaviorSubject<string>(this.selectedColor);

    this.todoLists$ = this.stateService.getAllLists();

    const listId$ = this.route.params.pipe(
      map(param => Number(param['id']))
    );

    this.todoList$ = listId$.pipe(
      map(listId => {
        this.listId = listId;
        return this.stateService.getListById(listId)
      }),
      switchAll()
    );

    const todoListSubscription: Subscription = this.todoList$.subscribe({
      next: todoList => {
        if (todoList != null) {
          this.selectedColor = todoList.color;
          this.selectedColor$.next(this.selectedColor);
          //change this
          this.control('caption')?.setValue(todoList.caption);
          this.control('description')?.setValue(todoList.description);
          this.control('icon')?.setValue(todoList.icon);
          this.control('color')?.setValue(todoList.color);
        }
      }
    });
    this.subscriptions.add(todoListSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  buildReactiveForm(): void {
    this.todoListGroup = this.formBuilder.group({
        caption: ['', [Validators.required]],
        description: ['',[Validators.required, TodoListValidators.minCharactersValidation(5), TodoListValidators.containsMinWordsValidation(3)]],
        icon: ['', [Validators.required]],
        color: ['', [Validators.required]]
      },
      {validators: [TodoListValidators.iconAndColorValidation('flag', {name: 'red', code: '#FF0000FF'})]}
    );
  }

  control(name: string): FormControl<any> {
    return this.todoListGroup.get(name)! as FormControl<any>;
  }

  containsMinWordsValidation(minWords: number): (control: AbstractControl) => null | ValidationErrors {
    return ctrl => {
      const description = ctrl.value;
      if (typeof (description) !== 'string') return null;

      const words = description.trim().split(' ');
      const countWords = words.length;

      if (countWords >= minWords) return null;

      return {
        'minWords': {
          requiredMinWords: minWords,
          actualWords: countWords
        }
      }
    }
  }

  async saveTodoList(): Promise<void> {
    const todoList: TodoList = {
      id: this.listId,
      ...this.todoListGroup.value
    };

    if (this.listId === -1) {
      await this.stateService.addList(todoList.caption, todoList.description, todoList.color, todoList.icon);
    } else {
      await this.stateService.modifyList(todoList);
    }

    this.todoListGroup.reset();
    await this.router.navigateByUrl('lists');
  }

  async toTodoList(listIdAsString: string): Promise<void> {
    const listId: number = Number(listIdAsString);

    await this.router.navigate(['lists', listId, 'edit']);
  }

}
