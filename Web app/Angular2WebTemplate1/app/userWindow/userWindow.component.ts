import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'userWindow',
    styleUrls: ['/app/userWindow/userWindow.component.css'],
    templateUrl: '../app/userWindow/userWindow.component.html'
})

export class userWindow {
    constructor(private _router: Router) {

    }

    logout() {
        localStorage.removeItem('token');
        this._router.navigate(['dashboard']);
    }
}