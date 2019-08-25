import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Componente } from '../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getMenuOpt(){
    return this.http.get<Componente[]>('/assets/data/menu.json');
  }

  getInformacion(){
    return this.http.get('/vacac/vacac.pages.html');
  }
}
