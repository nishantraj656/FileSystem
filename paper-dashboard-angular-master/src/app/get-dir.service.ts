import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetDirService {
  constructor(private _http:HttpClient ) { }
  _url ='http://localhost:3000/getDir';
  httpOptions = {
    headers:new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept':'application/json',     
    })
  }

  getDir()
  {
    return this._http.get<any>(this._url,this.httpOptions)
  }
  
}
