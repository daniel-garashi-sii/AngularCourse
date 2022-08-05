import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-todo-item-presenter',
  templateUrl: './todo-item-presenter.component.html',
  styleUrls: ['./todo-item-presenter.component.css']
})
export class TodoItemPresenterComponent implements OnInit {
  @Input()
  caption!: string;

  @Input()
  isCompleted!: boolean;

  @Output()
  completedEmitter: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }

  itemCompleted(): void{
    this.completedEmitter.emit();
  }

}
