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
const authenticationService_1 = require('../services/authenticationService');
require('rxjs/Rx');
let Register = class Register {
    constructor(http, _service) {
        this.http = http;
        this._service = _service;
        this.registerForm = new forms_1.FormGroup({
            land: new forms_1.FormControl(),
            email: new forms_1.FormControl(),
            alder: new forms_1.FormControl(),
            passord: new forms_1.FormControl()
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
        let headers = new http_2.Headers();
        headers.append('newuser', 'newuser');
        return this.http.get("http://www.gruppe18.tk:8080/api/users", { headers: headers })
            .map((res) => res.json())
            .subscribe((res) => {
            let header = new http_2.Headers();
            let jsonObjekt = res.Token;
            localStorage.setItem('token', jsonObjekt);
            var token = localStorage.getItem("token");
            header.append('x-access-token', token);
            header.append('Content-Type', 'application/json');
            return this.http.post("http://www.gruppe18.tk:8080/api/users", body, { headers: header })
                .map((res) => res.json())
                .subscribe((res) => console.log(token));
        }, err => { console.error(err); });
    }
};
Register = __decorate([
    core_1.Component({
        selector: 'register',
        templateUrl: './app/register/register.component.html',
        styleUrls: ['app/register/register.component.css'],
        providers: [authenticationService_1.AuthService]
    }),
    core_2.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http, authenticationService_1.AuthService])
], Register);
exports.Register = Register;
//# sourceMappingURL=register.component.js.map