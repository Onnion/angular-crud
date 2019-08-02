import { Component, OnInit, Input } from '@angular/core';
import { listObjShow } from 'src/app/modules/common/animations/animations.helper';
import { Client } from '../../models/client/client.model';
import { DataPersistenceService } from '../../services/data-persistence/data-persistence.service';
import { NotifyService } from 'src/app/modules/common/services/notify/notify.service';
import { clean } from '../../../common/utils/mask.utils';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
  animations: [listObjShow]
})
export class ClientListComponent implements OnInit {

  public client: Client;

  private clientsBeforeFiltred;
  public clientsAfterFiltred;
  public search: string;

  @Input() clients: Client[];

  constructor(private dataPersistence: DataPersistenceService<Client>, private notify: NotifyService) { }

  private hasFilter(client: Client, filter: string): boolean {
    return (
      client.name.toLowerCase().includes(this.replace(filter.toLowerCase())) ||
      client.cpf.toString().toLowerCase().includes(filter.toString().toLowerCase()));
  }

  private replace(name: string) {
    return clean(name);
  }

  public loadData() {
    this.clientsBeforeFiltred = this.dataPersistence.read('client');
    this.clientsAfterFiltred = this.clientsBeforeFiltred;

  }

  public selectDelete($event: any, client: Client) {
    $event.stopPropagation();
    this.client = client;
  }

  public delete() {
    this.dataPersistence.delete('client', this.client);
    this.cancel();
    this.loadData();
    this.notify.show('success', 'Cliente excluido com sucesso');
  }

  public cancel() {
    this.client = null;
  }

  public handleFilter() {
    if (!this.search || this.search === '' || !this.clientsAfterFiltred) {
      this.clientsAfterFiltred = this.clientsBeforeFiltred;
      return;
    }

    this.clientsAfterFiltred = this.clientsBeforeFiltred.filter(client => this.hasFilter(client, this.search));

  }

  ngOnInit() {
    this.loadData();
  }


}
