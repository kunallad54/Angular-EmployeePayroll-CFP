import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Emplpoyee } from '../model/emplpoyee';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient:HttpClient) { }

  getEmployeeData() : Observable<any>{
    return this.httpClient.get("http://localhost:8080/getEmployeeDetails");
  }

  addEmployeeData(data: Emplpoyee){
    return this.httpClient.post("http://localhost:8080/addEmployeeDetails",data);
  }
}
