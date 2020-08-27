import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { baseApiUrl } from "../shared/baseApiUrl";
import { registrationInfo } from 'src/shared/registrationInfo';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(page, count):Observable<registrationInfo> {
    return this.http.get<registrationInfo>(baseApiUrl+ "users?page=" + page + "&count=" + count);
  }

  getMoreUsers(url):Observable<registrationInfo> {
    return this.http.get<registrationInfo>(url);
  }
}
