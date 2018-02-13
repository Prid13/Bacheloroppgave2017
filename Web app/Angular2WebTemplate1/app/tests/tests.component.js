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
require('rxjs/Rx');
const router_1 = require('@angular/router');
let Tests = class Tests {
    constructor(http, _router) {
        this.http = http;
        this._router = _router;
        this.error = '';
        this.points = 0;
        this.gameFinished = false;
        this.testFunction();
        this.rounds = 0;
    }
    ngOnInit() {
        this.initImage = true;
        this.imageGrid = false;
        this.imagesHide = true;
        this.firstImageHide = true;
        this.resultText = "Click on image to continue";
        this.alertState = "alert-info";
        this.initImgSrc = "";
    }
    testFunction() {
        this.ngOnInit();
        return this.http.get("http://www.gruppe18.tk:8080/api/images?number=4&token=" + localStorage.getItem("token"))
            .map((res) => res.json())
            .subscribe((res) => {
            if (!res.Error)
                this.animateImgs(res.images);
            else
                alert(res.Message);
        }, err => { console.error(err); alert(err); });
    }
    nextRound() {
        this.rounds++;
        if (this.rounds >= 5)
            this.endGame();
        else
            this.testFunction();
    }
    animateImgs(imgArray) {
        this.loadedImages = 0;
        this.imageArray = imgArray;
        this.ran = Math.floor(Math.random() * imgArray.length);
        //this.imagesDiv = "<img class='offset-sm-3 col-sm-6' src='" + imgArray[ran] + "'>";
        this.initImgSrc = imgArray[this.ran];
    }
    checkImage(img) {
        if (img == this.imageArray[this.ran]) {
            this.resultText = "Correct!";
            this.alertState = "alert-success";
            this.points++;
        }
        else {
            this.resultText = "Wrong!";
            this.alertState = "alert-danger";
        }
        this.imageGrid = false;
        setTimeout(() => {
            this.nextRound();
        }, 1500);
    }
    imgLoaded() {
        this.loadedImages++;
        if (this.loadedImages >= 4)
            this.imagesHide = false;
    }
    firstImgLoaded() {
        this.firstImageHide = false;
    }
    firstImgClick() {
        this.initImage = false;
        this.resultText = "";
        setTimeout(() => {
            this.resultText = "Choose the image you saw earlier";
            this.alertState = "alert-info";
            this.imageGrid = true;
        }, 2000);
    }
    endGame() {
        this.resultText = "You got <b>" + this.points + "</b> points out of 5";
        this.alertState = "alert-warning";
        this.gameFinished = true;
    }
};
Tests = __decorate([
    core_1.Component({
        selector: 'tests',
        templateUrl: '/app/tests/tests.component.html',
        styleUrls: ['/app/tests/tests.component.css'],
    }),
    core_2.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http, router_1.Router])
], Tests);
exports.Tests = Tests;
//# sourceMappingURL=tests.component.js.map