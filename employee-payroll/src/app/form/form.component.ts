import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Emplpoyee } from '../model/emplpoyee';
import { HttpService } from '../service/http.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {

  /**
   * Array of objects to store departments
   */
  Departments: Array<any> = [
    {
      id: 1,
      name: "HR",
      value: "HR",
    },
    {
      id: 2,
      name: "Sales",
      value: "Sales",

    },
    {
      id: 3,
      name: "Finance",
      value: "Finance",

    },
    {
      id: 4,
      name: "Engineer",
      value: "Engineer",

    },
    {
      id: 5,
      name: "Other",
      value: "Other",

    }
  ]

  emplpoyee = new Emplpoyee;
  public employeeFormGroup: FormGroup;
  constructor(private fb: FormBuilder, private httpService: HttpService) {
    this.employeeFormGroup = this.fb.group({
      empName: new FormControl(''),
      empProfilePic: new FormControl(''),
      empGender: new FormControl(''),
      empDepartment: this.fb.array([], [Validators.required]),
      empSalary: new FormControl(''),
      startDate: new FormControl(''),
      note: new FormControl('')
    })
  }

  /**
  * On change event for checkbox. In this we can select multiple checkobox 
  * for department and store is as an array.
  * @param event 
  */
  onCheckboxChange(event: MatCheckboxChange) {
    const empDepartment: FormArray = this.employeeFormGroup.get('empDepartment') as FormArray;

    if (event.checked) {
      empDepartment.push(new FormControl(event.source.value));
    } else {
      const index = empDepartment.controls.findIndex(x => x.value === event.source.value);
      empDepartment.removeAt(index);
    }
  }


  /**
   * To read Salary value from slider
   */
  salary: number = 400000;
  updateSetting(event: any) {
    this.salary = event.value;
  }
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }
  ngOnInit(): void {
  }

  /**
   * Submit Form
   */
  submit() {
    this.emplpoyee = this.employeeFormGroup.value;
    // console.log(this.emplpoyee);
    // console.log(this.employeeFormGroup.value);
    this.httpService.addEmployeeData(this.emplpoyee).subscribe(respond => {
      console.log(respond);
    });
  }

}
