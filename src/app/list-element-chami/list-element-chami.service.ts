import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Defi } from '../cyberchamis.service';

@Injectable({
  providedIn: 'root'
})
export class ListElementChamiService {
  private defisListUrl = environment.apiUrl+'defis/';

  constructor(private httpClient: HttpClient) { }

  getDefis(login: string){
    return this.httpClient.get<Defi[]>(this.defisListUrl+'chami/'+login, 
      {headers: new HttpHeaders(
        {Authorization: JSON.parse(localStorage.getItem("currentUserToken") || '{""}')})}
      );

  }
}
