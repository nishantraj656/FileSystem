import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetDirService {
  constructor(private _http:HttpClient ) { }
  _url ='http://localhost:3000/dir';
  httpOptions = {
    headers:new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept':'application/json',     
    })
  }

  getDir(path)
  {
    return this._http.post<any>(this._url,{path:path},this.httpOptions)
  }

  
  
}
