import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html'
})
export class ListTasksComponent {
  public tasks: TaskVM[];
  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject('BASE_URL') baseUrl: string
  ) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"));
    const httpOptions = { headers: headers_object };
    http
      .get<TaskVM[]>(baseUrl + 'weatherforecast/List', httpOptions)
      .subscribe(result => {
        this.tasks = result;
      }
        //error => console.error(error)
      );
  }

  public onBtnClick() {
    this.router.navigate(['create-task']);
  }

  public onDeleteClick() {
    this.router.navigate(['delete-tasks']);
  }

}

interface TaskVM {
  id: number,
  name: string,
  isDeleted: boolean
}
