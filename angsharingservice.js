    import { Injectable } from '@angular/core';
    import { BehaviorSubject } from 'rxjs';

    @Injectable({
      providedIn: 'root' // Makes the service a singleton throughout the application
    })
    export class DataSharingService {
      private jsonDataSubject = new BehaviorSubject<any>(null); // Initialize with a default value
      jsonData$ = this.jsonDataSubject.asObservable(); // Expose as an Observable for components to subscribe

      constructor() { }

      updateJsonData(data: any) {
        this.jsonDataSubject.next(data); // Update the data and emit to subscribers
      }

      getJsonData() {
        return this.jsonDataSubject.getValue(); // Get the current value directly
      }
    }
	
	Inject and Use in Components: Inject the DataSharingService into any component that needs to access or modify the shared JSON data.
TypeScript

    // src/app/component-a/component-a.component.ts
    import { Component, OnInit } from '@angular/core';
    import { DataSharingService } from '../data-sharing.service';

    @Component({
      selector: 'app-component-a',
      templateUrl: './component-a.component.html',
      styleUrls: ['./component-a.component.css']
    })
    export class ComponentAComponent implements OnInit {
      sharedData: any;

      constructor(private dataSharingService: DataSharingService) { }

      ngOnInit() {
        // Subscribe to changes in the shared JSON data
        this.dataSharingService.jsonData$.subscribe(data => {
          this.sharedData = data;
        });

        // Example: Update the shared data
        this.dataSharingService.updateJsonData({ name: 'Alice', age: 30 });
      }
    }
TypeScript

    // src/app/component-b/component-b.component.ts
    import { Component, OnInit } from '@angular/core';
    import { DataSharingService } from '../data-sharing.service';

    @Component({
      selector: 'app-component-b',
      templateUrl: './component-b.component.html',
      styleUrls: ['./component-b.component.css']
    })
    export class ComponentBComponent implements OnInit {
      receivedData: any;

      constructor(private dataSharingService: DataSharingService) { }

      ngOnInit() {
        // Subscribe to changes in the shared JSON data
        this.dataSharingService.jsonData$.subscribe(data => {
          this.receivedData = data;
        });
      }
    }
By following this pattern, you centralize your shared JSON data within a service, making it easily accessible and maintainable across your Angular application.