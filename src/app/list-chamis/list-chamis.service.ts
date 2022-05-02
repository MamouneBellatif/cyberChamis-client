import { Injectable, OnInit } from '@angular/core';
import { Chami } from '../cyberchamis.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tooltip } from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class ListChamisService  {

  readonly listChamisObs!: Observable<Chami>;

  private chamisListUrl = environment.apiUrl+'chamis/';

  constructor(private httpClient: HttpClient) { }

  getChamis(): Observable<Chami[]> {
        console.log(localStorage.getItem("currentUserToken"))
let toto = this.httpClient.get<Chami[]>(this.chamisListUrl, 
        {headers: new HttpHeaders(
          {Authorization: JSON.parse(localStorage.getItem("currentUserToken") || '{""}')})}
    );
    console.log(toto)
    return toto;
  }

}
