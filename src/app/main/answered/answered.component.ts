import { Component, OnInit } from '@angular/core';
import { TweenMax, Power4 } from 'gsap';

import { MainSteps } from '../main.steps';
import { StepController } from '../step.controller';

@Component({
  selector: 'app-answered',
  templateUrl: './answered.component.html',
  styleUrls: ['./answered.component.scss']
})
export class AnsweredComponent extends StepController  implements OnInit {
  mainSteps = new MainSteps();
  organization: String;
  constructor() {
    super()
  }

  ngOnInit() {
  }

  show() {
		if (this.step.animation === this.mainSteps.ANSWERED.ANIMATION.SHOW_LEFT_TO_RIGH) {
      TweenMax.to('[data-component="answered"]', .6, { opacity: 1, ease: Power4.easeIn });
		} else {
			TweenMax.to('[data-component="answered"]', .6, { opacity: 1, ease: Power4.easeIn });
		}
  }

  hide() {
    TweenMax.to('[data-component="answered"]', .8, { opacity: 0, ease: Power4.easeOut, onComplete: () => {
      this.changeStep.emit({step: this.step});
    }});
  }

}
