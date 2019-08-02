import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Client } from '../../models/client/client.model';

class CpfConfirmation {
  static valid(form: FormGroup, cpf: string) {
    if (form.controls.cpf.value === cpf) {
      form.controls.cpf.setErrors(null);
      return null;

    } else {
      form.controls.cpf.setErrors({ invalidCpf: true });
      return { invalidCpf: true };

    }
  }
}

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  public form: FormGroup;

  @Input() client: Client;
  @Output() done: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder) { }

  private initFormControls(): void {
    this.form = this.fb.group({
      cpf: ['', Validators.required]
    }, {
      validator: (form: FormGroup) => CpfConfirmation.valid(form, this.client.cpf)
    });
  }

  public submit(): void {
    if (this.form.valid) {
      this.done.emit(true);
    }
  }

  public cancelDelete(): void {
    this.cancel.emit(true);
  }

  ngOnInit() {
    this.initFormControls();
  }
}
