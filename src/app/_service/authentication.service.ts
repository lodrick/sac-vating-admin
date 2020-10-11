import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { Candidate } from 'src/app/models/candidate';

let rootUrl = 'http://localhost:8080/api';
let config = {
  headers: {
    'Content-Type': 'application/json',
    'Access-control-Allow-Origin': '*',
  },
};
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  public _data: any;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(username, password) {
    console.log('Username: ' + username);
    console.log('Password: ' + password);

    const body = {
      username,
      password,
    };

    return this.http.post<any>(rootUrl + '/login', body).pipe(
      map((res) => {
        console.log(res);
        this._data = res;
        localStorage.setItem('currentUser', JSON.stringify(res));
        console.log(JSON.stringify(res));
        this.currentUserSubject.next(res);
        return res;
      })
    );
  }

  createUser(user: User) {
    let item = JSON.parse(localStorage.getItem('currentUser'));
    console.log('currentUserc ' + JSON.stringify(item));
    return this.http.post(rootUrl + '/admin', user).pipe(
      map((res) => {
        console.log(JSON.stringify(res));
        return res;
      })
    );
  }

  getUser(uid: number) {
    let item = JSON.parse(localStorage.getItem('currentUser'));
    console.log('currentUserGU: ' + JSON.stringify(item));
    return this.http.get<any>(rootUrl + '/deleteUser/{' + uid + '}').pipe(
      map((res) => {
        this.currentUserSubject.next(res);
        return res;
      })
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(rootUrl + '/admins').pipe(
      map((res) => {
        this.currentUserSubject.next(res);
        return res;
      })
    );
  }

  editUser(user: User) {
    let item = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.put<any>(rootUrl + '/updateadmin', user).pipe(
      map((res) => {
        this.currentUserSubject.next(res);
        return res;
      })
    );
  }

  //candidate method
  createCandidate(candidate: Candidate) {
    let item = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.post<any>(rootUrl + '/candidate', candidate).pipe(
      map((res) => {
        this.currentUserSubject.next(res);
        return res;
      })
    );
  }

  getCandidates(): Observable<Candidate[]> {
    let item = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.get<Candidate[]>(rootUrl + '/candidates').pipe(
      map((res) => {
        this.currentUserSubject.next(res);
        console.log(JSON.stringify(res));
        return res;
      })
    );
  }

  getOTP(): Observable<any> {
    let item = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.get<any>(rootUrl + '/otp').pipe(
      map((res) => {
        this.currentUserSubject.next(res);
        console.log(JSON.stringify(res));
        return res;
      })
    );
  }

  removeCandidate(id: number) {
    let item = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.delete(rootUrl + '/deleteCandidate/' + id).pipe(
      map((res) => {
        this.currentUserSubject.next(res);
        console.log(JSON.stringify(res));
        return res;
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
