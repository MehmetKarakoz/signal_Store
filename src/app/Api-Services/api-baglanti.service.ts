import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Todo} from '../app.types/app.types'

@Injectable({
  providedIn: 'root'
})
export class ApiBaglantiService {
private apiUrl='https://jsonplaceholder.typicode.com'
  private httpClient=inject(HttpClient);
  fetcData():Observable<Todo[]>{
  return this.httpClient.get<Todo[]>(this.apiUrl+'/todos')
  }
}
