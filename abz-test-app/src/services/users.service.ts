import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { baseApiUrl } from "../shared/baseApiUrl";
import { registrationInfo } from 'src/shared/registrationInfo';
import { Positions } from '../shared/positions';
import { User } from 'src/shared/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  positions: Positions;
  id: number;
  constructor(private http: HttpClient) { }

  //get users from API from server and provide it to component
  getUsers(page, count):Observable<registrationInfo> {
    return this.http.get<registrationInfo>(baseApiUrl+ "users?page=" + page + "&count=" + count);
  }

  //get positions from API from server and provide it to component
  getPositions():Observable<Positions> {
    return this.http.get<Positions>(baseApiUrl + "positions");
  }

  //get token from API from server and provide it to component
  getToken():Observable<any> {
    return this.http.get<any>(baseApiUrl + "token");
  }

/*submitting form, send post request with headers_>token, get anwser 
and provide it to component*/
  submitForm(data: FormData, token: string) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Token': token
      })
    }
    return this.http.post<any>(baseApiUrl + "users", data, httpOptions);
  }
}
