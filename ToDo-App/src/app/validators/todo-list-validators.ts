import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

export class TodoListValidators {
  public static containsMinWordsValidation(minWords: number): (control: AbstractControl) => null | ValidationErrors {
    return ctrl => {
      const strVal = ctrl.value;
      if (typeof (strVal) !== 'string') return null;

      const spaceRegExp = new RegExp(' +', 'gi');
      const word: string = strVal.trim().replace(spaceRegExp, ' ');

      const words = word.split(' ');
      const countWords = words.length;

      if (word === '') return null;
      if (countWords === 0) return null;
      if (countWords >= minWords) return null;

      return {
        'minWords': {
          requiredMinWords: minWords,
          actualWords: countWords
        }
      }
    }
  }

  public static minCharactersValidation(minCharacters: number): (control: AbstractControl) => null | ValidationErrors {
    return ctrl => {

      const strVal = ctrl.value;
      if (typeof (strVal) !== 'string') return null;

      const word: string = strVal.trim();
      if (word === '') return null;

      if (!(word.length < minCharacters)) return null;

      let countCharacters = word.length;

      return {
        'minCharacters': {
          requiredMinCharacters: minCharacters,
          actualCharacters: countCharacters
        }
      }
    }
  }

  public static iconAndColorValidation_1(icon: string, color: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const iconControl = control.get(icon);
      const colorControl = control.get(color);

      console.log('icon = flag, color = red');

      if (typeof (iconControl?.value) !== "string") return null;
      if (typeof (colorControl?.value) !== "string") return null;

      const iconVal: string = iconControl?.value;
      const colorVal: string = colorControl?.value;

      console.log('icon = flag, color = red');

      if (!(iconVal === icon && colorVal === color)) return null;

      return {
        'invalidMatchIconAndColor': {
          iconName: icon,
          colorName: color
        }
      }
    };
  }

  public static iconAndColorValidation(formGroup: FormGroup){
    debugger;
    const iconControl = formGroup.get('icon');
    const colorControl = formGroup.get('color');

    const icon = iconControl?.value;
    const color = colorControl?.value;

    if(typeof(icon) !== "string") return null;
    if(typeof(color) !== "string") return null;

    if(!(icon === 'flag' && color === '#FFFF00FF')) return null;

    return {
      'invalidMatchIconAndColor': {
        iconName: 'flag',
        colorName: 'red'
      }
    };
  }

}
