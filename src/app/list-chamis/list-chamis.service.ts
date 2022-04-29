import { Injectable, OnInit } from '@angular/core';
import { Chami } from '../cyberchamis.service';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListChamisService  {

  readonly listChamisObs!: Observable<any>;

  private chamisListUrl = 'http://localhost:8080/api/users/';

  constructor(private httpClient: HttpClient) { }

  getChamis(): Observable<Chami[]> {
    return this.httpClient.get<Chami[]>(this.chamisListUrl);
  }

}
