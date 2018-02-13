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
const router_1 = require('@angular/router');
let userWindow = class userWindow {
    constructor(_router) {
        this._router = _router;
    }
    logout() {
        localStorage.removeItem('token');
        this._router.navigate(['dashboard']);
    }
};
userWindow = __decorate([
    core_1.Component({
        selector: 'userWindow',
        styleUrls: ['/app/userWindow/userWindow.component.css'],
        templateUrl: '../app/userWindow/userWindow.component.html'
    }), 
    __metadata('design:paramtypes', [router_1.Router])
], userWindow);
exports.userWindow = userWindow;
//# sourceMappingURL=userWindow.component.js.map