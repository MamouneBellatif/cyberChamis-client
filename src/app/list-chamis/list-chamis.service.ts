import { Injectable, OnInit } from '@angular/core';
import { Chami } from '../cyberchamis.service';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListChamisService  {

  readonly listChamisObs!: Observable<any>;

  private chamisListUrl = 'http://projet-integrateur-g5.herokuapp.com/api/chamis/';

  constructor(private httpClient: HttpClient) { }

  getChamis(): Observable<Chami[]> {
    return this.httpClient.get<Chami[]>(this.chamisListUrl);
  }

}
