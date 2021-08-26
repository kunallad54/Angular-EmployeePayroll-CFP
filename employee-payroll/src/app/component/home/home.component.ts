import { Component, OnInit } from '@angular/core';
import { Emplpoyee } from 'src/app/model/emplpoyee';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  employeeCount:number= 10;
  employeeDetails:Emplpoyee[]=[];
  constructor(private httpService:HttpService) { }

  ngOnInit(): void {
    this.httpService.getEmployeeData().subscribe(data => {
      this.employeeDetails = data.data;
      this.employeeCount = this.employeeDetails.length;
      console.log(this.employeeDetails);
    });
  }

}
