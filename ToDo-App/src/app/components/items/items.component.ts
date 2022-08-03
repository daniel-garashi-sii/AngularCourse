import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {TodoItem} from "../../core/models/todo-item";
import {Router} from "@angular/router";
import {StateService} from "../../core/services/state.service";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  uncompletedItems$!: Observable<TodoItem[]>;

  constructor(private stateService: StateService, private router: Router) { }

  ngOnInit(): void {
    this.uncompletedItems$ = this.stateService.getAllNotCompletedItems();
  }

}
