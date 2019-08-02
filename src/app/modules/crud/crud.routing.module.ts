import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { ClientViewComponent } from './components/client-view/client-view.component';

const routes: Routes = [
    { path: '', component: ClientListComponent },
    { path: 'cadastrar', component: ClientFormComponent, data: { type: 'register' } },
    { path: 'editar/:id', component: ClientFormComponent, data: { type: 'edit' } },
    { path: 'cliente/:id', component: ClientViewComponent },
    { path: '**', redirectTo: '' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CrudRoutingModule { }
