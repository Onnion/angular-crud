import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Client } from '../../models/client/client.model';
import { DataPersistenceService } from '../../services/data-persistence/data-persistence.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilderValidators } from 'src/app/modules/common/validators/form-builder/form-builder.validators';
import { NotifyService } from 'src/app/modules/common/services/notify/notify.service';


@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {
  private type: string;
  private client: Client;
  public form: FormGroup;

  constructor(
    private dataPersistence: DataPersistenceService<Client>,
    private fb: FormBuilder,
    private router: Router,
    private active: ActivatedRoute,
    private custonValidators: FormBuilderValidators,
    private notify: NotifyService
  ) { }

  private initFormControls(): void {

    if (this.type === 'edit') {
      const { id } = this.active.snapshot.params;
      this.client = this.dataPersistence.get('client', id);
    }

    this.form = this.fb.group({
      name: [this.client ? this.client.name : '', [Validators.required, this.custonValidators.nameFormat]],
      age: [this.client ? this.client.age : '', [Validators.required, Validators.pattern('^[0-9]{1,3}$'), this.custonValidators.ageFormat]],
      // tslint:disable-next-line:max-line-length
      cpf: [this.client ? this.client.cpf : '', [Validators.required, this.custonValidators.cpfFormat, Validators.pattern('^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})$')]],
      phone: [this.client ? this.client.phone : '', [Validators.required]],
    });

  }

  public set() {
    if (this.form.valid) {
      let data;

      data = this.form.value;

      if (this.type === 'edit') {
        data = {
          ...data,
          id: this.client.id
        };
      }

      this.dataPersistence[this.type === 'edit' ? 'update' : 'create']('client', data);
      this.notify.show('success', `Cliente ${this.type === 'edit' ? 'atualizado' : 'criado'} com sucesso`);

      this.router.navigate(['/']);

    }
  }

  public forceSubmit() {
    const submit = document.getElementById('submit');
    submit.click();
  }

  ngOnInit() {
    const { type } = this.active.snapshot.data;
    this.type = type;
    this.initFormControls();
  }
}
