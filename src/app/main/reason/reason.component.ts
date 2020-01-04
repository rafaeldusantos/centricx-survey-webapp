import { Component, OnInit } from '@angular/core';
import { TweenMax, Power4 } from 'gsap';

import { MainSteps } from '../main.steps';
import { Step } from '../../models/Step';
import { Feedback } from '../../models/Feedback'; 
import { Buttons } from '../../models/Buttons';
import { Settings } from '../../models/Settings';

//import { FeedbackService } from '../../services/feedback.service'

import { StepController } from '../step.controller';
@Component({
  selector: 'app-reason',
  templateUrl: './reason.component.html',
  styleUrls: ['./reason.component.scss']
})
export class ReasonComponent extends StepController implements OnInit {

  dashboardSteps = new MainSteps();
  settings: Settings;
  feedback = new Feedback();
  organization: String;
  newBackgroundButton: String;
  newColorButton: String;
  reasonList: Array<String>;
  button: Buttons;
  stopFeedback: Boolean = false;
  constructor() { 
    super();
  }

  ngOnInit() {
    this.settings = new Settings(JSON.parse(localStorage.getItem('settings')));
    const colorSelected = localStorage.getItem('colorSurveySelected');
    this.button = new Buttons(
      0,
      colorSelected,
      this.settings.button.borderColor,
      this.settings.button.textColor
    );
    this.reasonList = this.settings.reasons;
    this.feedback = JSON.parse(localStorage.getItem('feedback'));
    //this.returnTuSurvey();

    this.show();
    
  }

  nextStep(reason, event) {
    event.srcElement.classList.add("active");
    this.stopFeedback = true;
    this.feedback.reason = reason;
    localStorage.setItem('feedback', JSON.stringify(this.feedback));
    console.log(this.settings)
    if (this.settings.justify) {
      this.step = new Step(this.dashboardSteps.JUSTIFY.ROUTE, this.dashboardSteps.JUSTIFY.ANIMATION.SHOW_LEFT_TO_RIGH);
    } else {
      this.step = new Step(this.dashboardSteps.THANK.ROUTE, this.dashboardSteps.THANK.ANIMATION.SHOW_LEFT_TO_RIGH);
    }
    this.hide();
  }

  show() {
		if (this.step.animation === this.dashboardSteps.REASON.ANIMATION.SHOW_LEFT_TO_RIGH) {
      TweenMax.to('[data-component="reason"]', .6, { opacity: 1, ease: Power4.easeIn });
		} else {
			TweenMax.to('[data-component="reason"]', .6, { opacity: 1, ease: Power4.easeIn });
		}
  }

  hide() {
    TweenMax.to('[data-component="reason"]', .8, { opacity: 0, ease: Power4.easeIn, onComplete: () => {
      this.changeStep.emit({step: this.step});
    }});
  }

  // returnTuSurvey() {
  //   setTimeout( () => {
  //     if(!this.stopFeedback){
  //       this.storage.get('feedback').then(data => {
  //         data.reason = '-';
  //         this.feedbackService.sendFeedback(data).subscribe(
  //           res => {},
  //           error => {
  //             console.error(error);
  //           });
  //       });
  //       this.step = new Step(this.dashboardSteps.SURVEY.ROUTE, this.dashboardSteps.SURVEY.ANIMATION.SHOW);
  //       this.hide();
  //     }
  //   }, 30000);
  // }

}
