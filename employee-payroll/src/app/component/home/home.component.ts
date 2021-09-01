import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emplpoyee } from 'src/app/model/emplpoyee';
import { DataService } from 'src/app/service/data.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  employeeCount: number = 10;
  employeeDetails: Emplpoyee[] = [];
  message!: string;

  constructor(private httpService: HttpService, private router: Router,
    private dataService: DataService,) { }

  /**
   * Purpose : To get data of employees from database with the help HttpService methods
   *           and print the data on the console wiht help of subscribe
   */
  ngOnInit(): void {
    this.httpService.getEmployeeData().subscribe(data => {
      this.employeeDetails = data.data;
      this.employeeCount = this.employeeDetails.length;
      console.log(this.employeeDetails);
    });
  }

  /**
   * Purpose: When the remove() is hit, the employee gets deleted from
   *          the database and also the details is removed from the HOME page.
   *          Thus, a refreshed home page is rendered.
   * 
   * @param id remove() is invoked for a particular employee id.
   */
  remove(id: number): void {
    this.httpService.deleteEmployeeData(id).subscribe(data => {
      console.log(data);
      this.ngOnInit();
    });
  }

  /**
   * Purpose : When the update() method is called ,it gets navigated to url given below a
   *           to AddComponent with id defined that is particular id is given and then with 
   *           help of dataservice we are able to update the employee details .
   * 
   * @param employee details with particular id 
   */
  update(employee: Emplpoyee) {
    this.dataService.changeEmployee(employee);
    this.router.navigateByUrl('/form/' + employee.empId);
  }

}
