import { Buttons } from './Buttons';

export class Settings {
    backgroundColor: String;
    logo: String;
    typeSurvey: String;
    wellcome: Boolean;
    justify: Boolean;
    textSurvey: String;
    textReason: String;
    textColor: String;
    button: Buttons;
    reasons: Array<String>;

    constructor(data: any){
        this.backgroundColor = this.undefinedToNull(data.backgroundColor);
        this.logo = this.undefinedToNull(data.logo);
        this.typeSurvey = this.undefinedToNull(data.typeSurvey);
        this.wellcome = data.wellcome;
        this.justify = data.justify;
        this.textSurvey = this.undefinedToNull(data.textSurvey);
        this.textReason = this.undefinedToNull(data.textReason);
        this.textColor = this.undefinedToNull(data.textColor);
        this.button = new Buttons(
            0,
            this.undefinedToNull(data.button.backgroundColor),
            this.undefinedToNull(data.button.border),
            this.undefinedToNull(data.button.textColor)
        );
        this.reasons = data.reasons;
    }

    undefinedToNull(str: String) {
        return typeof str !== 'undefined' ? str  : ''
    }
}