import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

// declare let EventSource:any;

@Component({
  selector: 'app-notification-component',
  templateUrl: './notification-component.component.html',
  styleUrls: ['./notification-component.component.scss']
})
export class NotificationComponentComponent implements OnInit {


  constructor() { }

  subscribe() {
    let eventSource = new EventSource("http://localhost:8080/stream");
    let subscription = new Subject();
    eventSource.addEventListener("message", event=> {
        console.info("Got event: " + event);
        subscription.next(event);
    });
    return subscription;
}


  connect(): void{
    console.log("event");
    let source = new EventSource('http://localhost:8080/stream');
    source.addEventListener('message',message => {
      let n: Notification;
      n = JSON.parse(message.data);
      console.log('connection sse'+message.data)
    })
  }

  ngOnInit(): void {
    // this.connect();
  }

}
