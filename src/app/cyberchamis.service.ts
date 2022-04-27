import { Injectable } from '@angular/core';

export interface Chami {
  readonly login: string;
  readonly age: number;
  readonly defis: Defi[];
}

export interface Defi {
  readonly id: string;
  readonly titre: string;
  readonly dateDeCreation: Date;
  readonly description: string;
  readonly auteur: Chami;
}

@Injectable({
  providedIn: 'root'
})
export class CyberchamisService {

  constructor() { }

  /*format2Chiffres(num: number) : string {
    return num.toString().padStart(2, '0');
  }

  formatDate(date: Date) : string {
    return (
      [
        this.format2Chiffres(date.getDate()),
        this.format2Chiffres(date.getMonth() + 1),
        date.getFullYear(),
      ].join('/') +
      ' ' +
      [
        this.format2Chiffres(date.getHours()),
        this.format2Chiffres(date.getMinutes()),
        this.format2Chiffres(date.getSeconds()),
      ].join(':')
    );
  }*/
  
}
