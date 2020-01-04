export class Buttons {

  number: Number;
  textButton: String;
  textColor: String;
  backgroundButton: String;
  borderColor: String;

	constructor(
      number: Number,
      backgroundButton: String = '',
      borderColor: String = '',
      textColor: String = '',
      textButton: String = '')
  {
    this.number = number;
    this.textButton = textButton || number.toString();
    this.textColor = textColor;
    this.backgroundButton = backgroundButton;
    this.borderColor = borderColor;
	}

}