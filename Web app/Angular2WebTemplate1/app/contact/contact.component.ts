import { Component } from '@angular/core';
import { Injectable, Inject } from "@angular/core";
import { Http, Response, RequestOptions } from "@angular/http";
import { Headers } from "@angular/http";
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule } from "@angular/forms";
import 'rxjs/Rx';
import { Router } from '@angular/router';


@Component({
    selector: 'contact',
    templateUrl: '/app/contact/contact.component.html',
    styleUrls: ['/app/contact/contact.component.css'],
})

@Injectable()
export class Contact {
    messageForm: FormGroup;
    token: string;
    error = '';
   
    constructor(private http: Http, private _router: Router) {
            this.messageForm = new FormGroup({
            email: new FormControl(),
            message: new FormControl()
        });
    }
    Submit() {
        let headers = new Headers();
        headers.append('newuser', 'newuser');
        return this.http.get("http://www.gruppe18.tk:8080", { headers: headers })
            .map((res: Response) => res.json())
            .subscribe((res) => {
                let jsonObjekt = res.Token;
                console.log(jsonObjekt)
                localStorage.setItem('token', jsonObjekt);
                var token = localStorage.getItem("token");
                var email = this.messageForm.value.email;
                var message = this.messageForm.value.message;
                let body = JSON.stringify({ email: email, message: message });
                let newheader = new Headers();
                newheader.append('x-access-token', token);
                newheader.append('Content-Type', 'application/json');

                return this.http.post("http://www.gruppe18.tk:8080/api/contact", body, { headers: newheader })
                    .map((res: Response) => res.json())
                    .subscribe((res) => {
                        if (!res.Error) {
                            console.log(res.Message)
                            this.messageForm.reset();
                        }
                        else {
                            console.log(res.Error)
                        }
                    });
            });
    }
}