"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const core_2 = require("@angular/core");
const http_1 = require("@angular/http");
const http_2 = require("@angular/http");
const forms_1 = require("@angular/forms");
require('rxjs/Rx');
const authenticationService_1 = require('../services/authenticationService');
const router_1 = require('@angular/router');
let Dashboard = class Dashboard {
    constructor(http, _service, _router) {
        this.http = http;
        this._service = _service;
        this._router = _router;
        this.error = '';
        this.loginForm = new forms_1.FormGroup({
            email: new forms_1.FormControl(),
            passord: new forms_1.FormControl()
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
        let newheader = new http_2.Headers();
        var email = this.loginForm.value.email;
        var pass = this.loginForm.value.passord;
        let body = JSON.stringify({ email: email, passord: pass });
        //newheader.append('x-access-token', token);
        newheader.append('Content-Type', 'application/json');
        return this.http.post("http://www.gruppe18.tk:8080/api/authenticate", body, { headers: newheader })
            .map((res) => res.json())
            .subscribe((res) => {
            console.log(res);
            if (!res.Error) {
                let userToken = res.Token;
                console.log(res.Token);
                localStorage.setItem('token', userToken);
                this._router.navigate(['userWindow']);
            }
            else {
                this.error = 'Username or password is incorrect';
            }
            if (this.error)
                alert(this.error);
        }, err => { console.error(err); });
        //});
    }
};
Dashboard = __decorate([
    core_1.Component({
        selector: 'dashboard',
        templateUrl: '/app/dashboard/dashboard.component.html',
        styleUrls: ['/app/dashboard/dashboard.component.css'],
        providers: [authenticationService_1.AuthService]
    }),
    core_2.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http, authenticationService_1.AuthService, router_1.Router])
], Dashboard);
exports.Dashboard = Dashboard;
//# sourceMappingURL=dashboard.component.js.map