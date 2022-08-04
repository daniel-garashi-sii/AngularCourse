import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ListsComponent} from "./components/lists/lists.component";
import {ItemsComponent} from "./components/items/items.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {ListComponent} from "./components/list/list.component";
import {ListEditComponent} from "./components/list-edit/list-edit.component";
import {ListsGuard} from "./guards/lists.guard";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'lists', component: ListsComponent, canActivate: [ListsGuard]},
  {path: 'lists/:id', component: ListComponent},
  {path: 'lists/:id/edit', component: ListEditComponent},
  {path: 'items', component: ItemsComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
