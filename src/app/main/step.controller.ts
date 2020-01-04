import { Input, Output, EventEmitter } from '@angular/core';
import { Step } from '../models/Step';

interface IStepController {
	show();
	hide();
}

export class StepController implements IStepController {
	@Input() step: Step;
	@Output() changeStep: EventEmitter<any> = new EventEmitter();

	constructor() { }

	show() {}

	hide(param1: any = '', param2: any = '') {}

}
