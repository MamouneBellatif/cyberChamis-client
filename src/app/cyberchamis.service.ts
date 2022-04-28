import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

export interface Chami {
  readonly login: string;
  readonly age: number;
  readonly defis: Defi[];
  readonly email: string;
}

export interface Defi {

  readonly id: string;
  readonly titre: string;
  readonly dateDeCreation: string;
  readonly description: string;
  readonly auteur: Chami;
}

@Injectable({
  providedIn: 'root'
})
export class CyberchamisService {

  constructor(private httpClient: HttpClient) { }

  addChami(userId: string, chami: Chami): Observable<Chami> {
    return this.httpClient.post<Chami>('http://localhost:8080/api/chamis/'+userId, chami);
  }

  addDefi(defiId:string, defi: Defi): Observable<Defi> {
    return this.httpClient.post<Defi>('http://localhost:8080/api/defis/'+defiId, defi);
  }

  deleteChami(userId: string): Observable<unknown> {
    return this.httpClient.delete('http://localhost:8080/api/chamis/'+userId);
  }

  deleteDefi(defiId: string): Observable<unknown> {
    return this.httpClient.delete('http://localhost:8080/api/defis'+defiId);
  }

  getChamiByEmail(chamiEmail: string): Observable<Chami> {
    return this.httpClient.get<Chami>('http://localhost:8080/api/chamis/', {params:{email:chamiEmail}});
  }

}
