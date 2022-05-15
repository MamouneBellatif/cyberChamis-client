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

  initialize() {
		// const eventSource = new EventSource('http://localhost:8080/notification');
		const eventSource = new EventSource('https://projet-integrateur-g5.herokuapp.com/notification');
		eventSource.onmessage = e => {
			const msg = e.data;
    console.log("msg: " + msg)
    };
		eventSource.onopen = e => console.log('open');
		eventSource.onerror = e => {
				console.log(e);
		};
		eventSource.addEventListener('second', e => {
			console.log('second', e.data);
		}, false);}

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
    source.addEventListener('update',message => {
      console.log('connection sse'+message.data);
      let n: Notification;
      n = JSON.parse(message.data);
    })
  }

  ngOnInit(): void {
    // this.connect();
    this.initialize();
  }

}
