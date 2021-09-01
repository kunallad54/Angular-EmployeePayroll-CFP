import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Emplpoyee } from '../model/emplpoyee';

@Injectable({
  providedIn: 'root'
})
/**
 *Purpose : A Data service can be used by any component and thus 
 *          it acts as a common data point from which data can
 *          be distributed to any component in the application
 */
export class DataService {


  /**
   * BehaviorSubject ensures that the component consuming 
   * the service receives the last updated data even if there
   * are no new updates since the component's subscription to this data.
   */
  private employeeSource = new BehaviorSubject(new Emplpoyee());
  currentEmployee = this.employeeSource.asObservable();

  constructor() { }

  changeEmployee(employee: Emplpoyee) {
    this.employeeSource.next(employee);
  }
}
