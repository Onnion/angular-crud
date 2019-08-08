import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudRoutingModule } from './crud.routing.module';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { ClientViewComponent } from './components/client-view/client-view.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { DataPersistenceService } from './services/data-persistence/data-persistence.service';
import { FormBuilderValidators } from '../common/validators/form-builder/form-builder.validators';
import { MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatAutocompleteModule } from "@angular/material";
import { TranslateModule } from '@ngx-translate/core';
import { CepService } from './services/cep/cep.service';
import { MaskDirective } from './directives/mask/mask.directive';

@NgModule({
  declarations: [
    ClientListComponent,
    ClientFormComponent,
    ClientViewComponent,
    ConfirmComponent,
    MaskDirective
  ],
  providers: [DataPersistenceService, FormBuilderValidators, CepService],
  imports: [
    CommonModule,
    CrudRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    TranslateModule.forChild()
  ]
})
export class CrudModule { }
