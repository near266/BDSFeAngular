import { Injectable } from '@angular/core';
import { Observable, fromEvent, merge, Subject, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdleService {
  private idle$!: Observable<any>;
  private timer$!: any;
  private timeOutMilliSeconds!: number;
  private idleSubscription!: any;

  public expired$: Subject<boolean> = new Subject<boolean>();

  constructor() {

  }

  public startWatching(timeOutSeconds: any): Observable<any> {
    this.idle$ = merge(
      //  fromEvent(document, 'mousemove'),
      //  fromEvent(document, 'click'),
      //  romEvent(document, 'mousedown'),
      //  fromEvent(document, 'keypress'),
      //  fromEvent(document, 'DOMMouseScroll'),
      //  fromEvent(document, 'mousewheel'),
      //  fromEvent(document, 'touchmove'),
      //  fromEvent(document, 'MSPointerMove'),
      //  fromEvent(document, 'touchstart'),
      //  fromEvent(document, 'touchend'),
      fromEvent(window, 'mousemove'),
      fromEvent(window, 'resize'),
      fromEvent(document, 'keydown')
    );

    this.timeOutMilliSeconds = timeOutSeconds * 1000;

    this.idleSubscription = this.idle$.subscribe((res) => {
      this.resetTimer();
    });

    this.startTimer();

    return this.expired$;
  }

  private startTimer() {
    this.timer$ = timer(this.timeOutMilliSeconds, this.timeOutMilliSeconds).subscribe((res) => {
      this.expired$.next(true);
    });
  }

  public resetTimer() {
    this.timer$.unsubscribe();
    this.startTimer();
  }

  public stopTimer() {
    this.timer$.unsubscribe();
    this.idleSubscription.unsubscribe();
  }
}
