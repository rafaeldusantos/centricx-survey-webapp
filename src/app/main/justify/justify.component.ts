import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TweenMax, Power4 } from 'gsap';

import { MainSteps } from '../main.steps';
import { Step } from '../../models/Step';
import { Feedback } from '../../models/Feedback';
import { Settings } from '../../models/Settings';
import { Buttons } from '../../models/Buttons';

import { StepController } from '../step.controller';

export interface FormObject {
  textarea: string;
}

@Component({
  selector: 'app-justify',
  templateUrl: './justify.component.html',
  styleUrls: ['./justify.component.scss']
})
export class JustifyComponent extends StepController implements OnInit {
  model: FormObject;

  @ViewChild('Form', { static: false }) Form: NgForm;
  mainSteps = new MainSteps();
  feedback = new Feedback();
  settings: Settings;
  button: Buttons
  constructor() { 
    super();
    this.model = ({} as FormObject);
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
    this.feedback = JSON.parse(localStorage.getItem('feedback'));
    this.show();
    
  }

  nextStep() {
    if(this.Form.form.value.justify){
      this.feedback.justify = this.Form.form.value.justify;
    }
    localStorage.setItem('feedback', JSON.stringify(this.feedback));
    this.step = new Step(this.mainSteps.THANK.ROUTE, this.mainSteps.THANK.ANIMATION.SHOW_LEFT_TO_RIGH);
    this.hide();
  }

  show() {
		if (this.step.animation === this.mainSteps.JUSTIFY.ANIMATION.SHOW_LEFT_TO_RIGH) {
      TweenMax.to('[data-component="justify"]', .6, { opacity: 1, ease: Power4.easeIn });
		} else {
			TweenMax.to('[data-component="justify"]', .6, { opacity: 1, ease: Power4.easeIn });
		}
  }

  hide() {
    TweenMax.to('[data-component="justify"]', .8, { opacity: 0, ease: Power4.easeIn, onComplete: () => {
      this.changeStep.emit({step: this.step});
    }});
  }

}
