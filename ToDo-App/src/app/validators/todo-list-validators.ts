import {AbstractControl, ValidationErrors} from "@angular/forms";

export class TodoListValidators {
  public static containsMinWordsValidation(minWords: number): (control: AbstractControl) => null | ValidationErrors {
    return ctrl => {
      const description = ctrl.value;
      if (typeof (description) !== 'string') return null;

      const words = description.trim().split(' ');
      const countWords = words.length;

      if (countWords >= minWords) return null;

      return {
        'minWords': {
          requiredMinWords: minWords,
          actualWords: description.trim() !== '' ? countWords : countWords - 1
        }
      }
    }
  }

}
