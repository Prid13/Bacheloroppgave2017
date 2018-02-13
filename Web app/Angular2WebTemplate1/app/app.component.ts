import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import { PipeTransform, Pipe } from "@angular/core";

@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
    constructor(private sanitized: DomSanitizer) { }
    transform(value) {
        return this.sanitized.bypassSecurityTrustHtml(value);
    }
}

@Component({
    selector: 'my-app',
    templateUrl: '/app/app.component.html',
    styleUrls: ['app/app.component.css'],
})


export class AppComponent {
    title = 'Angular 2 App'
}