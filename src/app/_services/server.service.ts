import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class ServerService {

  // private apiUrl = environment.apiUrlAndroidSim;
  // private apiUrl = environment.apiUrlAndroid;
    // private apiUrl = 'https://srugim.tapper.co.il/laravel/public/api';
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
   }



  async ServerGet(url: string): Promise<any> {
    return await new Promise((resolve, reject) => {
      const res =  this.http.get<any>(this.apiUrl + '/' + url);
      resolve(res);
    });
  }

  async ServerPost(url: string, body: object | FormData, headers?: any): Promise<any> {
    return await new Promise((resolve, reject) => {
      const res =  headers ?
                   this.http.post<any>(this.apiUrl + '/' + url, body, {headers: headers})
                   :
                   this.http.post<any>(this.apiUrl + '/' + url, body);
      resolve(res);
    });

  }

  async ServerPut(url: string, body: object | FormData): Promise<any> {
    return await new Promise((resolve, reject) => {
      const res =  this.http.put<any>(this.apiUrl + '/' + url, body);
      resolve(res);
    });

  }

  async ServerUpload(url: string, formData: FormData): Promise<any> {
    console.log(formData.getAll('image'));
    const headers = new HttpHeaders({'Content-Type': 'image/jpeg'});
    return await new Promise((resolve, reject) => {
      const res =  this.http.post<any>(`${this.apiUrl}/${url}`, formData);
      resolve(res);
    });
  }

  async ServerUploadDoc(url: string, formData: FormData): Promise<any> {
    console.log(formData.getAll('image'));
    const headers = new HttpHeaders({'Content-Type': 'application/pdf'});
    return await new Promise((resolve, reject) => {
      const res =  this.http.post<any>(`${this.apiUrl}/${url}`, formData);
      resolve(res);
    });
  }
}
