import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Emplpoyee } from '../model/emplpoyee';
@Injectable({
  providedIn: 'root'
})

/**
 * Purpose : The $http service is a core AngularJS service that facilitates communication 
 *           with the remote HTTP servers via the browser's XMLHttpRequest object or via JSONP.
 */
export class HttpService {

  baseURL: string = "http://localhost:8080/";
  constructor(private httpClient: HttpClient) { }

  /**
   * Purpose : GET request method to hit the HTTP server.
   * 
   * @returns  the get request response.
   */
  getEmployeeData(): Observable<any> {
    return this.httpClient.get(this.baseURL + "getEmployeeDetails");
  }

  /**
   * Purpose : Adding employee data  to request for post method to hit the HTTP server.
   * 
   * @param data employee details to be stored in the database.
   * @returns the post request response.
   */

  addEmployeeData(data: Emplpoyee) : Observable<any>{
    return this.httpClient.post(this.baseURL + "addEmployeeDetails", data);
  }

  /**
   * Purpose : DELETE request method to hit the HTTP server.
   * 
   * @param id employee_id for which the delete action needs to be taken.
   * @returns the delete request response.
   */

  deleteEmployeeData(id: number): Observable<any> {

    return this.httpClient.delete(this.baseURL + "deleteEmployeeDetails", {
      headers: new HttpHeaders(),
      params: new HttpParams().append("id", id),
    });
  }


  /**
   * Purpose : UPDATE Operation Performed i.e PUT request method to hit the HTTP SERVER
   * 
   * @param id  employee_id for which update action needs to be taken
   * @param data employee details of that particular id
   * @returns the put request response
   */
  updateEmployeeData(id: number, data: any): Observable<any> {
    return this.httpClient.put(this.baseURL + "updateEmployeeDetails?id=" + id, data);
  }

}
