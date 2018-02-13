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
const platform_browser_1 = require('@angular/platform-browser');
const forms_1 = require('@angular/forms');
const http_1 = require("@angular/http");
const app_component_1 = require('./app.component');
const dashboard_component_1 = require('./dashboard/dashboard.component');
const register_component_1 = require('./register/register.component');
const pincode_component_1 = require('./pincode/pincode.component');
const reset_component_1 = require('./reset/reset.component');
const userWindow_component_1 = require('./userWindow/userWindow.component');
const contact_component_1 = require('./contact/contact.component');
const tests_component_1 = require('./tests/tests.component');
const app_component_2 = require("./app.component");
const app_routing_1 = require('./app.routing');
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, app_routing_1.routing, http_1.HttpModule, forms_1.ReactiveFormsModule],
        declarations: [app_component_1.AppComponent, dashboard_component_1.Dashboard, register_component_1.Register, pincode_component_1.pincode, reset_component_1.Reset, userWindow_component_1.userWindow, contact_component_1.Contact, tests_component_1.Tests, app_component_2.SafeHtmlPipe],
        bootstrap: [app_component_1.AppComponent]
    }), 
    __metadata('design:paramtypes', [])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map