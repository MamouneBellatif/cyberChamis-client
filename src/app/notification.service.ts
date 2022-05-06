import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  eventSource = new EventSource('http://localhost:8080/notification');

  constructor() { }
}
