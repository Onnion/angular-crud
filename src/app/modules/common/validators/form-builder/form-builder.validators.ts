import { validCpf } from '../cpf/cpf.validator';
import { FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { validEmail, validName } from '../regex/regex.validator';

@Injectable()
export class FormBuilderValidators {
  private validEmail;
  private validName;
  private validCpf;

  constructor() {
    this.validEmail = validEmail;
    this.validName = validName;
    this.validCpf = validCpf;
  }

  private setError(control: FormControl, error: string): { [key: string]: boolean } {
    return this[error](control.value) ? null : { [error]: true };
  }

  public emailFormat(control: FormControl): { [key: string]: boolean } {
    return this.setError(control, 'validEmail');
  }

  public nameFormat(control: FormControl): { [key: string]: boolean } {
    return this.setError(control, 'validName');
  }

  public cpfFormat(control: FormControl): { [key: string]: boolean } {
    return this.setError(control, 'validCpf');
  }
}
