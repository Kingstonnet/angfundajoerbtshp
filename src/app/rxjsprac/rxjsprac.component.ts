import { NumberSymbol } from '@angular/common';
import { Component } from '@angular/core';
import { filter, from, fromEvent, map, of, pluck } from 'rxjs';

@Component({
  selector: 'bot-rxjsprac',
  templateUrl: './rxjsprac.component.html',
  styleUrls: ['./rxjsprac.component.css'],
})
export class RxjspracComponent {
  bookArray = [
    { title: 'Book 1', author: 'Author 1', year: 2001 },
    { title: 'Book 2', author: 'Author 2', year: 2002 },
    { title: 'Book 3', author: 'Author 3', year: 2003 },
  ];
  bookobservable$ = of(...this.bookArray);
  constructor() {}

  ngOnInit() {
    let i = 0;
    this.bookobservable$.subscribe((book) => {
      i = i + 1;
      console.log('Book emitted:' + i, book);
    });

    // let okbutton = document.createElement('button');
    // let clickobservable$ = fromEvent(okbutton, 'click');
    // clickobservable$.subscribe(() => {
    //   console.log('OK button clicked');
    // });

    let num$ = from([1, 2, 3]);
    // num$.subscribe((n) => {
    //   console.log('Number emitted:', n);
    // });

    let observer={
      next: (value:any) => console.log('Next value:',value),
      error: (err:any) => console.error('Error occurred:',err),
      complete: () => console.log('Observable completed')
    }
    
    num$.subscribe(observer);


  let num2$ = from([10, 20, 30,0,12]);

    num2$.pipe(
        filter((n) => n > 10),
        map(positivenum=>positivenum*3) 
    ).subscribe(observer);


    let nums=[2,4,6,8,10];

    let numobservable$=from(nums);

    numobservable$.subscribe( (value:any) => console.log('Next values:',value),
       (err:any) => console.error('Error occurred:',err),
       () => console.log('Observable completed'));


       let click$=fromEvent(document,'click');

       click$.pipe(
        pluck('clientX'),
       )
       .subscribe(
        (value)=>console.log('Click event:',value),
        (err)=>console.error('Error occurred:',err),
        () => console.log('Observable completed')
       )
  }
}
