import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudRoutingModule } from './crud.routing.module';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { ClientViewComponent } from './components/client-view/client-view.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { DataPersistenceService } from './services/data-persistence/data-persistence.service';


@NgModule({
  declarations: [
    ClientListComponent,
    ClientFormComponent,
    ClientViewComponent,
    ConfirmComponent
  ],
  providers: [DataPersistenceService],
  imports: [
    CommonModule,
    CrudRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    // MatInputModule,
    // MatIconModule,
    // MatButtonModule,
    // MatCardModule
  ]
})
export class CrudModule { }
