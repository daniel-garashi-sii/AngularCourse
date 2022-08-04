import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { ListsComponent } from './components/lists/lists.component';
import { ItemsComponent } from './components/items/items.component';
import {AppRoutingModule} from "./app-routing.module";
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ListEditComponent } from './components/list-edit/list-edit.component';
import { ListComponent } from './components/list/list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import { ErrorsPresenterComponent } from './components/errors-presenter/errors-presenter.component';
import {MatSelectModule} from "@angular/material/select";
import { TodoItemPresenterComponent } from './components/todo-item-presenter/todo-item-presenter.component';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListsComponent,
    ItemsComponent,
    ToolbarComponent,
    ListEditComponent,
    ListComponent,
    PageNotFoundComponent,
    ErrorsPresenterComponent,
    TodoItemPresenterComponent,
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
