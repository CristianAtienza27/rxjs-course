import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { interval, fromEvent, timer } from 'rxjs';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    const interval$ = timer(3000, 1000);
    const sub = interval$.subscribe(value => console.log('stream 1' + value));

    setTimeout(() =>sub.unsubscribe(), 5000);

    const click$ = fromEvent(document, 'click');

    click$.subscribe(
      evt => console.log(evt),
      err => console.log(err),
      () => console.log('complete')
      );
  }

}
