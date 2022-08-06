import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {TodoItem} from "../../core/models/todo-item";
import {Router} from "@angular/router";
import {StateService} from "../../core/services/state.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  uncompletedItems$!: Observable<TodoItem[]>;
  isListEmpty$!: Observable<boolean>;

  constructor(private stateService: StateService, private router: Router) { }

  ngOnInit(): void {
    this.uncompletedItems$ = this.stateService.getAllNotCompletedItems();
    this.isListEmpty$ = this.uncompletedItems$.pipe(
      map(todoItems => todoItems.length === 0)
    );

  }

  async markAsCompleted(itemId: number): Promise<void>{
    await this.stateService.markAsCompleted(itemId);
  }

}
