import { Component } from '@angular/core';
import { Injectable, Inject } from "@angular/core";
import { Http, Response, RequestOptions } from "@angular/http";
import { Headers } from "@angular/http";
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from '../services/authenticationService';
import 'rxjs/Rx';
import * as jwt from 'jsonwebtoken';


@Component({
    selector: 'register',
    templateUrl: './app/register/register.component.html',
    styleUrls: ['app/register/register.component.css'],
    providers: [AuthService]
})

@Injectable()

export class Register {

    registerForm: FormGroup;
    token: string;

    constructor(private http: Http, private _service: AuthService) {
        this.registerForm = new FormGroup({
            land: new FormControl(),
            email: new FormControl(),
            alder: new FormControl(),
            passord: new FormControl()
        });
    }

    whenSubmit() {
        var email = this.registerForm.value.email;
        var pass = this.registerForm.value.passord;
        var land = this.registerForm.value.land;
        var alder = this.registerForm.value.alder;
        var kjonn = "m";

        var json = { email: email, passord: pass, land: land, alder: alder, kjonn: kjonn };
        let body = JSON.stringify(json);
        let headers = new Headers();
        headers.append('newuser', 'newuser');
        return this.http.get("http://www.gruppe18.tk:8080/api/users", { headers: headers })
            .map((res: Response) => res.json())

            .subscribe((res) => {
                let header = new Headers();
                let jsonObjekt = res.Token;
                localStorage.setItem('token', jsonObjekt);
                var token = localStorage.getItem("token");
                header.append('x-access-token', token);
                header.append('Content-Type', 'application/json');
                return this.http.post("http://www.gruppe18.tk:8080/api/users", body, { headers: header })
                           .map((res: Response) => res.json())
                           .subscribe((res) => console.log(token))
                                },
                                  err => {console.error(err)}
                      );

    }
}