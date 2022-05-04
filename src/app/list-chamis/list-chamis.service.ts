import { Injectable, OnInit } from '@angular/core';
import { Chami, Defi } from '../cyberchamis.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, lastValueFrom, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tooltip } from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class ListChamisService  {

  //readonly listChamisObs!: Observable<Chami>;
  // URL de l'API chamis
  private chamisListUrl = environment.apiUrl+'chamis/';

  constructor(private httpClient: HttpClient) { }

  /**
   * 
   * @returns La promesse de la liste de tous les Chamis
   */
  async getChamis(): Promise<Chami[]> {
    return await lastValueFrom(this.httpClient.get<Chami[]>(this.chamisListUrl, 
        {headers: new HttpHeaders(
          {Authorization: JSON.parse(localStorage.getItem("currentUserToken") || '{"":""}')})}
    ));
  }


}
