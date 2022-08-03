import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {firstValueFrom, Observable, take} from 'rxjs';
import {StateService} from "../core/services/state.service";
import {TodoList} from "../core/models/todo-list";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ListsGuard implements CanActivate {

  constructor(private stateService: StateService, private router: Router) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const todoLists: TodoList[] = await firstValueFrom(this.stateService.getAllLists());

    if (todoLists == null || todoLists.length === 0) {
      return await this.router.navigate(['lists', -1, 'edit']);
    }

    return true;
  }

}
