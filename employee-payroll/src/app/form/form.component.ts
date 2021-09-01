import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Emplpoyee } from '../model/emplpoyee';
import { DataService } from '../service/data.service';
import { HttpService } from '../service/http.service';
import { DialogBoxComponent } from '../component/dialog-box/dialog-box.component';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})

export class FormComponent implements OnInit {

  emplpoyee = new Emplpoyee;
  public employeeFormGroup: FormGroup;
  message!: string;
  /**
   * Array of objects to store departments
   */
  Departments: Array<any> = [
    {
      id: 1,
      name: "HR",
      value: "HR",
      checked: false,
    },
    {
      id: 2,
      name: "Sales",
      value: "Sales",
      checked: false,
    },
    {
      id: 3,
      name: "Finance",
      value: "Finance",
      checked: false,
    },
    {
      id: 4,
      name: "Engineer",
      value: "Engineer",
      checked: false,
    },
    {
      id: 5,
      name: "Other",
      value: "Other",
      checked: false,
    }
  ]


  /**
   * Purpose : To create a constructor and to define all properties of Employee Class
   *           and create FormControl and FormBuilder respectively for each and every property
   *           and define Validators
   * 
   * @param fb is a reference for Form Builder 
   * @param httpService is a reference for HttpService 
   * @param dataService is a reference for DataService Class
   * @param route is a reference for Activated Route
   */
  constructor(

    private fb: FormBuilder,
    private httpService: HttpService,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    /**
     * Added Validators
     */
    this.employeeFormGroup = this.fb.group({

      empName: new FormControl('', [Validators.required, Validators.pattern("^[A-Z][a-zA-z\\s]{2,}$")]),
      empProfilePic: new FormControl('', Validators.required),
      empGender: new FormControl('', Validators.required),
      empDepartment: this.fb.array([], Validators.required),
      empSalary: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      note: new FormControl('', Validators.required),

    })
  }

  /**
  * Purpose : This method is used for Department Array that is declared above ...when this method
  *           is called it stores the elements that are selected or checked in the FormArray
  *           When any value is checked it is pushed in department variable and when the value
  *           is unchecked it is removed from department variable array
  * 
  * @param event is a variable which captures the event when user checks or unchecks the values and accordinly
  *        this method stores the value of checked values in array of department as FormArray 
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
   * Purpose : It is used to get or capture the value of salary from the slider.
   *           The value in the formatLabel() it defines the interval in the slider value 
   *           which is set to 1000.
   * 
   * @param event is basically used to capture the value if slider and store it in salary variable
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


  /**
   * Purpose : To get the value of properties from employeeFormGroup by givin employee ID
   *           and then set the value and update it in the DB as well and it is called when
   *           user clicls on edit/update button on UI
   */
  ngOnInit(): void {

    if (this.route.snapshot.params['id'] != undefined) {

      this.dataService.currentEmployee.subscribe(employee => {

        if (Object.keys(employee).length !== 0) {

          this.employeeFormGroup.patchValue({
            empName: employee.empName,
            empProfilePic: employee.empProfilePic,
            empGender: employee.empGender,
            empSalary: employee.empSalary,
            startDate: employee.startDate,
            note: employee.note
          });

          const empDepartment: FormArray = this.employeeFormGroup.get('empDepartment') as FormArray;

          /**
           *  As EmpDepartment is of FormArray so here we are iterating the departments values from index 0 till
           *  Array length and values are matched with current id's department values
           *  then it keeps those values checked and when user updates the department values it pushes it again
           */
          employee.empDepartment.forEach(departmentElement => {

            for (let index = 0; index < this.Departments.length; index++) {

              if (this.Departments[index].name == departmentElement) {

                this.Departments[index].checked = true;
                empDepartment.push(new FormControl(this.Departments[index].value));

              }

            }

          })

        }
      });
    }
  }

  /**
   * Purpose : To add dialog box for displaying messages
   *           The function this.dialog.open() runs in the DialogBoxComponent 
   *           at the same time as the dialogConfig object. 
   *           The object holds the message and other properties if it's lying.
   * 
   * @param data is the message that needs to be displayed on UI 
   */
  openDialog(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = data;
    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);
    /**
     * defines the timer for which message will be visible on UI
     */
    setTimeout(() => {
      dialogRef.close();
    }, 1500);
  }

  /**
   * Submit Form
   * Purpose : This method is used for Error-Validation,and for Put and Post Request.
   *           
   *           - Initially it validates the whole form whether proper inputs are given by end user or not.
   *           - Using mat-error>, the name, date, and text box show an error, 
   *             and the profilePic, gender, department, and salary bring up a dialogue box.
   *           - If URL contains an ID then update method i.e PUT request is called if not then 
   *             add method i.e POST request is called.
   *           - Once either of the methods get executed, the respond data is consoled on
   *             screen to verify its status.
   *           - Finally the page gets redirected to the home page and a message is displayed to the user.
   */
  submit() {
    var dateString = this.employeeFormGroup.get('startDate')?.value;
    var myDate = new Date(dateString);
    var today = new Date();
    if (myDate > today) {
      this.message = "StartDate should not be future date. It should be past or present date.";
      this.openDialog(this.message);
    }
    if (this.employeeFormGroup.invalid) {
      if (this.employeeFormGroup.get('empDepartment')?.value.length == 0) {
        this.message = "Department is empty";
        this.openDialog(this.message);
      }
      else {
        this.message = "1. Profile Pic required" + "\n" +
          "2. Gender required" + "\n" +
          "3. Minimum Salary should be more than 10000";
        this.openDialog(this.message);
      }
    }
    else {
      this.emplpoyee = this.employeeFormGroup.value;
      if (this.route.snapshot.params['id'] != undefined) {
        this.httpService.updateEmployeeData(this.route.snapshot.params['id'], this.emplpoyee).subscribe(data => {
          console.log(data);
          this.message = data.message;
          this.openDialog(this.message);
          this.router.navigateByUrl("/home");
        });
      }
      else {
        this.httpService.addEmployeeData(this.emplpoyee).subscribe(res => {
          console.log(res);
          // this.message = res.message; 
          this.openDialog(this.message);
          this.router.navigateByUrl("/home");
        });
      }
    }
  }

  /**
   * Purpose : This method is used for validating employee Name and note 
   * 
   * @param controlName value add in the input tag 
   * @param errorName error value got from the mat-error tag
   * @returns the error value 
   */
  public checkError = (controlName: string, errorName: string) => {
    return this.employeeFormGroup.controls[controlName].hasError(errorName);
  }

}
