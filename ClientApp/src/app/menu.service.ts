import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public isSignedIn = new BehaviorSubject<any>(false);
  constructor() { }
}
