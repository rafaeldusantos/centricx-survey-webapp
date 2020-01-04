import { Component, OnInit } from '@angular/core';
import { TweenMax, Power4 } from 'gsap';

import { MainSteps } from '../main.steps';
import { Step } from '../../models/Step';
import { Buttons } from '../../models/Buttons';
import { Feedback } from '../../models/Feedback';

import { StepController } from '../step.controller';
import { FeedbackService } from '../../services/feedback.service';

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.scss']
})
export class ThanksComponent extends StepController implements OnInit {
  mainSteps = new MainSteps();
  buttons: Array<Buttons>;
  organization: String;
  feedback = new Feedback();

  constructor(public feedbackService: FeedbackService) {
    super();
  }

  ngOnInit() {
    this.show();
    this.feedback = JSON.parse(localStorage.getItem('feedback'));
    this.feedbackService.auth().subscribe(token => { 
      this.feedbackService.sendFeedback(this.feedback, token).subscribe(res => { 
          console.log(this.feedback);
        },
        error => {
          console.error(error);
        });
    },
    error => {
      console.error(error);
    });
    

  }

  show() {
		if (this.step.animation === this.mainSteps.THANK.ANIMATION.SHOW_LEFT_TO_RIGH) {
      TweenMax.to('[data-component="thanks"]', .6, { opacity: 1, ease: Power4.easeIn });
		} else {
			TweenMax.to('[data-component="thanks"]', .6, { opacity: 1, ease: Power4.easeIn });
		}
  }

  hide() {
    TweenMax.to('[data-component="thanks"]', .8, { opacity: 0, ease: Power4.easeOut, onComplete: () => {
      this.changeStep.emit({step: this.step});
    }});
  }

}
