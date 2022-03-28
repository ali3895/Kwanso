import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { ListTasksComponent } from './list-tasks/list-tasks.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.gaurd';
import { AuthguradServiceService } from './authguard.service';
import { DeleteTasksComponent } from './delete-tasks/delete-tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CreateTaskComponent,
    ListTasksComponent,
    LoginComponent,
    RegisterComponent,
    DeleteTasksComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: 'list-tasks', canActivate: [AuthGuard] },
      { path: 'create-task', component: CreateTaskComponent, canActivate: [AuthGuard] },
      { path: 'list-tasks', component: ListTasksComponent, canActivate: [AuthGuard] },
      { path: 'delete-tasks', component: DeleteTasksComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ])
  ],
  providers: [
    //AuthGuard,
    //AuthguradServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
