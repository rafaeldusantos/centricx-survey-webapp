import { Component, OnInit, ViewEncapsulation, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { TweenMax, Power4 } from 'gsap';
import { first } from 'rxjs/operators'
import { ActivatedRoute } from "@angular/router";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { MainSteps } from './main.steps';
import { Step } from '../models/Step';
import { Feedback } from '../models/Feedback';

import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit, AfterViewInit {

  public logo: SafeUrl;
  feedback = new Feedback();
  mainSteps: MainSteps;
  step: Step;
  comp: string;
  organizationId: string;
  experienceId: string;
  settingId: string;
  score: string;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private domSanitizer: DomSanitizer,
    public feedbackService: FeedbackService
  ) {
    this.step = new Step();
    this.mainSteps = new MainSteps();
    this.comp = '[data-component="main"]';
    this.experienceId = this.route.snapshot.queryParams["exp"];
    this.settingId = this.route.snapshot.queryParams["set"];
    this.organizationId = this.route.snapshot.queryParams["org"];
    this.score = this.route.snapshot.queryParams["score"];

    if(this.score) {
      localStorage.setItem('score', this.score);
    }
  }

  ngOnInit() {
    if(!this.experienceId || !this.settingId) {
      window.open('http://centricx.com.br', '_self');
    }
    this.feedbackService.auth().subscribe(token => {
      localStorage.setItem('token', token);

      this.feedbackService.getStatus(this.experienceId).pipe(first())
        .subscribe(token => {
        this.feedbackService.setting(this.settingId, this.experienceId)
          .pipe(first())
          .subscribe(data => {
            this.feedback.typeSurvey = data.typeSurvey;
            this.feedback.organizationId = this.organizationId;
            this.feedback.origin = { 
              channel: data.channel,
              experienceId: this.experienceId
            };
            localStorage.setItem('feedback', JSON.stringify(this.feedback));
            localStorage.setItem('settings', JSON.stringify(data));
            this.logo = this.domSanitizer.bypassSecurityTrustUrl(data.logo);
            if (token && token.status === 'answered') {
              this.step = new Step(this.mainSteps.ANSWERED.ROUTE, this.mainSteps.ANSWERED.ANIMATION.SHOW);
            } else {
              this.step = new Step(this.mainSteps.SURVEY.ROUTE, this.mainSteps.SURVEY.ANIMATION.SHOW); 
            }
            
          },
          error => {
              
          });
        
        },
        error => {
            
        });

    },
    error => {
      console.error(error);
    });
  }

  ngAfterViewInit() {
		TweenMax.to(this.comp, 0.8, { delay: 0.1, opacity: 1, ease: Power4.easeIn });

  }

   // ON CHANGE STEP
	onChangeStep(event) {
		this.step = event.step;
		this.changeDetectorRef.detectChanges();
  }
  
}
