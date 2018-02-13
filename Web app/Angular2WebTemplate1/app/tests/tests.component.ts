import { Component, ViewChild, ElementRef } from '@angular/core';
import { Injectable, Inject } from "@angular/core";
import { Http, Response, RequestOptions } from "@angular/http";
import { Headers } from "@angular/http";
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule } from "@angular/forms";
import 'rxjs/Rx';
import { Router } from '@angular/router';


@Component({
    selector: 'tests',
    templateUrl: '/app/tests/tests.component.html',
    styleUrls: ['/app/tests/tests.component.css'],
})

@Injectable()
export class Tests {
    token: string;
    imagesDiv: string;
    buttonDiv: string;
    error = '';
    points: number = 0;
    initImgSrc: string;
    initImage: boolean;
    imageGrid: boolean;
    imageArray: any[];
    ran: number;
    resultText: string;
    loadedImages: number;
    imagesHide: boolean;
    firstImageHide: boolean;
    rounds: number;
    gameFinished: boolean = false;
    alertState: string;

    constructor(private http: Http, private _router: Router) {
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
            .map((res: Response) => res.json())

            .subscribe((res) => {
                if (!res.Error)
                    this.animateImgs(res.images);
                else
                    alert(res.Message);
            },
            err => { console.error(err); alert(err); }
            );
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
        } else {
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
   
}