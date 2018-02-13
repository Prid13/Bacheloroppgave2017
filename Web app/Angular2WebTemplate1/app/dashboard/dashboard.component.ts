import { Component } from '@angular/core';
import { Injectable, Inject } from "@angular/core";
import { Http, Response, RequestOptions } from "@angular/http";
import { Headers } from "@angular/http";
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule } from "@angular/forms";
import 'rxjs/Rx';
import { AuthService } from '../services/authenticationService';
import { Router } from '@angular/router';


@Component({
    selector: 'dashboard',
    templateUrl: '/app/dashboard/dashboard.component.html',
    styleUrls: ['/app/dashboard/dashboard.component.css'],
    providers: [AuthService]
})

@Injectable()
export class Dashboard {
    loginForm: FormGroup;
    token: string;
    error = '';
   
    constructor(private http: Http, private _service: AuthService, private _router: Router) {
            this.loginForm = new FormGroup({
            email: new FormControl(),
            passord: new FormControl()
        });
    }
    Submit() {
        /*let headers = new Headers();
        headers.append('newuser', 'newuser');
        return this.http.get("http://www.gruppe18.tk:8080", { headers: headers })
            .map((res: Response) => res.json())
            .subscribe((res) => {
                let jsonObjekt = res.Token;
                console.log(jsonObjekt)
                localStorage.setItem('token', jsonObjekt);
                var token = localStorage.getItem("token");*/
                let newheader = new Headers();
                var email = this.loginForm.value.email;
                var pass = this.loginForm.value.passord;
                let body = JSON.stringify({ email: email, passord: pass });
                //newheader.append('x-access-token', token);
                newheader.append('Content-Type', 'application/json');

                return this.http.post("http://www.gruppe18.tk:8080/api/authenticate", body, { headers: newheader })
                    .map((res: Response) => res.json())
                    .subscribe((res) => {
                        console.log(res);
                        if (!res.Error) {
                            let userToken = res.Token;
                            console.log(res.Token);
                            localStorage.setItem('token', userToken);
                            this._router.navigate(['userWindow']);
                        }
                        else { this.error = 'Username or password is incorrect'; }

                        if (this.error)
                            alert(this.error);
                    },
                    err => { console.error(err) }
                    );
            //});
    }
}