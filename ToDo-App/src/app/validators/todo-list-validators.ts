import {AbstractControl, ValidationErrors} from "@angular/forms";

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

}
