import { Component, OnInit } from '@angular/core';
import { Emplpoyee } from 'src/app/model/emplpoyee';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  emplpoyee = new Emplpoyee;
  
  constructor(private httpService:HttpService) { 
    
  }

  ngOnInit(): void {
    
  }

  submit(){
    this.httpService.addEmployeeData(this.emplpoyee).subscribe(respond =>{
      console.log(respond);
    });
    console.log(this.emplpoyee);
  }
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

}
