import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttprequestService {

  constructor(private http: HttpClient) {

  }

  //Post Request From service
  public PostRequest(url: any, param: any) {
    return new Promise((resolve, reject) => {
      const header = new Headers();
      header.append("Content-Type", "application/json");
      let options = new HttpHeaders().set('Content-Type', 'application/json',);

      this.http.post(url, param, {
        headers: options,
      }).subscribe((resp: any) => {
        resolve(resp);

      }, error => {
        reject(error);
      });

    });
  }

  //Get Request From service
  public GetRequest(url) {
    return new Promise((resolve, reject) => {
      const header = new Headers();
      header.append("Content-Type", "application/json");
      let options = new HttpHeaders().set('Content-Type', 'application/json');
      this.http.get(url, {
        headers: options,
      }).subscribe(resp => {
        resolve(resp);
      }, error => {
        reject(error);
      });
    });
  }
}
