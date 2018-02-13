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
const http_1 = require('@angular/http');
let AuthService = class AuthService {
    constructor(http) {
        this.http = http;
    }
    loginfn(user) {
        this.isLoggedin = false;
        var headers = new http_1.Headers();
        var body = JSON.stringify({ email: user.email, passord: user.passord });
        headers.append('Content-Type', 'application / json');
        return new Promise((resolve) => {
            var headers = new http_1.Headers();
            headers.append('Content-Type', 'application/json');
            this.http.post('http://www.gruppe18.tk:8080/api/authenticate', JSON.stringify({ email: user.email, passord: user.passord }), { headers: headers })
                .map((res) => res.json())
                .subscribe((res) => console.log(res.token));
        });
    }
};
AuthService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=authenticationService.js.map