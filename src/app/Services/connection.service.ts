import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Todo} from '../../shared/Model/app.types'

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
private apiUrl='https://jsonplaceholder.typicode.com'
  private httpClient=inject(HttpClient);
  fetchData():Observable<Todo[]>{
  return this.httpClient.get<Todo[]>(this.apiUrl+'/todos')
  }
}

