import { Component, OnInit } from '@angular/core';
import { TweenMax, Power4 } from 'gsap';

import { MainSteps } from '../main.steps';
import { Step } from '../../models/Step';
import { Buttons } from '../../models/Buttons';
import { Feedback } from '../../models/Feedback'; 
import { Settings } from '../../models/Settings'; 
import { ButtonColor } from './survey.buttonColor';

import { StepController } from '../step.controller';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent extends StepController implements OnInit {
  
  mainSteps = new MainSteps();
  feedback = new Feedback();
  textReason: String;
  organizationName: String;
  textThermometer: Array<String>;
  buttonColor = new ButtonColor();
  buttons: Array<Buttons>;
  buttonsMobile: Array<Buttons>;
  buttonsSettings: Buttons;
  colorButton: string;
  typeCes: Boolean = false;
  surveyObject: Object;
  settings: Settings;
  mockConvert: any;
  constructor() {
    super();
    const storage = JSON.parse(localStorage.getItem('settings'));
    this.feedback = JSON.parse(localStorage.getItem('feedback'));
    this.settings = new Settings(storage);
    this.organizationName = storage.organizatioName;
  }


  ngOnInit() {
    this.settingsToSurvey(this.settings);
    const score = localStorage.getItem('score');
    if (score) {
      this.nextStep(score)
    } else {
      this.show();
    }
    
  }

  settingsToSurvey(settings) {
    this.feedback.typeSurvey = settings.typeSurvey;
    this.colorButton = settings.button.backgroundButton;
    this.textReason = settings.textSurvey 
      ? settings.textSurvey 
      : this.mountText(settings.typeSurvey);
    this.textThermometer = this.mountThermometer(settings.typeSurvey);
    this.buttons = this.mountButtons(settings.button, settings.typeSurvey);
    
    this.buttonsMobile = this.mountButtons(settings.button, settings.typeSurvey)
    this.buttonsMobile.sort(this.compare)
  }

  mountButtons(button, typeSurvey) {
    let obj;
    switch(typeSurvey){
      case 'CES':
        obj = this.buttonColor.ONE_SEVEN;
        this.typeCes = true;
        break;
      case 'CSAT':
        obj = this.buttonColor.ONE_FIVE;
        break;
      default:
        obj = this.buttonColor.ZERO_TEN;
        break;
    }
    const cesOptions = ['Discordo Totalmente', 'Discordo', 'Discordo Parcialmente', 'Neutro', 'Concordo Parcialmente', 'Concordo', 'Concordo Totalmente'];
    this.surveyObject = obj;
    return Object.keys(obj).map(function(key) {
      return new Buttons(
        Number(key),
        button.backgroundButton ? button.backgroundButton : obj[key],
        button.borderColor,
        button.textColor ? button.textColor : '#FFFFFF',
        typeSurvey === 'CES' ? cesOptions[parseInt(key) - 1] : ''
      );
    });
  }

  mountText(typeSurvey: String){
    switch(typeSurvey){
      case 'CES':
        return `A ${this.organizationName} <strong>facilitou</strong> a resolução<br />do meu problema?`;
      case 'CSAT':
        return `Quanto satisfeito você está<br />com ${this.organizationName}?`;
      default:
        return `Qual a chance de você <strong>recomendar</strong><br>${this.organizationName} à um <strong>amigo</strong> ou <strong>familiar</strong>?`;
    }
  }

  mountThermometer(typeSurvey: String){
    switch(typeSurvey){
      case 'CES':
        return ['RUIM', 'BOM'];
      case 'CSAT':
        return ['MUITO INSATISFEITO', 'MUITO SATISFEITO'];
      default:
        return ['NADA PROVÁVEL', 'MUITO PROVÁVEL'];
    }
  }

  nextStep(number) {
    localStorage.setItem('colorSurveySelected', this.colorButton ? this.colorButton : this.surveyObject[number]);
    this.feedback.score = number;
    localStorage.setItem('feedback', JSON.stringify(this.feedback));
    this.step = new Step(this.mainSteps.REASON.ROUTE, this.mainSteps.REASON.ANIMATION.SHOW_LEFT_TO_RIGH);
    this.hide();
  }

  show() {
		if (this.step.animation === this.mainSteps.SURVEY.ANIMATION.SHOW_LEFT_TO_RIGH) {
      TweenMax.to('[data-component="survey"]', .6, { opacity: 1, ease: Power4.easeIn });
		} else {
			TweenMax.to('[data-component="survey"]', .6, {opacity: 1, ease: Power4.easeIn });
		}
  }
  
  hide() {
    TweenMax.to('[data-component="survey"]', .8, { opacity: 0, ease: Power4.easeIn, onComplete: () => {
      this.changeStep.emit({step: this.step});
    }});
  }

  compare(a, b) {
    let comparison = 0;
    if (a.number < b.number) {
      comparison = 1;
    } else if (a.number > b.number) {
      comparison = -1;
    }
    return comparison;
  }

}
