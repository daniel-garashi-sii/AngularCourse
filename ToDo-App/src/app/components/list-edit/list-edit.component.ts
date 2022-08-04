import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StateService} from "../../core/services/state.service";
import {TodoList} from "../../core/models/todo-list";
import {BehaviorSubject, Observable, switchAll} from "rxjs";
import {map} from "rxjs/operators";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Color} from "../../core/models/color";
import {COLORS} from "../../core/models/colors";
import {ICONS} from "../../core/models/icons";

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.css']
})
export class ListEditComponent implements OnInit {
  readonly colors: Color[] = COLORS;
  readonly icons: String[] = ICONS;

  todoListToEdit!: TodoList;
  listId!: number;
  todoList$!: Observable<TodoList>;
  todoListGroup!: FormGroup;

  selectedColor!: string;
  selectedColor$!: BehaviorSubject<string>;

  constructor(private stateService: StateService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    this.buildReactiveForm();
  }

  ngOnInit(): void {
    this.selectedColor = this.colors[0].code;
    this.selectedColor$ = new BehaviorSubject<string>(this.selectedColor);

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

    this.todoList$.subscribe({
      next: todoList => {
        if (todoList != null) {
          this.selectedColor = todoList.color;
          this.selectedColor$.next(this.selectedColor);

          this.control('caption')?.setValue(todoList.caption);
          this.control('description')?.setValue(todoList.description);
          this.control('icon')?.setValue(todoList.icon);
          this.control('color')?.setValue(todoList.color);
        }
      }
    });
  }

  buildReactiveForm(): void {
    this.todoListGroup = this.formBuilder.group({
      caption: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(6), this.containsMinWordsValidation(2)]],
      icon: ['', [Validators.required]],
      color: ['', [Validators.required]]
    });
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
      caption: this.control('caption').value,
      description: this.control('description').value,
      icon: this.control('icon').value,
      color: this.control('color').value
    };

    if (this.listId === -1) {
      await this.stateService.addList(todoList.caption, todoList.description, todoList.color, todoList.icon);
    } else {
      await this.stateService.modifyList(todoList);
    }

    this.todoListGroup.reset();
    await this.router.navigateByUrl('lists');
  }

}
