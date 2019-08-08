import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Client } from '../../models/client/client.model';
import { Address } from '../../models/address/addres.model';
import { DataPersistenceService } from '../../services/data-persistence/data-persistence.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilderValidators } from 'src/app/modules/common/validators/form-builder/form-builder.validators';
import { NotifyService } from 'src/app/modules/common/services/notify/notify.service';
import { CepService } from '../../services/cep/cep.service';
import { Vehicle } from '../../models/vehicle/vehicle.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {
  private type: string;
  private client: Client;
  public form: FormGroup;

  public selectedVehicle: Vehicle;
  public filteredVehicles: Observable<Vehicle[]>;
  public vehicles: Vehicle[];

  public selectedBrand: Vehicle;
  public filteredBrands: Observable<Vehicle[]>;
  public brand: Vehicle[];

  constructor(
    private dataPersistence: DataPersistenceService<Client>,
    private fb: FormBuilder,
    private router: Router,
    private active: ActivatedRoute,
    private custonValidators: FormBuilderValidators,
    private cepService: CepService
  ) { }

  private initFormControls(): void {

    if (this.type === 'edit') {
      const { id } = this.active.snapshot.params;
      this.client = this.dataPersistence.get('client', id);
    }

    this.form = this.fb.group({
      name: [this.client ? this.client.name : '', [Validators.required, this.custonValidators.nameFormat]],
      cpf: [this.client ? this.client.cpf : '', [
        Validators.required,
        this.custonValidators.cpfFormat,
        Validators.pattern('^[0-9]{3}[\.][0-9]{3}[\.][0-9]{3}[\-][0-9]{2}$')
      ]],
      phone: [this.client ? this.client.phone : '', [Validators.required]],
      birthdate: [this.client ? this.client.birthdate : '', [
        Validators.required,
        Validators.pattern('^[0-9]{2}[\/][0-9]{2}[\/][0-9]{4}$')
      ]],
      vehicle: ['', [Validators.required]],
      address: this.fb.group({
        cep: [this.client ? this.client.address.cep : '', [Validators.required, Validators.pattern('^[0-9]{5}-[0-9]{3}$')]],
        logradouro: [{ value: this.client ? this.client.address.logradouro : '', disabled: true }, [Validators.required]],
        complemento: [this.client ? this.client.address.complemento : '', []],
        bairro: [{ value: this.client ? this.client.address.bairro : '', disabled: true }, [Validators.required]],
        localidade: [{ value: this.client ? this.client.address.localidade : '', disabled: true }, [Validators.required]],
        uf: [{ value: this.client ? this.client.address.uf : '', disabled: true }, [Validators.required]],
      })
    });

  }

  private createData($data: Client): Client {

    let data = $data;

    if (this.type === 'edit') {
      data = {
        ...data,
        id: this.client.id
      };
    }

    return data;
  }

  private setAddress(address: Address): void {
    this.form.controls.address.setValue(address);
    this.eneableAddressFields();
  }

  public set(): void {
    if (this.form.valid) {
      const data = this.createData(this.form.value);

      this.dataPersistence[this.type === 'edit' ? 'update' : 'create']('client', data);
      // this.notify.show('success', `Cliente ${this.type === 'edit' ? 'atualizado' : 'criado'} com sucesso`);
      this.router.navigate(['/']);
    }
  }

  public forceSubmit(): void {
    const submit = document.getElementById('submit');
    submit.click();
  }

  public getCep(): void {
    if (this.form.controls.address.get('cep').valid) {
      const { address } = this.form.value;
      this.cepService.get(address as Address).subscribe(
        ($address: Address) => this.setAddress($address),
        (error) => console.log(error)
      );
    }
  }

  public eneableAddressFields(): void {
    const address = this.form.controls.address as FormGroup;
    address.get('logradouro').enable();
    address.get('bairro').enable();
    address.get('localidade').enable();
    address.get('uf').enable();
  }

  ngOnInit() {
    const { type } = this.active.snapshot.data;
    this.type = type;
    this.initFormControls();
  }
}
