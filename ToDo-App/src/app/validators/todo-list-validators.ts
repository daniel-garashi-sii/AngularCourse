import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";
import {Color} from "../core/models/color";
import {COLORS} from "../core/models/colors";
import {ICONS} from "../core/models/icons";

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

  public static iconAndColorValidation(icon: string, color: Color): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!(control instanceof FormGroup)) return null;

      const icons: string[] = ICONS;
      const colors: Color[] = COLORS;

      const iconControl = control.get('icon');
      const colorControl = control.get('color');

      if (typeof (iconControl?.value) !== "string") return null;
      if (typeof (colorControl?.value) !== "string") return null;

      const iconVal: string = iconControl?.value;
      const colorVal: string = colorControl?.value;

      if (!icons.includes(icon) || !icons.includes(iconVal)) return null;
      if (!colors.some(c => c.code === color.code)) return null;
      
      if (!(iconVal === icon && colorVal === color.code)) return null;

      return {
        'invalidMatchIconAndColor': {
          iconName: icon,
          colorName: color.name
        }
      };
    };
  }
}
