import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Defi } from '../cyberchamis.service';

@Injectable({
  providedIn: 'root'
})
export class ListDefisService {

  readonly listDefisObs!: Observable<Defi[]>;

  private listDefisUrl = 'http://projet-integrateur-g5.herokuapp.com/api/defis/';

  constructor(private httpClient: HttpClient) { }

  getDefis(): Observable<Defi[]> {
    return this.httpClient.get<Defi[]>(this.listDefisUrl);
  }

}
