import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  private studentsdata = "/assets/mock/students-mockData.json"

  constructor(private http: HttpClient) { }

  getStudentsDataWithOutImage():Observable<UserResponseData>{
    return this.http.get<UserResponseData>(this.studentsdata);
  }
}

export interface UserResponseData {
  data: { data:studentsData[]; }
}

export interface studentsData {
  name: string,
  age:number,
  rollNo:number,
  image: string,
  status: boolean,
}
