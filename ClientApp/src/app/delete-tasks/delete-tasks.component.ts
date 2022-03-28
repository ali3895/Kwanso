import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-delete-tasks',
  templateUrl: './delete-tasks.component.html'
})
export class DeleteTasksComponent implements OnInit {
  public taskForm: FormGroup;
  public tasks: TaskVM[];
  public array: any = [];
  public baseUrl: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.baseUrl = baseUrl;
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"));
    const httpOptions = { headers: headers_object };
    http
      .get<TaskVM[]>(baseUrl + 'weatherforecast/List', httpOptions)
      .subscribe(result => {
        this.tasks = result;
        console.log(this.tasks);
      }
        //error => console.error(error)
      );
  }

  ngOnInit(): void {
    this.createForm();
  }

  public createForm() {
    this.taskForm = this.formBuilder.group({
      isChecked: [false]
    });
  }

  public onBtnClick() {
    var delRows = this.tasks.filter(x => x.isDeleted == true);
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"));
    const httpOptions = { headers: headers_object };
    this.http
      .post<any>(this.baseUrl + 'weatherforecast/delete-tasks', delRows, httpOptions)
      .subscribe(result => {
        this.router.navigate(['list-tasks']);
      }
        //error => console.error(error)
      );
  }

  public checkAllCheckBox(event, item) {
    this.tasks.find(x => x.id == item.id).isDeleted = event.target.checked;
  }

}

interface TaskVM {
  id: number,
  name: string,
  isDeleted: boolean
}
