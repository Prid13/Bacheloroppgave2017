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
let Reset = class Reset {
    constructor(http, _router) {
        this.http = http;
        this._router = _router;
        this.resetForm = new forms_1.FormGroup({
            email: new forms_1.FormControl()
        });
    }
    Reset() {
        let headers = new http_2.Headers();
        headers.append('newuser', 'newuser');
        return this.http.get("http://www.gruppe18.tk:8080", { headers: headers })
            .map((res) => res.json())
            .subscribe((res) => {
            let jsonObjekt = res.Token;
            console.log(jsonObjekt);
            localStorage.setItem('token', jsonObjekt);
            var token = localStorage.getItem("token");
            var email = this.resetForm.value.email;
            let body = JSON.stringify({ email: email });
            let newheader = new http_2.Headers();
            newheader.append('x-access-token', token);
            newheader.append('Content-Type', 'application/json');
            return this.http.post("http://www.gruppe18.tk:8080/api/users/reset", body, { headers: newheader })
                .map((res) => res.json())
                .subscribe((res) => {
                if (!res.Error) {
                    console.log(res.Message);
                }
                else {
                    console.log(res.Error);
                }
            });
        });
    }
};
Reset = __decorate([
    core_1.Component({
        selector: 'reset',
        templateUrl: '/app/reset/reset.component.html',
        styleUrls: ['/app/reset/reset.component.css'],
    }),
    core_2.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http, router_1.Router])
], Reset);
exports.Reset = Reset;
//# sourceMappingURL=reset.component.js.map