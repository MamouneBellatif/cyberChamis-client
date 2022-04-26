import { Injectable } from '@angular/core';

export interface Chami {
  readonly login: string;
  readonly age: number;
  readonly defisCrees: number;
}

export interface ListChamis {
  readonly chamis: readonly Chami[];
}

export interface Defi {
  readonly id: string;
  readonly titre: string;
  readonly auteur: Chami;
  readonly dateDeCreation: string; // techniquement dateDeCreation est une Date mais sera formattée à l'aide de la fonction formatDate qui retourne une chaine de caractères.
  readonly description: string;
}

export interface ListDefis {
  readonly defis: readonly Defi[];
}

@Injectable({
  providedIn: 'root'
})
export class CyberchamisService {

  constructor() { }

  format2Chiffres(num: number) : string {
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
  }
}
