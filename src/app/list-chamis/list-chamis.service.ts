import { Injectable, OnInit } from '@angular/core';
import { Chami, ListDefis } from '../cyberchamis.service';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';



export interface ListChamis {
  readonly chamis: readonly Chami[];
}


@Injectable({
  providedIn: 'root'
})
export class ListChamisService  {


  readonly listChamisObs!: Observable<any>;

  private chamisListUrl = 'http://localhost:8080/api/chamis';


  constructor(private httpClient: HttpClient) { }

  getChamis(): Observable<ListChamis> {
    return this.httpClient.get<ListChamis>(this.chamisListUrl);
  }

}
