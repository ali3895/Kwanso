import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html'
})
export class CreateTaskComponent implements OnInit {
  public taskForm: FormGroup;
  public baseUrl: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.baseUrl = baseUrl;
  }


  ngOnInit(): void {
    this.createForm();
  }

  public createForm() {
    this.taskForm = this.formBuilder.group({
      taskName: ['']
    });
  }

  public addTask_OnClick() {
    const obj = {
      Name: this.taskForm.controls['taskName'].value
    }
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"));
    const httpOptions = { headers: headers_object };
    this.http
      .post<any>(this.baseUrl + 'weatherforecast/add-task', obj, httpOptions)
      .subscribe(result => {
        this.router.navigate(['list-tasks']);
      }
        //error => console.error(error)
      );
  }
}
