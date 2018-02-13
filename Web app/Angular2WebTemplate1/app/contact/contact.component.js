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
const router_1 = require('@angular/router');
let Contact = class Contact {
    constructor(http, _router) {
        this.http = http;
        this._router = _router;
        this.error = '';
        this.messageForm = new forms_1.FormGroup({
            email: new forms_1.FormControl(),
            message: new forms_1.FormControl()
        });
    }
    Submit() {
        let headers = new http_2.Headers();
        headers.append('newuser', 'newuser');
        return this.http.get("http://www.gruppe18.tk:8080", { headers: headers })
            .map((res) => res.json())
            .subscribe((res) => {
            let jsonObjekt = res.Token;
            console.log(jsonObjekt);
            localStorage.setItem('token', jsonObjekt);
            var token = localStorage.getItem("token");
            var email = this.messageForm.value.email;
            var message = this.messageForm.value.message;
            let body = JSON.stringify({ email: email, message: message });
            let newheader = new http_2.Headers();
            newheader.append('x-access-token', token);
            newheader.append('Content-Type', 'application/json');
            return this.http.post("http://www.gruppe18.tk:8080/api/contact", body, { headers: newheader })
                .map((res) => res.json())
                .subscribe((res) => {
                if (!res.Error) {
                    console.log(res.Message);
                    this.messageForm.reset();
                }
                else {
                    console.log(res.Error);
                }
            });
        });
    }
};
Contact = __decorate([
    core_1.Component({
        selector: 'contact',
        templateUrl: '/app/contact/contact.component.html',
        styleUrls: ['/app/contact/contact.component.css'],
    }),
    core_2.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http, router_1.Router])
], Contact);
exports.Contact = Contact;
//# sourceMappingURL=contact.component.js.map